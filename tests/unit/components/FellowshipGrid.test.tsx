/**
 * Component tests for FellowshipGrid.tsx
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FellowshipGrid from '../../../src/components/FellowshipGrid'
import { fellowshipsData } from '../../../src/data'

describe('FellowshipGrid', () => {
  it('renders all fellowship names in English', () => {
    render(<FellowshipGrid currentLang="en" />)
    fellowshipsData.forEach((f) => {
      expect(screen.getByText(f.name.en)).toBeInTheDocument()
    })
  })

  it('renders fellowship names in Chinese when currentLang is zh', () => {
    render(<FellowshipGrid currentLang="zh" />)
    fellowshipsData.forEach((f) => {
      expect(screen.getByText(f.name.zh)).toBeInTheDocument()
    })
  })

  it('opens a modal with the correct fellowship when a card is clicked', () => {
    render(<FellowshipGrid currentLang="en" />)
    const campus = fellowshipsData.find((f) => f.isFeatured)!
    // Click the featured fellowship card
    fireEvent.click(screen.getByText(campus.name.en))
    // Modal should show the description
    expect(screen.getByText(campus.description.en)).toBeInTheDocument()
  })

  it('closes the modal when the close button is clicked', () => {
    render(<FellowshipGrid currentLang="en" />)
    const campus = fellowshipsData.find((f) => f.isFeatured)!
    fireEvent.click(screen.getByText(campus.name.en))
    // Find and click close button (×)
    const closeBtn = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeBtn)
    expect(screen.queryByText(campus.description.en)).not.toBeInTheDocument()
  })
})
