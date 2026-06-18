import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('header', { state: 'visible', timeout: 8000 })
  })

  test('clicking About nav link scrolls to the about section', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click()
    await expect(page.locator('#about')).toBeInViewport({ ratio: 0.3 })
  })

  test('clicking Contact nav link scrolls to the contact section', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click()
    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.3 })
  })

  test('"I\'m New Here" button opens the visitor FAQ modal', async ({ page }) => {
    await page.getByRole('button', { name: /new here/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    // Modal should contain at least one FAQ item
    await expect(page.getByRole('dialog').getByText(/language/i)).toBeVisible()
  })

  test('mobile hamburger menu opens nav links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForSelector('header', { state: 'visible', timeout: 8000 })

    const hamburger = page.getByRole('button', { name: /menu/i })
    await hamburger.click()
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
  })
})
