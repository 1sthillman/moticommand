const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_ICON = 'c:/hatali-talimatlar/logo.jpeg';
const ANDROID_RES_DIR = 'c:/hatali-talimatlar/android/app/src/main/res';

const DENSITIES = [
    { name: 'mipmap-mdpi', size: 48 },
    { name: 'mipmap-hdpi', size: 72 },
    { name: 'mipmap-xhdpi', size: 96 },
    { name: 'mipmap-xxhdpi', size: 144 },
    { name: 'mipmap-xxxhdpi', size: 192 },
];

async function generateIcons() {
    if (!fs.existsSync(SOURCE_ICON)) {
        console.error('Source icon not found at:', SOURCE_ICON);
        process.exit(1);
    }

    console.log('Generating icons from:', SOURCE_ICON);

    for (const density of DENSITIES) {
        const dir = path.join(ANDROID_RES_DIR, density.name);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Generate ic_launcher.png (Square/Default)
        await sharp(SOURCE_ICON)
            .resize(density.size, density.size)
            .toFile(path.join(dir, 'ic_launcher.png'));

        // Generate ic_launcher_round.png (Circle)
        await sharp(SOURCE_ICON)
            .resize(density.size, density.size)
            .composite([{
                input: Buffer.from(
                    `<svg><circle cx="${density.size / 2}" cy="${density.size / 2}" r="${density.size / 2}" /></svg>`
                ),
                blend: 'dest-in'
            }])
            .png()
            .toFile(path.join(dir, 'ic_launcher_round.png'));

        console.log(`Generated ${density.name} (${density.size}x${density.size})`);
    }

    console.log('Icon generation complete!');
}

generateIcons().catch(console.error);
