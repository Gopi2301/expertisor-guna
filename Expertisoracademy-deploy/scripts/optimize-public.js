import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');

const TARGETS = [
    {
        src: 'business-webinar/background-people.png',
        dest: 'business-webinar/background-people.webp',
        options: { quality: 60, effort: 6 }
    },
    {
        src: 'business-webinar/author.svg',
        dest: 'business-webinar/author.webp',
        options: { quality: 80 }
    },
    {
        src: 'webinar-hero-img.svg',
        dest: 'webinar-hero-img.webp',
        options: { quality: 80 }
    },
    {
        src: 'business-webinar/result_author.png',
        dest: 'business-webinar/result_author.webp'
    },
    {
        src: 'business-webinar/cta-author.png',
        dest: 'business-webinar/cta-author.webp'
    },
    {
        src: 'business-webinar/without_system.png',
        dest: 'business-webinar/without_system.webp'
    },
    {
        src: 'business-webinar/mobile-cta.png',
        dest: 'business-webinar/mobile-cta.webp'
    },
    {
        src: 'business-webinar/mobile-without_system.png',
        dest: 'business-webinar/mobile-without_system.webp'
    },
    {
        src: 'business-webinar/onboarding/Rectangle.png',
        dest: 'business-webinar/onboarding/Rectangle.webp'
    }
];

async function optimize() {
    console.log('🚀 Starting Phase 2: Public Asset Optimization (ESM)...');

    for (const target of TARGETS) {
        const fullSrc = path.join(PUBLIC_DIR, target.src);
        const fullDest = path.join(PUBLIC_DIR, target.dest);

        // Ensure destination directory exists
        const destDir = path.dirname(fullDest);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        if (!fs.existsSync(fullSrc)) {
            console.warn(`⚠️  Skip: ${target.src} (File not found)`);
            continue;
        }

        try {
            const startSize = fs.statSync(fullSrc).size;
            console.log(`Optimizing: ${target.src} (${(startSize / 1024 / 1024).toFixed(2)} MB)`);

            await sharp(fullSrc)
                .webp(target.options || { quality: 75 })
                .toFile(fullDest);

            const endSize = fs.statSync(fullDest).size;
            const reduction = ((startSize - endSize) / startSize * 100).toFixed(1);

            console.log(`  ✅ Optimized: ${target.dest}`);
            console.log(`     Size: ${(endSize / 1024).toFixed(2)} KB (Reduction: ${reduction}%)`);
        } catch (err) {
            console.error(`  ❌ Failed: ${target.src}`, err.message);
        }
    }

    console.log('\n✨ Phase 2 Assets Ready!');
}

optimize();
