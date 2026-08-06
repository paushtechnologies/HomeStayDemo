const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');

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
  console.log("Starting browser...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Try MakeMyTrip first
  const url = 'https://www.makemytrip.com/hotels/the_kanatal_homestay_by_saur_properties-details-kanatal.html';
  console.log(`Navigating to ${url}...`);
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Extract image URLs
    const images = await page.evaluate(() => {
      const imgElements = Array.from(document.querySelectorAll('img'));
      return imgElements.map(img => img.src).filter(src => src && (src.includes('r1imghtlak.ibcdn.com') || src.includes('mmtcdn')));
    });

    const uniqueImages = [...new Set(images)];
    console.log(`Found ${uniqueImages.length} property images.`);

    // Take the first 3 high-res ones
    let count = 0;
    for (let imgUrl of uniqueImages) {
        if(imgUrl.includes('thumb')) continue; // Skip thumbnails
        count++;
        const dest = path.join(__dirname, 'public', `room-${count}.jpg`);
        console.log(`Downloading ${imgUrl} to ${dest}...`);
        await downloadImage(imgUrl, dest);
        if (count >= 3) break;
    }

    if(count === 0) {
        console.log("No valid images found on MMT, checking Goibibo...");
        await page.goto('https://www.goibibo.com/hotels/the-kanatal-homestay-by-saur-properties-hotel-in-kanatal-1376840707759868774/', { waitUntil: 'networkidle2', timeout: 30000 });
        const gImages = await page.evaluate(() => {
            const imgElements = Array.from(document.querySelectorAll('img'));
            return imgElements.map(img => img.src).filter(src => src && src.includes('gos3.ibcdn.com') && !src.includes('icon') && !src.includes('logo'));
        });
        const gUnique = [...new Set(gImages)];
        for (let imgUrl of gUnique) {
            count++;
            const dest = path.join(__dirname, 'public', `room-${count}.jpg`);
            console.log(`Downloading ${imgUrl} to ${dest}...`);
            await downloadImage(imgUrl, dest);
            if (count >= 3) break;
        }
    }

  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
    console.log("Done.");
  }
})();
