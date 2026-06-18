import { test, expect } from '@playwright/test'

test.describe('Sermon player', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#sermons')
    await page.waitForSelector('header', { state: 'visible', timeout: 8000 })
  })

  test('shows the sermon archive list', async ({ page }) => {
    // At least one sermon title should be visible
    const sermonSection = page.locator('#sermons')
    await expect(sermonSection).toBeVisible()
    // First sermon from fixtures
    await expect(sermonSection.getByText('Abiding in the Vine')).toBeVisible()
  })

  test('clicking an archive item updates the active sermon', async ({ page }) => {
    const sermonSection = page.locator('#sermons')
    // Click the second sermon in the archive
    await sermonSection.getByText('Foundations of Faith').click()
    // The player area should now reflect this sermon's content
    await expect(sermonSection.getByText('James 1:22-25')).toBeVisible()
  })

  test('Video and Audio tabs are present', async ({ page }) => {
    const sermonSection = page.locator('#sermons')
    await expect(sermonSection.getByRole('tab', { name: /video/i })).toBeVisible()
    await expect(sermonSection.getByRole('tab', { name: /audio/i })).toBeVisible()
  })

  test('shows Chinese sermon titles when language is zh', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('header', { state: 'visible', timeout: 8000 })
    await page.getByText('中文').click()
    await page.locator('a[href="#sermons"]').click()
    const sermonSection = page.locator('#sermons')
    await expect(sermonSection.getByText('常在葡萄樹上')).toBeVisible()
  })
})
