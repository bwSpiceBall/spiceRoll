import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Blog from '../Blog'

// Mock the environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_CMS_URL: 'https://example.com',
    VITE_CMS_TOKEN: 'test-token'
  }
}))

// Create a mock response for the blog posts API
const mockBlogPosts = {
  data: [
    {
      id: '1',
      documentId: '1',
      title: 'Test Post 1',
      description: 'This is test post 1',
      image: {
        formats: {
          small: {
            url: '/uploads/small_test1.jpg',
            name: 'small_test1'
          }
        }
      },
      secondary_image: {
        formats: {
          small: {
            url: '/uploads/small_test2.jpg',
            name: 'small_test2'
          }
        }
      }
    },
    {
      id: '2',
      documentId: '2',
      title: 'Test Post 2',
      description: 'This is test post 2',
      image: {
        formats: {
          small: {
            url: '/uploads/small_test3.jpg',
            name: 'small_test3'
          }
        }
      },
      secondary_image: {
        formats: {
          small: {
            url: '/uploads/small_test4.jpg',
            name: 'small_test4'
          }
        }
      }
    }
  ]
}

// Mock response with incomplete data to test error handling
const mockIncompleteData = {
  data: [
    {
      id: '3',
      documentId: '3',
      title: 'Incomplete Post',
      description: 'This post has missing images',
      // Missing image and secondary_image fields
    }
  ]
}

// Mock the fetch function
global.fetch = vi.fn()

describe('Blog Component', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    
    // Reset the fetch mock before each test
    vi.mocked(fetch).mockReset()
  })

  it('shows animated loading state initially', async () => {
    // Mock the fetch to never resolve in this test
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}))
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    // Check for loading animation with the new styling
    const loadingElement = screen.getByText('Loading...')
    expect(loadingElement).toBeInTheDocument()
    expect(loadingElement).toHaveClass('text-primary')
    expect(loadingElement).toHaveClass('text-xl')
    expect(loadingElement.closest('div')).toHaveClass('animate-pulse')
  })

  it('renders blog posts with dark theme styling after data is loaded', async () => {
    // Mock the fetch to return our mock data
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockBlogPosts
    } as Response)
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    // Wait for the posts to be displayed
    await screen.findByText('Test Post 1')
    
    // Check for blog posts content
    expect(screen.getByText('Test Post 1')).toBeInTheDocument()
    expect(screen.getByText('This is test post 1')).toBeInTheDocument()
    expect(screen.getByText('Test Post 2')).toBeInTheDocument()
    expect(screen.getByText('This is test post 2')).toBeInTheDocument()
    
    // Check for the blog heading with dark styling
    const heading = screen.getByRole('heading', { level: 1, name: 'Blog' })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('text-3xl')
    expect(heading).toHaveClass('font-bold')
    expect(heading).toHaveClass('text-light')
    expect(heading).toHaveClass('border-b')
    expect(heading).toHaveClass('border-dark-400')
    
    // Verify correct number of images are rendered
    const images = screen.getAllByRole('img')
    expect(images.length).toBe(4) // 2 posts with 2 images each
    
    // Check for dark theme card styling
    const cards = document.querySelectorAll('.bg-dark-200.border.border-dark-400')
    expect(cards.length).toBe(2) // 2 blog post cards
    
    // Check for hover effects on the title
    const titles = screen.getAllByRole('heading', { level: 2 })
    titles.forEach(title => {
      expect(title).toHaveClass('group-hover:text-primary')
      expect(title).toHaveClass('transition-colors')
    })
  })

  it('handles API errors with styled error message', async () => {
    // Mock the fetch to return an error
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({
        error: { message: 'Failed to fetch data' }
      }),
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    } as Response)
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    // Check for the "No blog posts found" message since that's what appears for errors
    const errorMessage = await screen.findByText('No blog posts found.')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-light-100')
  })
  
  it('properly handles incomplete post data', async () => {
    // Mock the fetch to return incomplete data
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockIncompleteData
    } as Response)
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    // Wait for the post to be displayed
    await screen.findByText('Incomplete Post')
    
    // Check that the post renders despite missing image data
    expect(screen.getByText('Incomplete Post')).toBeInTheDocument()
    expect(screen.getByText('This post has missing images')).toBeInTheDocument()
    
    // All image elements should still render with fallbacks
    const images = screen.getAllByRole('img')
    expect(images.length).toBe(2) // 1 post with 2 fallback images
    
    // Images should have fallback sources and alt text
    images.forEach(img => {
      expect(img.getAttribute('src')).toBe('/src/assets/react.svg')
      expect(img.getAttribute('alt')).toBe('Blog image')
    })
  })
  
  it('renders no posts message when data is empty', async () => {
    // Mock the fetch to return empty data
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({ data: [] })
    } as Response)
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    // Wait for the no posts message
    await screen.findByText('No blog posts found.')
    
    // Check that the message is displayed with proper styling
    const noPostsMessage = screen.getByText('No blog posts found.')
    expect(noPostsMessage).toBeInTheDocument()
    expect(noPostsMessage).toHaveClass('text-light-100')
  })
})
