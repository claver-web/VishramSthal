const puppeteer = require('puppeteer');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// The Google Hotels Review Link
const REVIEWS_URL = "https://www.google.com/travel/hotels/entity/CgoImpG9gLjB7qk8EAE/reviews?q=dehra%20gopipur%20vishram%20sthal&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C72887412%2C73064764%2C121529350%2C121738283%2C121762713&hl=en-IN&gl=in&cs=1&ssta=1&ts=CAEaBAoCGgAqBAoAGgA&qs=CAE4Ag&ictx=111";

async function scrapeGoogleReviews() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  console.log('Navigating to Google Hotels Reviews...');
  await page.goto(REVIEWS_URL, { waitUntil: 'networkidle2' });

  console.log('Extracting reviews...');
  // This evaluates inside the browser context
  const reviews = await page.evaluate(() => {
    const results = [];
    // These class names are common for Google Travel/Places but can change.
    // We look for general article or div blocks that contain text and stars.
    const reviewBlocks = document.querySelectorAll('.Svr5cf.bKhjM'); // Class used by Google Travel reviews
    
    reviewBlocks.forEach(block => {
      // Extract review text
      const textEl = block.querySelector('.K7oBsc div');
      const text = textEl ? textEl.innerText.trim() : null;
      
      // Extract rating (usually found in an aria-label like "5 out of 5 stars")
      const ratingEl = block.querySelector('[aria-label*="out of 5 stars"]');
      let rating = 5; // Default fallback
      if (ratingEl) {
        const match = ratingEl.getAttribute('aria-label').match(/(\d+)\s+out of/);
        if (match) rating = parseInt(match[1]);
      }

      if (text) {
        results.push({ rating, comment: text });
      }
    });
    return results;
  });

  console.log(`Found ${reviews.length} reviews.`);
  await browser.close();
  return reviews;
}

async function main() {
  try {
    const reviews = await scrapeGoogleReviews();
    
    if (reviews.length === 0) {
      console.log('No reviews found. Google might have changed their DOM or blocked the request.');
      return;
    }

    console.log('Saving to database...');
    // IMPORTANT: Prisma Review schema requires a userId and a roomId.
    // We will find the first user and first room to attach these generic reviews to.
    // In a real scenario, you might want to create a generic "Google User" and attach them to a specific room.
    let user = await prisma.user.findFirst();
    if (!user) {
      console.log('No user found, creating a dummy user for reviews...');
      user = await prisma.user.create({
        data: {
          clerkId: 'google_reviews_dummy',
          email: 'reviews@vishramsthal.com',
          name: 'Google Guest'
        }
      });
    }

    let room = await prisma.room.findFirst();
    if (!room) {
      console.log('No room found, creating a dummy room for reviews...');
      room = await prisma.room.create({
        data: {
          number: '999',
          type: 'STANDARD',
          name: 'General Booking',
          price: 1000
        }
      });
    }

    let savedCount = 0;
    for (const rev of reviews) {
      await prisma.review.create({
        data: {
          userId: user.id,
          roomId: room.id,
          rating: rev.rating,
          comment: rev.comment,
          status: 'PUBLISHED' // So they show up immediately
        }
      });
      savedCount++;
    }
    
    console.log(`Successfully saved ${savedCount} reviews to the database!`);
  } catch (err) {
    console.error('Error fetching or saving reviews:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
