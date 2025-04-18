import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

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
    
    // Use getAllByText and check the first instance, since the text appears in multiple places
    const testedCodeElements = screen.getAllByText(/thoroughly tested code/i)
    expect(testedCodeElements.length).toBeGreaterThan(0)
    expect(testedCodeElements[0]).toBeInTheDocument()
  })
  
  it('has the correct dark theme styling', () => {
    render(<FrontPage />)
    
    // Find the main element
    const mainElement = screen.getByRole('main')
    
    // Check that it has the expected classes
    expect(mainElement).toHaveClass('flex')
    expect(mainElement).toHaveClass('flex-1')
    expect(mainElement).toHaveClass('flex-col')
    expect(mainElement).toHaveClass('items-center')
    
    // Check the heading has correct styling with dark theme colors
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('mb-8')
    expect(heading).toHaveClass('text-4xl')
    expect(heading).toHaveClass('font-bold')
    
    // Heading should have spans with different colors
    const headingSpans = heading.querySelectorAll('span')
    expect(headingSpans[0]).toHaveClass('text-light')
    expect(headingSpans[1]).toHaveClass('text-primary')
    expect(headingSpans[2]).toHaveClass('text-light')
    
    // Check the divider element
    const divider = screen.getByRole('main').querySelector('.h-1.w-16.bg-primary')
    expect(divider).toBeInTheDocument()
    
    // Check the paragraph styling
    const paragraph = screen.getByText(/Hi, I'm a Software Engineer/i)
    expect(paragraph).toHaveClass('max-w-2xl')
    expect(paragraph).toHaveClass('text-center')
    expect(paragraph).toHaveClass('text-lg')
    expect(paragraph).toHaveClass('text-light-100')
    
    // Check that the feature cards have dark theme styling
    const cards = document.querySelectorAll('.rounded-lg.bg-dark-200')
    expect(cards.length).toBe(3)
    cards.forEach(card => {
      expect(card).toHaveClass('p-6')
      expect(card).toHaveClass('shadow-md')
      expect(card).toHaveClass('border')
      expect(card).toHaveClass('border-dark-400')
    })
  })
})
