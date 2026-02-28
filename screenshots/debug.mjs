import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);

  // Click Shop
  await page.click('button:has-text("Shop")');
  await page.waitForTimeout(1000);

  // Get all buttons on the page
  const buttons = await page.$$eval('button', btns => btns.map(b => ({
    text: b.textContent.trim(),
    visible: b.offsetParent !== null
  })));
  console.log('Buttons on shop page:', JSON.stringify(buttons, null, 2));

  // Get all text content
  const bodyText = await page.$eval('body', el => el.innerText.slice(0, 500));
  console.log('Body text:', bodyText);

  await browser.close();
})();
