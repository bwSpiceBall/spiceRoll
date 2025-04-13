import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import About from '../About'

describe('About Component', () => {
  it('renders the heading correctly', () => {
    render(<About />)
    
    // Check that the heading is rendered with correct text
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('About Me')
    expect(heading).toHaveClass('text-3xl')
    expect(heading).toHaveClass('font-bold')
    expect(heading).toHaveClass('text-navy')
  })
  
  it('renders the biographical content', () => {
    render(<About />)
    
    // Check for key phrases in the content
    expect(screen.getByText(/Hello! I'm a Software Engineer/i)).toBeInTheDocument()
    expect(screen.getByText(/full stack development/i)).toBeInTheDocument()
    expect(screen.getByText(/Agile methodologies/i)).toBeInTheDocument()
    expect(screen.getByText(/enhancing features/i)).toBeInTheDocument()
    expect(screen.getByText(/free time/i)).toBeInTheDocument()
  })
  
  it('has the correct container styling', () => {
    render(<About />)
    
    // Get the main container
    const container = screen.getByText(/Hello! I'm a Software Engineer/i).closest('div')
    expect(container).toHaveClass('mx-auto')
    expect(container).toHaveClass('max-w-3xl')
    expect(container).toHaveClass('p-8')
    expect(container).toHaveClass('text-center')
  })
})
