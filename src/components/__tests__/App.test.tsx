import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../../App'

// Mock the page components to simplify testing
vi.mock('../../components/Pages/FrontPage', () => ({
  default: () => <div data-testid="frontpage">Front Page Content</div>
}))

vi.mock('../../components/Pages/About', () => ({
  default: () => <div data-testid="about">About Page Content</div>
}))

vi.mock('../../components/Pages/Blog', () => ({
  default: () => <div data-testid="blog">Blog Page Content</div>
}))

vi.mock('../../components/Pages/BlogPost', () => ({
  default: () => <div data-testid="blogpost">Blog Post Content</div>
}))

// Mock window.matchMedia for responsive design testing
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  )
}

describe('App Component', () => {
  it('renders the front page by default', () => {
    renderWithRouter(<App />)
    expect(screen.getByTestId('frontpage')).toBeInTheDocument()
  })
  
  it('navigates to about page when clicking About Me link', async () => {
    renderWithRouter(<App />)
    const user = userEvent.setup()
    
    // Find and click the About Me link
    await user.click(screen.getByText('About Me'))
    
    // Check that the About page is rendered
    await waitFor(() => {
      expect(screen.getByTestId('about')).toBeInTheDocument()
    })
  })
  
  it('navigates to blog page when clicking Blog link', async () => {
    renderWithRouter(<App />)
    const user = userEvent.setup()
    
    // Find and click the Blog link
    await user.click(screen.getByText('Blog'))
    
    // Check that the Blog page is rendered
    await waitFor(() => {
      expect(screen.getByTestId('blog')).toBeInTheDocument()
    })
  })
  
  it('shows mobile menu when hamburger button is clicked', async () => {
    // Override the matchMedia mock to simulate a mobile device
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(max-width: 1023px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    
    renderWithRouter(<App />)
    const user = userEvent.setup()
    
    // Find and click the hamburger menu button (on mobile it should be visible)
    const menuButton = screen.getByLabelText('Open menu')
    await user.click(menuButton)
    
    // The mobile menu should now be visible
    const closeButton = screen.getByText((_, element) => {
      return element?.tagName.toLowerCase() === 'path' && element.getAttribute('d') === 'M6 18L18 6M6 6l12 12'
    })
    expect(closeButton).toBeInTheDocument()
    
    // Check that sidebar links are visible in the mobile menu
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About Me').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Blog').length).toBeGreaterThan(0)
  })
  
  it('closes mobile menu when a link is clicked', async () => {
    // Override the matchMedia mock to simulate a mobile device
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(max-width: 1023px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    
    renderWithRouter(<App />)
    const user = userEvent.setup()
    
    // Open the mobile menu
    await user.click(screen.getByLabelText('Open menu'))
    
    // Click a navigation link in the mobile menu
    await user.click(screen.getAllByText('About Me')[0])
    
    // The mobile menu should be closed and About page should be visible
    await waitFor(() => {
      expect(screen.getByTestId('about')).toBeInTheDocument()
      // The close button should no longer be in the document
      const closeButton = screen.queryByText((_, element) => {
        return element?.tagName.toLowerCase() === 'path' && element.getAttribute('d') === 'M6 18L18 6M6 6l12 12'
      })
      expect(closeButton).not.toBeInTheDocument()
    })
  })
})
