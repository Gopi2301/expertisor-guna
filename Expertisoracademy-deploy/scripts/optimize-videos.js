/* eslint-env node */

/**
 * Video optimization script
 * Compresses and generates multiple quality variants of video files
 * 
 * Note: This script requires ffmpeg to be installed on the system
 * Install: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)
 * 
 * Usage: node scripts/optimize-videos.js
 */

import fs from 'fs';
import path from 'path';
import process from 'node:process';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const VIDEO_QUALITIES = {
    hd: {
        resolution: '1920x1080',
        bitrate: '5M',
        maxrate: '6M',
        bufsize: '10M',
    },
    sd: {
        resolution: '1280x720',
        bitrate: '2M',
        maxrate: '2.5M',
        bufsize: '4M',
    },
    mobile: {
        resolution: '854x480',
        bitrate: '1M',
        maxrate: '1.2M',
        bufsize: '2M',
    },
};

// Video files to optimize
const VIDEOS_TO_OPTIMIZE = [
    {
        input: 'public/videoBg.mp4',
        outputDir: 'public/videos/optimized',
    },
    {
        input: 'public/Video_Solidworks.mp4',
        outputDir: 'public/videos/optimized',
    },
];

/**
 * Check if ffmpeg is available
 */
function checkFFmpeg() {
    try {
        execSync('ffmpeg -version', { stdio: 'ignore' });
        return true;
    } catch {
        console.error('❌ FFmpeg is not installed. Please install it first:');
        console.error('   macOS: brew install ffmpeg');
        console.error('   Linux: apt-get install ffmpeg');
        console.error('   Windows: Download from https://ffmpeg.org/download.html');
        return false;
    }
}

/**
 * Optimize a single video file
 */
function optimizeVideo(inputPath, outputDir, quality, config) {
    const inputName = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(outputDir, `${inputName}-${quality}.mp4`);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`\n📹 Optimizing ${inputName} to ${quality} quality...`);

    try {
        const command = `ffmpeg -i "${inputPath}" \
      -vf "scale=${config.resolution}:force_original_aspect_ratio=decrease,pad=${config.resolution}:(ow-iw)/2:(oh-ih)/2" \
      -c:v libx264 \
      -preset slow \
      -crf 23 \
      -b:v ${config.bitrate} \
      -maxrate ${config.maxrate} \
      -bufsize ${config.bufsize} \
      -c:a aac \
      -b:a 128k \
      -movflags +faststart \
      -y \
      "${outputPath}"`;

        execSync(command, { stdio: 'inherit' });

        // Get file size
        const stats = fs.statSync(outputPath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log(`✅ Created ${outputPath} (${fileSizeMB} MB)`);
        return { success: true, path: outputPath, size: fileSizeMB };
    } catch (error) {
        console.error(`❌ Failed to optimize ${inputName} to ${quality}:`, error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Generate poster image from video
 */
function generatePoster(inputPath, outputDir) {
    const inputName = path.basename(inputPath, path.extname(inputPath));
    const posterPath = path.join(outputDir, `${inputName}-poster.jpg`);

    console.log(`\n🖼️  Generating poster for ${inputName}...`);

    try {
        const command = `ffmpeg -i "${inputPath}" \
      -ss 00:00:01 \
      -vframes 1 \
      -vf "scale=1920:-1" \
      -q:v 2 \
      -y \
      "${posterPath}"`;

        execSync(command, { stdio: 'inherit' });
        console.log(`✅ Created poster: ${posterPath}`);
        return { success: true, path: posterPath };
    } catch (error) {
        console.error(`❌ Failed to generate poster:`, error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Main optimization function
 */
export function optimizeVideos() {
    console.log('🎬 Starting video optimization...\n');

    // Check if ffmpeg is available
    if (!checkFFmpeg()) {
        process.exit(1);
    }

    const results = [];

    // Process each video
    for (const video of VIDEOS_TO_OPTIMIZE) {
        const inputPath = path.resolve(video.input);

        // Check if input file exists
        if (!fs.existsSync(inputPath)) {
            console.warn(`⚠️  Video not found: ${inputPath}`);
            continue;
        }

        console.log(`\n📁 Processing: ${video.input}`);

        // Optimize to different qualities
        for (const [quality, config] of Object.entries(VIDEO_QUALITIES)) {
            const result = optimizeVideo(inputPath, video.outputDir, quality, config);
            results.push({ video: video.input, quality, ...result });
        }

        // Generate poster
        const posterResult = generatePoster(inputPath, video.outputDir);
        results.push({ video: video.input, type: 'poster', ...posterResult });
    }

    // Summary
    console.log('\n\n📊 Optimization Summary:');
    console.log('='.repeat(50));

    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}`);

    if (successful.length > 0) {
        console.log('\n📦 Generated files:');
        successful.forEach((result) => {
            if (result.path) {
                console.log(`   - ${result.path}${result.size ? ` (${result.size} MB)` : ''}`);
            }
        });
    }

    if (failed.length > 0) {
        console.log('\n⚠️  Failed operations:');
        failed.forEach((result) => {
            console.log(`   - ${result.video} (${result.quality || result.type}): ${result.error}`);
        });
    }

    console.log('\n💡 Usage in components:');
    console.log('   <OptimizedVideo');
    console.log('     src="/videos/optimized/videoBg-hd.mp4"');
    console.log('     qualityVariants={{');
    console.log('       hd: "/videos/optimized/videoBg-hd.mp4",');
    console.log('       sd: "/videos/optimized/videoBg-sd.mp4",');
    console.log('       mobile: "/videos/optimized/videoBg-mobile.mp4"');
    console.log('     }}');
    console.log('     poster="/videos/optimized/videoBg-poster.jpg"');
    console.log('   />');
}

// Run optimization when executed directly
const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isDirectExecution) {
    optimizeVideos();
}

export { VIDEO_QUALITIES };
