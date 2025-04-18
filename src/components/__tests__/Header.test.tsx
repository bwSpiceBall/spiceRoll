import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Header from '../Header'

describe('Header Component', () => {
  it('renders desktop version correctly', () => {
    render(<Header />)
    
    // Check that the title is rendered with the correct text
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Spice Roll')
    expect(heading).toHaveClass('text-primary')
    
    // Mobile menu button should not be visible in desktop mode
    const menuButton = screen.queryByLabelText('Open menu')
    expect(menuButton).not.toBeInTheDocument()
    
    // Header should have dark theme border
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('border-b')
    expect(header).toHaveClass('border-dark-400')
  })
  
  it('renders mobile version correctly', () => {
    render(<Header isMobile={true} toggleMobileMenu={() => {}} />)
    
    // Check that the title is rendered with the correct text
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Spice Roll')
    expect(heading).toHaveClass('text-primary')
    
    // Mobile menu button should be visible in mobile mode
    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveClass('text-light')
    expect(menuButton).toHaveClass('hover:text-primary')
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
  
  it('uses the correct layout positioning in desktop mode', () => {
    render(<Header />)
    
    const containerDiv = screen.getByRole('heading', { level: 1 }).closest('div')
    expect(containerDiv).toHaveClass('flex')
    expect(containerDiv).toHaveClass('w-full')
    expect(containerDiv).toHaveClass('items-center')
    expect(containerDiv).toHaveClass('justify-start')
    expect(containerDiv).toHaveClass('pl-4')
  })
})
