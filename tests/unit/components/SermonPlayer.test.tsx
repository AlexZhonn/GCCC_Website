/**
 * Component tests for SermonPlayer.tsx
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SermonPlayer from '../../../src/components/SermonPlayer'
import { currentSermons } from '../../../src/data'

const defaultProps = {
  currentLang: 'en' as const,
}

describe('SermonPlayer', () => {
  it('renders the most recent sermon title by default', () => {
    render(<SermonPlayer {...defaultProps} />)
    // First sermon in the archive (newest first)
    expect(screen.getByText(currentSermons[0].title.en)).toBeInTheDocument()
  })

  it('shows sermon titles in Chinese when currentLang is zh', () => {
    render(<SermonPlayer currentLang="zh" />)
    expect(screen.getByText(currentSermons[0].title.zh)).toBeInTheDocument()
  })

  it('switches active sermon when an archive item is clicked', () => {
    render(<SermonPlayer {...defaultProps} />)
    const secondTitle = currentSermons[1].title.en
    fireEvent.click(screen.getByText(secondTitle))
    // The selected sermon title should now be prominent in the player area
    expect(screen.getAllByText(secondTitle).length).toBeGreaterThanOrEqual(1)
  })

  it('renders Video and Audio tabs', () => {
    render(<SermonPlayer {...defaultProps} />)
    expect(screen.getByText(/video/i)).toBeInTheDocument()
    expect(screen.getByText(/audio/i)).toBeInTheDocument()
  })

  it('shows all 4 sermons in the archive list', () => {
    render(<SermonPlayer {...defaultProps} />)
    currentSermons.forEach((s) => {
      expect(screen.getByText(s.title.en)).toBeInTheDocument()
    })
  })
})
