import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://reportportal.epam.com/ui/#login',
  },
})