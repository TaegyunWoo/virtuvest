import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  console.log("Starting Puppeteer...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const routes = [
    { url: 'http://localhost:5175/login', name: 'login.png' },
    { url: 'http://localhost:5175/signup', name: 'signup.png' },
    { url: 'http://localhost:5175/', name: 'dashboard.png' },
    { url: 'http://localhost:5175/stocks', name: 'stocks_search.png' },
    { url: 'http://localhost:5175/stocks/005930', name: 'stock_detail.png' },
    { url: 'http://localhost:5175/portfolio', name: 'portfolio.png' },
    { url: 'http://localhost:5175/transactions', name: 'transactions.png' },
  ];

  for (const route of routes) {
    console.log(`Navigating to ${route.url}...`);
    try {
      await page.goto(route.url, { waitUntil: 'networkidle2', timeout: 10000 });
      await new Promise(r => setTimeout(r, 2000)); // allow time for fake API/charts
      const savePath = path.join('/Users/taegyunwoo/Workspace/Projects/virtuvest/FE/docs/screenshots', route.name);
      await page.screenshot({ path: savePath });
      console.log(`Saved ${route.name} to ${savePath}`);
    } catch(err) {
      console.error(`Error taking screenshot for ${route.url}: `, err.message);
    }
  }

  await browser.close();
  console.log("Done.");
})();
