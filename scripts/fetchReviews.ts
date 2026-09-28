import puppeteer from 'puppeteer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const REVIEWS_URL = "https://www.google.com/travel/hotels/entity/CgoImpG9gLjB7qk8EAE/reviews?q=dehra%20gopipur%20vishram%20sthal&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C72887412%2C73064764%2C121529350%2C121738283%2C121762713&hl=en-IN&gl=in&cs=1&ssta=1&ts=CAEaBAoCGgAqBAoAGgA&qs=CAE4Ag&ictx=111";

export async function scrapeGoogleReviews() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  console.log('Navigating to Google Hotels Reviews...');
  await page.goto(REVIEWS_URL, { waitUntil: 'networkidle2' });

  console.log('Extracting reviews...');
  const reviews = await page.evaluate(() => {
    const results: any[] = [];
    const reviewBlocks = document.querySelectorAll('.Svr5cf.bKhjM');
    
    reviewBlocks.forEach(block => {
      const textEl = block.querySelector('.K7oBsc div');
      const authorEl = block.querySelector('.Y0A0hc');
      const ratingEl = block.querySelector('.GDWaad');
      
      if (textEl && authorEl) {
        results.push({
          author: authorEl.textContent?.trim() || 'Anonymous',
          comment: textEl.textContent?.trim() || '',
          rating: ratingEl ? parseFloat(ratingEl.textContent || '5') : 5,
        });
      }
    });

    return results;
  });

  console.log(`Found ${reviews.length} reviews.`);
  await browser.close();
  return reviews;
}

if (require.main === module) {
  scrapeGoogleReviews().catch(console.error);
}
