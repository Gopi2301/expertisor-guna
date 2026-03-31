import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Configuration
const config = {
  sourceDir: path.join(rootDir, 'src/assets'),
  outputDir: path.join(rootDir, 'src/assets/optimized'),
  quality: {
    jpeg: 80,
    png: 80,
    webp: 85,
  },
  // Large images to prioritize
  priorityImages: [
    'tamil.png',
    'creators.png',
    'creators_Desk.png',
    'cert.png',
    'intern.png',
    'sathish.png',
  ],
};

const normalizedOutputDir = path.normalize(config.outputDir);

async function optimizeImage(filePath, outputDir) {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const nameWithoutExt = path.basename(fileName, ext);

  const originalOutputPath = path.join(outputDir, fileName);
  const webpOutputPath = path.join(outputDir, `${nameWithoutExt}.webp`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    if (ext === '.jpg' || ext === '.jpeg') {
      await image.jpeg({
        quality: config.quality.jpeg,
        chromaSubsampling: '4:4:4',
        mozjpeg: true,
      }).toFile(originalOutputPath);
    } else if (ext === '.png') {
      await image.png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true,
        quality: config.quality.png,
      }).toFile(originalOutputPath);
    }

    await sharp(filePath)
      .webp({ quality: config.quality.webp })
      .toFile(webpOutputPath);

    return {
      original: fs.existsSync(originalOutputPath) ? originalOutputPath : null,
      webp: fs.existsSync(webpOutputPath) ? webpOutputPath : null,
      metadata,
    };
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
    return null;
  }
}

async function getLargeImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      const normalizedPath = path.normalize(filePath);
      if (normalizedPath.startsWith(normalizedOutputDir)) {
        continue;
      }
      await getLargeImages(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext) && stat.size > 200 * 1024) {
        fileList.push({
          path: filePath,
          size: stat.size,
          name: file,
        });
      }
    }
  }
  
  return fileList;
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  // Create output directory
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }
  
  // Find large images
  console.log('📸 Finding large images (>200KB)...');
  const largeImages = await getLargeImages(config.sourceDir);
  largeImages.sort((a, b) => b.size - a.size);
  
  console.log(`Found ${largeImages.length} large images:\n`);
  largeImages.slice(0, 20).forEach(img => {
    console.log(`  - ${img.name}: ${(img.size / 1024 / 1024).toFixed(2)} MB`);
  });
  console.log('');
  
  // Optimize images
  const optimized = [];
  const failed = [];
  
  for (const img of largeImages) {
    const relativePath = path.relative(config.sourceDir, img.path);
    const outputSubDir = path.join(config.outputDir, path.dirname(relativePath));
    
    if (!fs.existsSync(outputSubDir)) {
      fs.mkdirSync(outputSubDir, { recursive: true });
    }
    
    console.log(`Optimizing: ${img.name}...`);
    
    // Create compressed original
    const result = await optimizeImage(img.path, outputSubDir);

    if (result) {
      optimized.push({
        original: img.path,
        compressed: result.original,
        webp: result.webp,
        originalSize: img.size,
        metadata: result.metadata,
      });
      console.log(`  ✅ Optimized: ${img.name}`);
      
      if (result.original) {
        const newSize = fs.statSync(result.original).size;
        const reduction = ((1 - newSize / img.size) * 100).toFixed(1);
        console.log(`     Size reduction: ${reduction}%`);
      }
    } else {
      failed.push(img.name);
      console.log(`  ❌ Failed: ${img.name}`);
    }
    console.log('');
  }
  
  // Summary
  console.log('\n📊 Optimization Summary:');
  console.log(`  ✅ Optimized: ${optimized.length} images`);
  console.log(`  ❌ Failed: ${failed.length} images`);
  
  if (optimized.length > 0) {
    const totalOriginalSize = optimized.reduce((sum, img) => sum + img.originalSize, 0);
    const totalCompressedSize = optimized.reduce((sum, img) => {
      if (img.compressed) {
        return sum + fs.statSync(img.compressed).size;
      }
      return sum;
    }, 0);
    const totalReduction = ((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1);
    
    console.log(`  📦 Total size reduction: ${totalReduction}%`);
    console.log(`  📁 Optimized images saved to: ${config.outputDir}`);
  }
  
  console.log('\n✨ Done!');
}

main().catch(console.error);
