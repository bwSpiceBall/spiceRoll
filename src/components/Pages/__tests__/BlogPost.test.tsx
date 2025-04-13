import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import BlogPost from '../BlogPost'

// Mock DOMPurify
vi.mock('dompurify', () => ({
  default: {
    sanitize: (content: string) => content
  }
}))

// Mock the environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_CMS_URL: 'https://example.com'
  }
}))

// Mock for useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual as any,
    useParams: () => ({
      documentId: 'test-id-123'
    })
  }
})

// Mock the fetch function
global.fetch = vi.fn()

describe('BlogPost Component', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    
    // Reset all mocks
    vi.resetAllMocks()
  })

  it('shows loading state initially', async () => {
    // Mock fetch to never resolve
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}))
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/blog/test-id-123']}>
          <Routes>
            <Route path="/blog/:documentId" element={<BlogPost />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    // Check for loading text
    expect(screen.getByText('loading')).toBeInTheDocument()
  })

  it('renders blog post content after data is loaded', async () => {
    // Mock data for a blog post
    const mockBlogPostData = {
      data: [
        {
          documentId: 'test-id-123',
          title: 'Test Blog Post Title',
          content: '<p>This is a test blog post content.</p>',
          last_modified_date: '2025-04-10T12:00:00Z'
        }
      ]
    }
    
    // Mock successful fetch
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockBlogPostData
    } as Response)
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/blog/test-id-123']}>
          <Routes>
            <Route path="/blog/:documentId" element={<BlogPost />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    // Wait for the post title to be displayed
    await screen.findByText('Test Blog Post Title')
    
    // Check that the blog post content is displayed
    expect(screen.getByText('This is a test blog post content.')).toBeInTheDocument()
    
    // Check that the last modified date is displayed
    expect(screen.getByText(/Last modified:/)).toBeInTheDocument()
    expect(screen.getByText(/2025-04-10T12:00:00Z/)).toBeInTheDocument()
  })

  it('handles API errors', async () => {
    // Mock error response
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({
        error: { message: 'Failed to fetch blog post' }
      })
    } as Response)
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/blog/test-id-123']}>
          <Routes>
            <Route path="/blog/:documentId" element={<BlogPost />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    // Wait for the error message to be displayed
    await screen.findByText(/An error has occurred/)
    
    // Check for error message
    expect(screen.getByText('An error has occurred: Failed to fetch blog post')).toBeInTheDocument()
  })
})
