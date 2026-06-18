import { test, expect } from '@playwright/test'

test.describe('Language toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for the intro animation to finish or skip it
    // The intro fades out after ~5.6s; wait for the header to be visible
    await page.waitForSelector('header', { state: 'visible', timeout: 8000 })
  })

  test('defaults to English', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Sermons' })).toBeVisible()
  })

  test('switches UI to Chinese when 中文 is clicked', async ({ page }) => {
    await page.getByText('中文').click()
    // Nav items should now show Chinese
    await expect(page.getByRole('link', { name: '關於我們' })).toBeVisible()
  })

  test('switches back to English when EN is clicked', async ({ page }) => {
    await page.getByText('中文').click()
    await page.getByText('EN').click()
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
  })

  test('hero section text changes language', async ({ page }) => {
    // English hero has "I'm New Here" button
    await expect(page.getByRole('button', { name: /new here/i })).toBeVisible()
    await page.getByText('中文').click()
    // Chinese equivalent
    await expect(page.getByRole('button', { name: /初次來訪/ })).toBeVisible()
  })
})
