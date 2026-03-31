/* eslint-env node */

/**
 * Convert large mentor SVG illustrations into modern WebP assets.
 * Reduces payload size for BecomeMentor and mentorship experiences.
 *
 * Usage: node scripts/convert-mentor-assets.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

const targets = [
    {
        sourceDir: path.join(projectRoot, 'src/assets/images/BecomeMentor/mentors'),
        outputDir: path.join(projectRoot, 'src/assets/optimized/mentors'),
        width: 1400,
        quality: 82,
    },
    {
        files: [
            'src/assets/images/BecomeMentor/key_ben_mentors.svg',
            'src/assets/images/BecomeMentor/b_mentor_mobile.svg',
            'src/assets/images/ment_icon.svg',
            'src/assets/images/mobile_phone.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/becomeMentor'),
        width: 1800,
        quality: 85,
    },
    {
        files: [
            'src/assets/images/mentorship/raghulan_mentor/banner_raghulan.svg',
            'src/assets/images/mentorship/raghulan_mentor/banner_raghulan_mob.svg',
            'src/assets/images/mentorship/raghulan_mentor/raghulan_profile.svg',
            'src/assets/images/mentorship/raghulan_mentor/spec_img1.svg',
            'src/assets/images/mentorship/raghulan_mentor/spec_img2.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/mentorship'),
        width: 1800,
        quality: 85,
    },
    {
        files: [
            'src/assets/images/solidworks/solidworks_mentor.svg',
            'src/assets/images/solidworks/sw_mentor.svg',
            'src/assets/images/courses_card/elavarasan_ment_i.svg',
            'src/assets/images/courses_card/raghulan_ment_i.svg',
            'src/assets/images/courses_card/swaminathan_ment_i.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/courses'),
        width: 1600,
        quality: 85,
    },
    {
        sourceDir: path.join(projectRoot, 'src/assets/images/mentors'),
        outputDir: path.join(projectRoot, 'src/assets/optimized/mentorsRun'),
        width: 1600,
        quality: 82,
    },
    // Blockchain SVGs (embedded raster images)
    {
        files: [
            'src/assets/images/blockchain/bc_bw_1.svg',
            'src/assets/images/blockchain/bc_bw_2.svg',
            'src/assets/images/blockchain/bc_bw_3.svg',
            'src/assets/images/blockchain/bc_y_1.svg',
            'src/assets/images/blockchain/bc_y_2.svg',
            'src/assets/images/blockchain/bc_y_3.svg',
            'src/assets/images/blockchain/ment_img.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/blockchain'),
        width: 1600,
        quality: 85,
    },
    // Solidworks / 3DMax large SVGs
    {
        files: [
            'src/assets/images/solidworks/chall1.svg',
            'src/assets/images/solidworks/sw_bg.svg',
            'src/assets/images/solidworks/sld_path1.svg',
            'src/assets/images/solidworks/sld_path2.svg',
            'src/assets/images/solidworks/sld_path3.svg',
            'src/assets/images/3DMax/mentor/raghulan_ment.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/solidworks'),
        width: 1600,
        quality: 85,
    },
    // Civil3D large SVGs
    {
        files: [
            'src/assets/images/civil3D/civil3D_hero_bg.svg',
            'src/assets/images/civil3D/stud_coursefor.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/civil3D'),
        width: 1800,
        quality: 85,
    },
    // Affiliate / misc large SVGs
    {
        files: [
            'src/assets/images/affilate/hero_bg_mobile.svg',
            'src/assets/images/affilate/affilate_card_img.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/affilate'),
        width: 1600,
        quality: 85,
    },
    // Course card large SVGs (remaining)
    {
        files: [
            'src/assets/images/courses_card/solidworks.svg',
            'src/assets/images/courses_card/civil3D.svg',
            'src/assets/images/courses_card/amazon.svg',
            'src/assets/images/courses_card/threeDsmax.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/courses'),
        width: 1600,
        quality: 85,
    },
    // Misc large illustration SVGs in root images/
    {
        files: [
            'src/assets/images/ment.svg',
            'src/assets/images/sridhar_ment_i.svg',
            'src/assets/images/cre1.svg',
            'src/assets/images/cre2.svg',
            'src/assets/images/tes_s_bg.svg',
            'src/assets/images/test_bg_mob.svg',
            'src/assets/images/creators.svg',
            'src/assets/images/m_creators.svg',
            'src/assets/images/icon.svg',
            'src/assets/images/highdemand_2.svg',
            'src/assets/images/all_bundle.svg',
            'src/assets/images/bm_javid.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/misc'),
        width: 1800,
        quality: 85,
    },
    // Course SVGs used as icons
    {
        files: [
            'src/assets/images/solidworks/sld_stud_icon.svg',
            'src/assets/images/civil3D/civil3D_stud_i.svg',
            'src/assets/images/threeD_stud_i.svg',
            'src/assets/images/amz_stud_i.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/icons'),
        width: 200,
        quality: 85,
    },
    // Amazon mentor large SVGs
    {
        files: [
            'src/assets/images/amazon/mentor/amz_mentor.svg',
        ],
        outputDir: path.join(projectRoot, 'src/assets/optimized/amazon'),
        width: 1600,
        quality: 85,
    },
];

/**
 * Convert a single SVG file to WebP using sharp.
 */
async function convertFile(inputPath, outputPath, { width, quality }) {
    await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });

    const baseName = path.basename(outputPath);
    process.stdout.write(`→ ${baseName} `);

    try {
        const fileBuffer = await fs.promises.readFile(inputPath);
        const asText = fileBuffer.toString('utf8');

        const dataUriMatch = asText.match(/data:image\/(png|jpeg);base64,([^"]+)/i);

        if (dataUriMatch) {
            const base64Data = dataUriMatch[2].replace(/\s+/g, '');
            const imageBuffer = Buffer.from(base64Data, 'base64');

            await sharp(imageBuffer, { limitInputPixels: false })
                .resize({ width, withoutEnlargement: true })
                .webp({ quality, effort: 4 })
                .toFile(outputPath);
        } else {
            await sharp(fileBuffer, { density: 240, limitInputPixels: false })
                .resize({ width, withoutEnlargement: true })
                .webp({ quality, effort: 4 })
                .toFile(outputPath);
        }
        process.stdout.write('✓\n');
    } catch (error) {
        process.stdout.write('✗\n');
        console.error(`   Failed to convert ${inputPath}:`, error.message);
    }
}

async function run() {
    console.log('🎨 Converting mentor SVG assets to WebP…\n');

    for (const target of targets) {
        const filesToProcess = [];

        if (target.sourceDir) {
            try {
                const entries = await fs.promises.readdir(target.sourceDir, { withFileTypes: true });
                entries
                    .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
                    .forEach((entry) => filesToProcess.push(path.join(target.sourceDir, entry.name)));
            } catch {
                console.warn(`⚠️  Directory not found: ${target.sourceDir}`);
            }
        }

        if (target.files) {
            filesToProcess.push(...target.files.map((file) => path.join(projectRoot, file)));
        }

        for (const file of filesToProcess) {
            if (!fs.existsSync(file)) {
                console.warn(`⚠️  File not found: ${file}`);
                continue;
            }
            const baseName = path.basename(file, path.extname(file));
            const outputPath = path.join(target.outputDir, `${baseName}.webp`);
            await convertFile(file, outputPath, target);
        }
    }

    console.log('\n✅ Conversion complete.');
}

run().catch((error) => {
    console.error('❌ Fatal error during conversion:', error);
    process.exit(1);
});
