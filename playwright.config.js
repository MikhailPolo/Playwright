const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        launchOptions: {
            headless: false,
            defaultViewport: null,
            slowMo: 3000,
            args: ['--start-maximized'],
        }
    },
    projects: [
        {
        name: 'chromium',
        use: {...devices['Desktop Chrome']},
        },
    ],
});