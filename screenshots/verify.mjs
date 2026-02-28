import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  // Home screen
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(__dirname, 'v2_home.png') });

  // Gameplay
  await page.click('text=Start Cooking!');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(__dirname, 'v2_gameplay.png') });

  // Kitchen tabs — click Sweet tab
  await page.click('text=🍡 Sweet');
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(__dirname, 'v2_sweet_tab.png') });

  // Kitchen tabs — click Drinks tab
  await page.click('text=🧋 Drinks');
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(__dirname, 'v2_drink_tab.png') });

  // Pause — click the pause button
  await page.click('text=⏸ Pause');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(__dirname, 'v2_paused.png') });

  // Use JS to dismiss pause by clicking the resume button via evaluate
  // This bypasses the overlay blocking issue entirely
  await page.evaluate(() => {
    // Find button with text "▶ Resume" and click it programmatically
    const buttons = Array.from(document.querySelectorAll('button'));
    const resumeBtn = buttons.find(b => b.textContent && b.textContent.trim() === '▶ Resume');
    if (resumeBtn) resumeBtn.click();
  });
  await page.waitForTimeout(500);

  // Now click Home via JS to avoid any residual overlay issues
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const homeBtn = buttons.find(b => b.textContent && b.textContent.trim() === 'Home');
    if (homeBtn) homeBtn.click();
  });
  await page.waitForTimeout(1500);

  // Wait for the HomeScreen to appear (Start Cooking! button)
  await page.waitForSelector('text=Start Cooking!', { timeout: 10000 });
  await page.waitForTimeout(300);

  // Now click Shop
  await page.click('text=Shop');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(__dirname, 'v2_shop.png') });

  // Back to home, then About
  await page.click('text=Back');
  await page.waitForTimeout(500);
  await page.waitForSelector('text=Start Cooking!', { timeout: 10000 });
  await page.click('text=How to Play');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(__dirname, 'v2_about.png') });

  await browser.close();
  console.log('Done!');
})();
