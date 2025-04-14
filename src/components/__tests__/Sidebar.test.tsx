import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import Sidebar from '../Sidebar'

// Utility wrapper to provide router context
const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  )
}

describe('Sidebar Component', () => {
  it('renders all navigation items', () => {
    renderWithRouter(<Sidebar />)
    
    // Check for all navigation links
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })
  
  it('applies correct styling for mobile view', () => {
    renderWithRouter(<Sidebar isMobile={true} />)
    
    // The navigation should have mobile-specific classes
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('py-4')
    expect(nav).not.toHaveClass('border-r')
    expect(nav).not.toHaveClass('border-dark-400')
    
    // Check that the menu has larger text in mobile mode
    const ul = nav.querySelector('ul')
    expect(ul).toHaveClass('text-lg')
  })
  
  it('applies correct styling for desktop view', () => {
    renderWithRouter(<Sidebar isMobile={false} />)
    
    // The navigation should have desktop-specific classes
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('p-5')
    expect(nav).toHaveClass('border-r')
    expect(nav).toHaveClass('border-dark-400')
    expect(nav).toHaveClass('shadow-md')
    
    // Check that the menu doesn't have mobile text size
    const ul = nav.querySelector('ul')
    expect(ul).not.toHaveClass('text-lg')
  })
  
  it('calls closeMobileMenu when a link is clicked in mobile view', async () => {
    const mockCloseMobileMenu = vi.fn()
    const user = userEvent.setup()
    
    renderWithRouter(
      <Sidebar isMobile={true} closeMobileMenu={mockCloseMobileMenu} />
    )
    
    // Click on a navigation link
    await user.click(screen.getByText('About Me'))
    
    // Check that the close function was called
    expect(mockCloseMobileMenu).toHaveBeenCalledTimes(1)
  })
  
  it('does not call closeMobileMenu in desktop view', async () => {
    const mockCloseMobileMenu = vi.fn()
    const user = userEvent.setup()
    
    renderWithRouter(
      <Sidebar isMobile={false} closeMobileMenu={mockCloseMobileMenu} />
    )
    
    // Click on a navigation link
    await user.click(screen.getByText('About Me'))
    
    // Check that the close function was not called
    expect(mockCloseMobileMenu).not.toHaveBeenCalled()
  })
  
  it('applies dark theme styling to navigation links', () => {
    renderWithRouter(<Sidebar />)
    
    const links = screen.getAllByRole('link')
    
    // Check that all links have the correct base styling
    links.forEach(link => {
      expect(link).toHaveClass('block')
      expect(link).toHaveClass('py-2')
      expect(link).toHaveClass('px-4')
      expect(link).toHaveClass('rounded-md')
      expect(link).toHaveClass('transition-colors')
    })
    
    // At least one link should have the inactive state styling
    const inactiveLink = links.find(link => link.classList.contains('text-light-100'))
    expect(inactiveLink).toBeTruthy()
  })
})
