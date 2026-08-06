import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });
  
  await page.goto('http://localhost:3000/directions', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'screenshot-directions.png'), fullPage: true });

  await page.goto('http://localhost:3000/rooms', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'screenshot-rooms.png'), fullPage: true });

  await browser.close();
  console.log("Screenshots saved!");
})();
