import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import About from '../About'

describe('About Component', () => {
  it('renders the heading correctly', () => {
    render(<About />)
    
    // Check that the heading is rendered with correct text
    const heading = screen.getByText('About Me')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('text-3xl')
    expect(heading).toHaveClass('font-bold')
    expect(heading).toHaveClass('text-light')
    expect(heading).toHaveClass('mb-6')
  })
  
  it('renders the section headings with proper styling', () => {
    render(<About />)
    
    // Check the section headings in the grid
    const skillsHeading = screen.getByText('Skills')
    expect(skillsHeading).toHaveClass('text-2xl')
    expect(skillsHeading).toHaveClass('font-bold')
    expect(skillsHeading).toHaveClass('text-primary')
    expect(skillsHeading).toHaveClass('mb-4')
    
    const experienceHeading = screen.getByText('Experience')
    expect(experienceHeading).toHaveClass('text-2xl')
    expect(experienceHeading).toHaveClass('font-bold')
    expect(experienceHeading).toHaveClass('text-primary')
    expect(experienceHeading).toHaveClass('mb-4')
    
    const educationHeading = screen.getByText('Education')
    expect(educationHeading).toHaveClass('text-2xl')
    expect(educationHeading).toHaveClass('font-bold')
    expect(educationHeading).toHaveClass('text-primary')
    expect(educationHeading).toHaveClass('mb-4')
  })
  
  it('has the correct dark theme styling for containers', () => {
    render(<About />)
    
    // Get the main container elements with dark theme
    const sections = document.querySelectorAll('.bg-dark-200.rounded-lg.p-6.border.border-dark-400')
    expect(sections.length).toBeGreaterThanOrEqual(3)
    
    // Check the skill list items have the correct styling
    const skillItems = screen.getAllByText(/^▹/, { exact: false })
    skillItems.forEach(item => {
      expect(item).toHaveClass('mr-2')
      expect(item).toHaveClass('text-primary')
    })
    
    // Check for text color classes
    const paragraphs = document.querySelectorAll('p.text-light-100')
    expect(paragraphs.length).toBeGreaterThan(0)
  })
})
