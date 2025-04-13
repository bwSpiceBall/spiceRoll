import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FrontPage from '../FrontPage'

describe('FrontPage Component', () => {
  it('renders the introduction text', () => {
    render(<FrontPage />)
    
    // Check that the introduction text is rendered
    const introText = screen.getByText(/Hi, I'm a Software Engineer/i)
    expect(introText).toBeInTheDocument()
    
    // Check that the text contains other key phrases
    expect(screen.getByText(/full stack development/i)).toBeInTheDocument()
    expect(screen.getByText(/code quality and scalability/i)).toBeInTheDocument()
    expect(screen.getByText(/thoroughly tested code/i)).toBeInTheDocument()
  })
  
  it('has the correct styling', () => {
    render(<FrontPage />)
    
    // Find the main element
    const mainElement = screen.getByRole('main')
    
    // Check that it has the expected classes
    expect(mainElement).toHaveClass('flex')
    expect(mainElement).toHaveClass('flex-1')
    expect(mainElement).toHaveClass('flex-col')
    expect(mainElement).toHaveClass('items-center')
    
    // Check the paragraph styling
    const paragraph = screen.getByText(/Hi, I'm a Software Engineer/i)
    expect(paragraph).toHaveClass('max-w-2xl')
    expect(paragraph).toHaveClass('text-center')
    expect(paragraph).toHaveClass('text-lg')
  })
})
