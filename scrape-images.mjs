import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

puppeteer.use(StealthPlugin());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filename))
           .on('error', reject)
           .once('close', () => resolve(filename));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
}

(async () => {
  console.log("Starting stealth browser...");
  const browser = await puppeteer.launch({ headless: false }); // run headful to bypass some checks
  const page = await browser.newPage();
  
  const url = 'https://www.makemytrip.com/hotels/the_kanatal_homestay_by_saur_properties-details-kanatal.html';
  console.log(`Navigating to ${url}...`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Scroll down to trigger lazy loading of images
    await page.evaluate(() => {
        window.scrollBy(0, 1000);
    });
    await new Promise(r => setTimeout(r, 3000));
    
    const images = await page.evaluate(() => {
      const imgElements = Array.from(document.querySelectorAll('img'));
      return imgElements.map(img => img.src).filter(src => src && src.includes('r1imghtlak.ibcdn.com') && !src.includes('thumb'));
    });

    const uniqueImages = [...new Set(images)];
    console.log(`Found ${uniqueImages.length} property images.`);

    let count = 0;
    for (let imgUrl of uniqueImages) {
        count++;
        const dest = path.join(__dirname, 'public', `real-room-${count}.jpg`);
        console.log(`Downloading ${imgUrl} to ${dest}...`);
        await downloadImage(imgUrl, dest);
        if (count >= 5) break;
    }

  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
    console.log("Done.");
  }
})();
