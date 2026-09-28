import { SEED_SHOWCASES } from "./seed-showcases.mjs";

console.log("🔍 Checking all 5 seeded showcases against Modules 0 to 7 criteria...\n");

const tests = [
  // Modul 0
  { mod: 0, id: "m0-doctype", check: (html) => /<!DOCTYPE\s+html>/i.test(html) },
  { mod: 0, id: "m0-html-tag", check: (html) => /<html\s+[^>]*lang=/i.test(html) },
  { mod: 0, id: "m0-head-tag", check: (html) => /<head[\s>]/i.test(html) && /<\/head>/i.test(html) },
  { mod: 0, id: "m0-title-tag", check: (html) => /<title>[\s\S]+?<\/title>/i.test(html) },
  { mod: 0, id: "m0-body-tag", check: (html) => /<body[\s>]/i.test(html) && /<\/body>/i.test(html) },

  // Modul 1
  { mod: 1, id: "m1-h1", check: (html) => /<h1[\s>][\s\S]+?<\/h1>/i.test(html) },
  { mod: 1, id: "m1-p", check: (html) => /<p[\s>][\s\S]+?<\/p>/i.test(html) },
  { mod: 1, id: "m1-format", check: (html) => /<(strong|em|b|i)[\s>]/i.test(html) },
  { mod: 1, id: "m1-hr", check: (html) => /<hr[\s>/]/i.test(html) },
  { mod: 1, id: "m1-img", check: (html) => /<img\s+[^>]*src=[^>]*alt=/i.test(html) || /<img\s+[^>]*alt=[^>]*src=/i.test(html) },

  // Modul 2
  { mod: 2, id: "m2-h2", check: (html) => /<h2[\s>]/i.test(html) },
  { mod: 2, id: "m2-list", check: (html) => /<ul[\s>]/i.test(html) || /<ol[\s>]/i.test(html) },
  { mod: 2, id: "m2-items", check: (html) => (html.match(/<li[\s>]/gi) || []).length >= 3 },
  { mod: 2, id: "m2-anchor", check: (html) => /<a\s+[^>]*href=/i.test(html) },

  // Modul 3
  { mod: 3, id: "m3-structure", check: (html) => /<table[\s>][\s\S]*<thead[\s>][\s\S]*<tbody[\s>]/i.test(html) },
  { mod: 3, id: "m3-headers", check: (html) => (html.match(/<th[\s>]/gi) || []).length >= 3 },
  { mod: 3, id: "m3-rows", check: (html) => (html.match(/<tbody[\s\S]*?<\/tbody>/i)?.[0]?.match(/<tr[\s>]/gi) || []).length >= 3 },
  { mod: 3, id: "m3-mark", check: (html) => /<table[\s\S]*?<mark[\s>]/i.test(html) },

  // Modul 4
  { mod: 4, id: "m4-form", check: (html) => /<form[\s>]/i.test(html) },
  { mod: 4, id: "m4-text", check: (html) => /<input\s+[^>]*type=["']text["'][^>]*required/i.test(html) || /<input\s+[^>]*required[^>]*type=["']text["']/i.test(html) },
  { mod: 4, id: "m4-date", check: (html) => /<input\s+[^>]*type=["']date["']/i.test(html) },
  { mod: 4, id: "m4-radio", check: (html) => (html.match(/<input\s+[^>]*type=["']radio["']/gi) || []).length >= 2 },
  { mod: 4, id: "m4-select", check: (html) => (html.match(/<select[\s\S]*?<\/select>/i)?.[0]?.match(/<option[\s>]/gi) || []).length >= 2 },
  { mod: 4, id: "m4-textarea", check: (html) => /<textarea[\s>]/i.test(html) },
  { mod: 4, id: "m4-submit", check: (html) => /<button\s+[^>]*type=["']submit["']/i.test(html) || /<button[\s>]/i.test(html) },

  // Modul 5
  { mod: 5, id: "m5-boxsizing", check: (_, css) => /box-sizing\s*:\s*border-box/i.test(css) },
  { mod: 5, id: "m5-colors", check: (_, css) => /color\s*:/i.test(css) && /background(-color)?\s*:/i.test(css) },
  { mod: 5, id: "m5-centering", check: (_, css) => /margin\s*:\s*0\s+auto/i.test(css) || /margin-left\s*:\s*auto/i.test(css) || /display\s*:\s*flex/i.test(css) },
  { mod: 5, id: "m5-gradient", check: (_, css) => /linear-gradient/i.test(css) },
  { mod: 5, id: "m5-collapse", check: (_, css) => /border-collapse\s*:\s*collapse/i.test(css) },

  // Modul 6
  { mod: 6, id: "m6-flex", check: (_, css) => /display\s*:\s*flex/i.test(css) },
  { mod: 6, id: "m6-align", check: (_, css) => /justify-content\s*:/i.test(css) || /align-items\s*:/i.test(css) },
  { mod: 6, id: "m6-hover", check: (_, css) => /:hover/i.test(css) },
  { mod: 6, id: "m6-focus", check: (_, css) => /:focus/i.test(css) },
  { mod: 6, id: "m6-onsubmit", check: (html) => /onsubmit\s*=/i.test(html) || /alert\(/i.test(html) },

  // Modul 7
  { mod: 7, id: "m7-allpassed", check: (html, css) => /<h1[\s>]/i.test(html) && /<table[\s>]/i.test(html) && /<form[\s>]/i.test(html) && /display\s*:\s*flex/i.test(css) },
];

let allGood = true;

for (const s of SEED_SHOWCASES) {
  const name = s.showcase.cafeName;
  const html = s.showcase.htmlCode;
  const css = s.showcase.cssCode;

  console.log(`☕ Testing Cafe: "${name}" (${s.participant.name})`);
  let passedCount = 0;
  for (const t of tests) {
    const ok = t.check(html, css);
    if (!ok) {
      console.error(`  ❌ Failed Modul ${t.mod} [${t.id}]`);
      allGood = false;
    } else {
      passedCount++;
    }
  }
  console.log(`  ✅ Passed ${passedCount} / ${tests.length} tests`);
}

if (allGood) {
  console.log("\n🎉 ALL 5 SEEDED SHOWCASES PERFECTLY PASS ALL MODULE 0 TO 7 ASSERTIONS!");
} else {
  console.error("\n❌ Some tests failed!");
  process.exit(1);
}
