import { test, expect } from '@playwright/test'

test.describe('Fellowship grid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#fellowships')
    await page.waitForSelector('header', { state: 'visible', timeout: 8000 })
  })

  test('displays the featured campus fellowship as the hero card', async ({ page }) => {
    const section = page.locator('#fellowships')
    await expect(section.getByText('Campus Student Fellowship')).toBeVisible()
  })

  test('opens a modal when a fellowship card is clicked', async ({ page }) => {
    const section = page.locator('#fellowships')
    await section.getByText('Campus Student Fellowship').first().click()
    // Modal should appear with the full description
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('dialog').getByText('University of Florida')).toBeVisible()
  })

  test('modal closes when the close button is clicked', async ({ page }) => {
    const section = page.locator('#fellowships')
    await section.getByText('Campus Student Fellowship').first().click()
    await page.getByRole('button', { name: /close/i }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('shows Chinese fellowship names when language is zh', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('header', { state: 'visible', timeout: 8000 })
    await page.getByText('中文').click()
    await page.locator('a[href="#fellowships"]').click()
    await expect(page.locator('#fellowships').getByText('校園學生團契')).toBeVisible()
  })
})
