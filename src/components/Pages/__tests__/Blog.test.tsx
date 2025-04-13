import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
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

  it('shows loading state initially', async () => {
    // Mock the fetch to never resolve in this test
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}))
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    // Check for loading text
    expect(screen.getByText('loading')).toBeInTheDocument()
  })

  it('renders blog posts after data is loaded', async () => {
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
    
    // Check for the blog heading
    expect(screen.getByRole('heading', { level: 1, name: 'Blog' })).toBeInTheDocument()
    
    // Verify correct number of images are rendered
    const images = screen.getAllByRole('img')
    expect(images.length).toBe(4) // 2 posts with 2 images each
  })

  it('handles API errors', async () => {
    // Mock the fetch to return an error
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({
        error: { message: 'Failed to fetch data' }
      })
    } as Response)
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    // Wait for the error message to be displayed
    await screen.findByText(/An error has occurred/)
    
    // Check for error message
    expect(screen.getByText('An error has occurred: Failed to fetch data')).toBeInTheDocument()
  })
})
