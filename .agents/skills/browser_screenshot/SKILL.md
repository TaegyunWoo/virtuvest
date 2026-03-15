---
name: Browser Screenshot Automation
description: A Puppeteer-based automation skill to capture web browser screens and save them automatically as images.
---

# Browser Screenshot Automation Skill

This skill utilizes Puppeteer to capture and save screenshots of specified web pages in bulk to a designated directory.

## Prerequisites
- Node.js must be installed.
- Puppeteer must be installed globally or within the project environment.
  - `npm install -g puppeteer` or `npm install puppeteer`

## Usage

To use this skill, you must create a JSON configuration file specifying the target URLs and then execute the provided script.

### Step 1: Create a Configuration File (`config.json`)

Create a JSON file containing the list of URLs you want to capture. (e.g., `/tmp/screenshot_config.json`)

```json
{
  "viewport": {
    "width": 1280,
    "height": 800
  },
  "outDir": "/absolute/path/to/save/screenshots",
  "routes": [
    {
      "url": "http://localhost:5175/",
      "name": "dashboard.png",
      "fullPage": false
    },
    {
      "url": "https://example.com/about",
      "name": "about_full.png",
      "fullPage": true
    }
  ]
}
```

- `viewport`: The dimensions of the browser window to capture (Default: 1280x800).
- `outDir`: The absolute path to the directory where the captured images will be saved. If the directory does not exist, it will be automatically created.
- `routes`: A list of target URL objects to capture.
  - `url`: The web address to navigate to.
  - `name`: The file name to save as (including extension).
  - `fullPage`: Whether to capture the full page by scrolling (`true` or `false`).

### Step 2: Execute the Script

Run the script by passing the absolute path to your JSON configuration file as an argument.

```bash
node /Users/taegyunwoo/Workspace/Projects/virtuvest/.agents/skills/browser_screenshot/scripts/take_screenshots.js /absolute/path/to/config.json
```
