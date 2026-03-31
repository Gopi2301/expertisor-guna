/**
 * test-deal-names.js
 * -------------------
 * Zero-dependency test for the hardcoded route → Zoho Deal Name mapping.
 * Run with:  node scripts/test-deal-names.js
 *            npm run test:deals
 */

// ─── Shared mapping (must mirror the one in ApplyModal.jsx & PassiveIncome.jsx) ─
const DEAL_NAME_MAP = {
    "/techbundle": "All in One Tech Bundle",
    "/civil3d-tamil": "Civil 3D Fundamentals",
    "/3dsmax-tamil": "3ds Max Fundamentals",
    "/reels-affiliate-marketing-tamil": "Reels Affiliate Marketing",
    "/solidworks-tamil": "SolidWorks",
    "/blockchain-course-for-working-professionals":
        "Blockchain Fundamentals (professionals)",
    "/blockchain-course-for-students": "Blockchain Fundamentals (students)",
    "/blockchain-course-for-business": "Blockchain Fundamentals (business)",
    "/amazon-seller-tamil-course": "Amazon Business Launch Program",
    "/civil3d-english": "civil3d-english",
    "/3dsmax-english": "3ds Max fundamentals-english",
};

const getDealName = (path) => DEAL_NAME_MAP[path] || "General Inquiry";

// ─── Test cases ───────────────────────────────────────────────────────────────
const tests = [
    // Known routes
    { path: "/civil3d-tamil", expected: "Civil 3D Fundamentals" },
    { path: "/3dsmax-tamil", expected: "3ds Max Fundamentals" },
    { path: "/reels-affiliate-marketing-tamil", expected: "Reels Affiliate Marketing" },
    { path: "/solidworks-tamil", expected: "SolidWorks" },
    { path: "/blockchain-course-for-working-professionals", expected: "Blockchain Fundamentals (professionals)" },
    { path: "/blockchain-course-for-students", expected: "Blockchain Fundamentals (students)" },
    { path: "/blockchain-course-for-business", expected: "Blockchain Fundamentals (business)" },
    { path: "/amazon-seller-tamil-course", expected: "Amazon Business Launch Program" },
    { path: "/civil3d-english", expected: "civil3d-english" },
    { path: "/3dsmax-english", expected: "3ds Max fundamentals-english" },
    { path: "/techbundle", expected: "All in One Tech Bundle" },

    // Fallback / edge cases
    { path: "/unknown-course", expected: "General Inquiry" },
    { path: "/", expected: "General Inquiry" },
    { path: "", expected: "General Inquiry" },
    { path: "/CIVIL3D-TAMIL", expected: "General Inquiry" }, // case-sensitive: should NOT match
];

// ─── Runner ───────────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

console.log("\n🧪  Zoho Deal Name Map — Test Results\n" + "─".repeat(55));

for (const { path, expected } of tests) {
    const actual = getDealName(path);
    const ok = actual === expected;

    if (ok) {
        console.log(`  ✅  "${path}"`);
        console.log(`       → "${actual}"`);
        passed++;
    } else {
        console.log(`  ❌  "${path}"`);
        console.log(`       expected : "${expected}"`);
        console.log(`       received : "${actual}"`);
        failed++;
    }
}

console.log("─".repeat(55));
console.log(`\n📊  Results: ${passed} passed, ${failed} failed out of ${tests.length} tests\n`);

if (failed > 0) {
    process.exit(1); // non-zero exit so CI can catch failures
}
