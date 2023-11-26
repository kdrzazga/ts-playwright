// test.ts
import { chromium, Browser, Page } from 'playwright';

(async () => {
  // Open a browser (you can also use 'firefox' or 'webkit')
  const browser: Browser = await chromium.launch();

  // Create a new page
  const page: Page = await browser.newPage();

  // Navigate to a website
  await page.goto('https://demo.seleniumeasy.com/');

  // Perform automation tasks
  // For example, take a screenshot
  await page.screenshot({ path: 'screenshots/example.png' });

  // Close the browser
  await browser.close();
})();
