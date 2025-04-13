import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import Header from '../Header'

describe('Header Component', () => {
  it('renders desktop version correctly', () => {
    render(<Header />)
    
    // Check that the title is rendered with the correct text
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Spice Roll')
    
    // Mobile menu button should not be visible in desktop mode
    const menuButton = screen.queryByLabelText('Open menu')
    expect(menuButton).not.toBeInTheDocument()
  })
  
  it('renders mobile version correctly', () => {
    render(<Header isMobile={true} toggleMobileMenu={() => {}} />)
    
    // Check that the title is rendered with the correct text
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Spice Roll')
    
    // Mobile menu button should be visible in mobile mode
    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toBeInTheDocument()
  })
  
  it('calls toggleMobileMenu when button is clicked', async () => {
    const mockToggle = vi.fn()
    const user = userEvent.setup()
    
    render(<Header isMobile={true} toggleMobileMenu={mockToggle} />)
    
    // Find the menu button and click it
    const menuButton = screen.getByLabelText('Open menu')
    await user.click(menuButton)
    
    // Check that the toggle function was called
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })
})
