import '@testing-library/jest-dom'

// Reset sessionStorage between tests so GcccIntro state doesn't bleed
beforeEach(() => {
  sessionStorage.clear()
})

// Silence console.warn from cms.ts when VITE_CMS_URL is not set in tests
vi.stubEnv('VITE_CMS_URL', '')
