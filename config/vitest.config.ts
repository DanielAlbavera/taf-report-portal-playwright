import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    hookTimeout: 30000,
    testTimeout: 60000,
    maxThreads: 5,
    browser: { 
        name: 'chromium',
        provider: 'playwright',
        headless: false,
    },
    include: [ '**/vitest-test-runner/**' ],
    exclude: [ '**/playwright-test-runner/**' ],
  },
});