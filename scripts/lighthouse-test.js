/* eslint-env node */

/**
 * Lighthouse performance testing script
 * Tests multiple pages for performance, accessibility, best practices, and SEO
 * 
 * Usage: node scripts/lighthouse-test.js [base-url]
 * Default base URL: http://localhost:5173
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';
import process from 'node:process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pages to test (static routes only - skipping dynamic routes)
const pages = [
    '/',
    '/courses',
    '/testimonials',
    '/mentors',
    '/techbundle',
    '/auth/success',
    '/reels-affiliate-marketing-tamil',
    '/3dsmax-tamil',
    '/termsandservices',
    '/privacypolicy',
    '/RefundAndCertificationPolicy',
    '/creator-mentor',
    '/solidworks-tamil',
    '/civil3d-tamil',
    '/proclass/ssr',
];

// Get base URL from command line or use default
const baseUrl = process.argv[2] || 'http://localhost:5173';
const outputDir = path.join(__dirname, '../lighthouse-reports');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Lighthouse configuration
const lighthouseConfig = {
    extends: 'lighthouse:default',
    settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        skipAudits: [], // Run all audits
    },
};

// Desktop configuration
const desktopConfig = {
    ...lighthouseConfig,
    settings: {
        ...lighthouseConfig.settings,
        emulatedFormFactor: 'desktop',
        throttling: {
            rttMs: 40,
            throughputKbps: 10 * 1024,
            cpuSlowdownMultiplier: 1,
        },
        screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
        },
    },
};

// Mobile configuration
const mobileConfig = {
    ...lighthouseConfig,
    settings: {
        ...lighthouseConfig.settings,
        emulatedFormFactor: 'mobile',
        throttling: {
            rttMs: 150,
            throughputKbps: 1.6 * 1024,
            cpuSlowdownMultiplier: 4,
        },
        screenEmulation: {
            mobile: true,
            width: 412,
            height: 732,
            deviceScaleFactor: 2.625,
        },
    },
};

/**
 * Run Lighthouse test on a single URL
 */
async function runLighthouse(url, device, config) {
    console.log(`\n🚀 Testing ${url} on ${device}...`);

    let chrome;
    try {
        // Launch Chrome
        chrome = await chromeLauncher.launch({
            chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
        });

        // Run Lighthouse
        const result = await lighthouse(url, {
            port: chrome.port,
            ...config,
        });

        // Handle null scores (when audit fails)
        const getScore = (category) => {
            const score = result.lhr.categories[category]?.score;
            return score !== null && score !== undefined ? Math.round(score * 100) : 0;
        };

        const scores = {
            performance: getScore('performance'),
            accessibility: getScore('accessibility'),
            'best-practices': getScore('best-practices'),
            seo: getScore('seo'),
        };

        // Core Web Vitals
        const getMetric = (auditId) => {
            const audit = result.lhr.audits[auditId];
            return audit?.numericValue !== null && audit?.numericValue !== undefined
                ? audit.numericValue
                : 0;
        };

        const metrics = {
            fcp: getMetric('first-contentful-paint'),
            lcp: getMetric('largest-contentful-paint'),
            tbt: getMetric('total-blocking-time'),
            cls: getMetric('cumulative-layout-shift'),
            speedIndex: getMetric('speed-index'),
        };

        // Check for runtime errors
        if (result.lhr.runtimeError) {
            console.warn(`   ⚠️  Warning: ${result.lhr.runtimeError.message}`);
        }

        // Save report
        const pageName = url.replace(baseUrl, '').replace(/\//g, '_') || 'homepage';
        const fileName = `${pageName}_${device}_${Date.now()}.html`;
        const filePath = path.join(outputDir, fileName);
        fs.writeFileSync(filePath, result.report);

        console.log(`✅ ${device} Results for ${url}:`);
        console.log(`   Performance: ${scores.performance}/100`);
        console.log(`   Accessibility: ${scores.accessibility}/100`);
        console.log(`   Best Practices: ${scores['best-practices']}/100`);
        console.log(`   SEO: ${scores.seo}/100`);
        console.log(`   FCP: ${metrics.fcp.toFixed(0)}ms`);
        console.log(`   LCP: ${metrics.lcp.toFixed(0)}ms`);
        console.log(`   TBT: ${metrics.tbt.toFixed(0)}ms`);
        console.log(`   CLS: ${metrics.cls.toFixed(3)}`);
        console.log(`   Speed Index: ${metrics.speedIndex.toFixed(0)}`);
        console.log(`   Report saved: ${filePath}`);

        return {
            url,
            device,
            scores,
            metrics,
            filePath,
            passed: scores.performance === 100,
        };
    } catch (error) {
        console.error(`❌ Error testing ${url} on ${device}:`, error.message);
        return {
            url,
            device,
            error: error.message,
            passed: false,
        };
    } finally {
        if (chrome) {
            await chrome.kill();
        }
    }
}

/**
 * Wait for server to be ready
 */
async function waitForServer(url, maxAttempts = 30) {
    console.log(`⏳ Waiting for server at ${url}...`);

    for (let i = 0; i < maxAttempts; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                console.log(`✅ Server is ready!\n`);
                return true;
            }
        } catch {
            // Server not ready yet
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    throw new Error(`Server not available at ${url} after ${maxAttempts} attempts`);
}

/**
 * Main test runner
 */
async function main() {
    console.log('📊 Lighthouse Performance Testing');
    console.log('==================================');
    console.log(`Base URL: ${baseUrl}`);
    console.log(`Pages to test: ${pages.length}`);
    console.log(`Output directory: ${outputDir}\n`);

    // Wait for server to be ready
    try {
        await waitForServer(baseUrl);
    } catch (error) {
        console.error(`❌ ${error.message}`);
        console.error('\n💡 Make sure the dev server is running: npm run dev');
        process.exit(1);
    }

    const results = [];
    const summary = {
        desktop: { passed: 0, failed: 0, total: 0 },
        mobile: { passed: 0, failed: 0, total: 0 },
    };

    // Test all pages
    for (const page of pages) {
        const url = `${baseUrl}${page}`;

        // Test desktop
        const desktopResult = await runLighthouse(url, 'desktop', desktopConfig);
        results.push(desktopResult);
        if (desktopResult.passed) {
            summary.desktop.passed++;
        } else {
            summary.desktop.failed++;
        }
        summary.desktop.total++;

        // Wait a bit between tests
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Test mobile
        const mobileResult = await runLighthouse(url, 'mobile', mobileConfig);
        results.push(mobileResult);
        if (mobileResult.passed) {
            summary.mobile.passed++;
        } else {
            summary.mobile.failed++;
        }
        summary.mobile.total++;

        // Wait a bit between pages
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Print summary
    console.log('\n\n📊 Test Summary');
    console.log('================');
    console.log(`\nDesktop:`);
    console.log(`  ✅ Passed (100/100): ${summary.desktop.passed}/${summary.desktop.total}`);
    console.log(`  ❌ Failed: ${summary.desktop.failed}/${summary.desktop.total}`);
    console.log(`\nMobile:`);
    console.log(`  ✅ Passed (100/100): ${summary.mobile.passed}/${summary.mobile.total}`);
    console.log(`  ❌ Failed: ${summary.mobile.failed}/${summary.mobile.total}`);

    // Print failed pages
    const failedPages = results.filter(r => !r.passed && !r.error);
    if (failedPages.length > 0) {
        console.log(`\n⚠️  Pages with scores < 100:`);
        failedPages.forEach(result => {
            console.log(`  ${result.url} (${result.device}): Performance ${result.scores?.performance}/100`);
        });
    }

    // Save summary JSON
    const summaryPath = path.join(outputDir, `summary_${Date.now()}.json`);
    fs.writeFileSync(summaryPath, JSON.stringify({ summary, results }, null, 2));
    console.log(`\n📄 Summary saved: ${summaryPath}`);

    // Exit with error code if any tests failed
    if (summary.desktop.failed > 0 || summary.mobile.failed > 0) {
        process.exit(1);
    }
}

// Run the tests
main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
