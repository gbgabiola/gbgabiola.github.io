import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:3100';

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  use: {
    ...devices['Desktop Chrome'],
    baseURL,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm start -- --hostname 127.0.0.1 --port 3100',
    url: baseURL,
  },
});
