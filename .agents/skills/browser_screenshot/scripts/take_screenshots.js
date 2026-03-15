const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const configFile = process.argv[2];
if (!configFile) {
    console.error("Usage: node take_screenshots.js <config.json>");
    process.exit(1);
}

let config;
try {
    config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
} catch (error) {
    console.error(`Error reading or parsing the configuration file: ${error.message}`);
    process.exit(1);
}

(async () => {
    console.log("Starting Puppeteer screenshot capture...");
    // Launching browser with the new headless mode
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    const width = config.viewport?.width || 1280;
    const height = config.viewport?.height || 800;
    await page.setViewport({ width, height });

    const outDir = config.outDir || process.cwd();
    if (!fs.existsSync(outDir)) {
        console.log(`Creating output directory: ${outDir}`);
        fs.mkdirSync(outDir, { recursive: true });
    }

    const routes = config.routes || [];
    if (routes.length === 0) {
        console.log("No routes configured for capturing.");
    }

    for (const route of routes) {
        console.log(`\nNavigating to: ${route.url}...`);
        try {
            // Wait until network is idle or until 15 seconds have passed
            await page.goto(route.url, { waitUntil: 'networkidle2', timeout: 15000 });

            // Wait for an additional 2 seconds to allow charts/animations to finish loading
            await new Promise(r => setTimeout(r, 2000));

            const savePath = path.join(outDir, route.name);
            await page.screenshot({
                path: savePath,
                fullPage: route.fullPage || false
            });
            console.log(`✅ Saved successfully: ${savePath}`);
        } catch (err) {
            console.error(`❌ Error occurred (${route.url}): `, err.message);
        }
    }

    await browser.close();
    console.log("\nAll screenshot tasks have been completed.");
})();
