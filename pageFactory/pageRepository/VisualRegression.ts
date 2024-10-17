import fs from 'fs-extra';
import { Page, BrowserContext } from '@playwright/test';

export class VisualRegression {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async imageComparision(page: Page, screenshotName: string, screenshotDir = './screenshots'): Promise<number> {
        
        // Dynamically import pixelmatch and PNG from pngjs
        const { default: pixelmatch } = await import('pixelmatch');
        const { PNG } = await import('pngjs');

        // Define separate paths for baseline, current, and diff screenshots
        const baselineDir = `${screenshotDir}/baseline`;
        const currentDir = `${screenshotDir}/current`;
        const diffDir = `${screenshotDir}/diff`;

        // Ensure the directories exist
        fs.mkdirsSync(baselineDir);
        fs.mkdirsSync(currentDir);
        fs.mkdirsSync(diffDir);

        // Define paths for storing screenshots
        const baselineImagePath = `${baselineDir}/${screenshotName}-baseline.png`;
        const currentImagePath = `${currentDir}/${screenshotName}-current.png`;
        const diffImagePath = `${diffDir}/${screenshotName}-diff.png`;

        // Capture a screenshot of the current state
        await page.screenshot({ path: currentImagePath, fullPage: true });

        // If baseline image doesn't exist, save the current image as the baseline
        if (!fs.existsSync(baselineImagePath)) {
            fs.copyFileSync(currentImagePath, baselineImagePath);
            console.log('Baseline image saved.');
            return 0; // Return 0 since no differences are possible when creating a baseline
        }

        // Read baseline and current images
        const baselineImage = PNG.sync.read(fs.readFileSync(baselineImagePath));
        const currentImage = PNG.sync.read(fs.readFileSync(currentImagePath));

        // Prepare an empty image to store the diff
        const { width, height } = baselineImage;
        const diffImage = new PNG({ width, height });

        // Compare the images and highlight the differences
        const numDiffPixels = pixelmatch(
            baselineImage.data,
            currentImage.data,
            diffImage.data,
            width,
            height,
            { threshold: 0.1, diffColor: [255, 0, 0, 255] } // Highlight differences in red
        );

        // Save the diff image if there are differences
        if (numDiffPixels > 0) {
            fs.writeFileSync(diffImagePath, PNG.sync.write(diffImage));
            console.log(`Differences found and saved to ${diffImagePath}`);
        } else {
            console.log('No visual differences found.');
        }

        return numDiffPixels;
    }




    async compareRegion(page: Page, regionSelector: string, screenshotName: string, screenshotDir = './screenshots'): Promise<number> {
        // Dynamically import pixelmatch and PNG from pngjs
        const { default: pixelmatch } = await import('pixelmatch');
        const { PNG } = await import('pngjs');

        // Define separate paths for baseline, current, and diff screenshots for the region
        const baselineDir = `${screenshotDir}/baseline/region`;
        const currentDir = `${screenshotDir}/current/region`;
        const diffDir = `${screenshotDir}/diff/region`;

        // Ensure the directories exist
        fs.mkdirsSync(baselineDir);
        fs.mkdirsSync(currentDir);
        fs.mkdirsSync(diffDir);

        // Define paths for storing screenshots of the specific region
        const baselineImagePath = `${baselineDir}/${screenshotName}-baseline.png`;
        const currentImagePath = `${currentDir}/${screenshotName}-current.png`;
        const diffImagePath = `${diffDir}/${screenshotName}-diff.png`;

       
        // Get the bounding box of the region
        const region = await page.locator(regionSelector).boundingBox();
        if (!region) {
            throw new Error(`Element with selector ${regionSelector} not found.`);
        }

        // Capture a screenshot of the specific region
        await page.screenshot({
            path: currentImagePath,
            clip: {
                x: Math.round(region.x),
                y: Math.round(region.y),
                width: Math.round(region.width),
                height: Math.round(region.height),
            }
        });

        // If baseline image doesn't exist, save the current image as the baseline
        if (!fs.existsSync(baselineImagePath)) {
            fs.copyFileSync(currentImagePath, baselineImagePath);
            console.log('Baseline image saved for region.');
            return 0; // Return 0 since no differences are possible when creating a baseline
        }

        // Read baseline and current images
        const baselineImage = PNG.sync.read(fs.readFileSync(baselineImagePath));
        const currentImage = PNG.sync.read(fs.readFileSync(currentImagePath));

        // Prepare an empty image to store the diff
        const { width, height } = baselineImage;
        const diffImage = new PNG({ width, height });

        // Compare the images and highlight the differences
        const numDiffPixels = pixelmatch(
            baselineImage.data,
            currentImage.data,
            diffImage.data,
            width,
            height,
            { threshold: 0.1, diffColor: [255, 0, 0, 255] } // Highlight differences in red
        );

        // Save the diff image if there are differences
        if (numDiffPixels > 0) {
            fs.writeFileSync(diffImagePath, PNG.sync.write(diffImage));
            console.log(`Differences found and saved to ${diffImagePath}`);
        } else {
            console.log('No visual differences found for the region.');
        }

        return numDiffPixels;
    }

}
