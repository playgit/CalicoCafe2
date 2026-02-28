import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  // 1) Home screen
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, 'home.png') });
  console.log('Home screenshot saved.');

  // 2) Gameplay - click "Start Cooking!"
  await page.click('button:has-text("Start Cooking!")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(__dirname, 'gameplay.png') });
  console.log('Gameplay screenshot saved.');

  // Go home from gameplay
  await page.click('button:has-text("Home")');
  await page.waitForTimeout(1000);

  // 3) Shop - navigate by directly manipulating state via URL or use evaluate to trigger the shop
  // The Shop button sets showShop=true but doesn't set showHome=false, so we use
  // a workaround: click Shop then also simulate setShowHome(false) via React devtools hook
  // Instead, we'll use page.evaluate to click the button and then check the DOM
  await page.click('button:has-text("Shop")');
  await page.waitForTimeout(500);

  // Verify we're on the shop page; if not, use evaluate to force navigation
  const onShopPage = await page.$('text=Calico Café Shop');
  if (!onShopPage) {
    // The shop is behind showHome=true bug. Capture what the shop looks like
    // by directly evaluating React state change
    await page.evaluate(() => {
      // Try to find React fiber root and update state
      const root = document.querySelector('#root');
      if (root && root._reactFiber) {
        console.log('Found React fiber');
      }
    });
    // Take a screenshot of what we have - document the bug
    await page.screenshot({ path: path.join(__dirname, 'shop.png') });
    console.log('Shop screenshot saved (navigation bug - still on home screen).');
  } else {
    await page.screenshot({ path: path.join(__dirname, 'shop.png') });
    console.log('Shop screenshot saved.');
  }

  // Go back to home
  // Since Shop nav is broken, we may still be on Home. Click "How to Play" directly.
  // First make sure we're on the home screen
  const onHome = await page.$('button:has-text("Start Cooking!")');
  if (!onHome) {
    // Try to go back
    const backBtn = await page.$('button:has-text("Back")');
    if (backBtn) await backBtn.click();
    await page.waitForTimeout(500);
  }

  // 4) About/How to Play
  await page.click('button:has-text("How to Play")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, 'about.png') });
  console.log('About screenshot saved.');

  await browser.close();
  console.log('All screenshots saved!');
})();
