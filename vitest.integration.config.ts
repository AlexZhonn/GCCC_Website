import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    // Integration tests run against a real Payload instance
    include: ['tests/integration/**/*.test.ts'],
    environment: 'node',
    globals: true,
    // Longer timeout for API calls + DB startup
    testTimeout: 30_000,
    hookTimeout: 30_000,
    // Run serially — tests share a single CMS instance
    sequence: { concurrent: false },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
