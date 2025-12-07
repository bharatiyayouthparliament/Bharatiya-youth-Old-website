#!/usr/bin/env node

import fs from "fs";
import path from "path";
import url from "url";

// Fix __dirname for ES Modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLEAN_CONTENT_REGEX = {
  comments: /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
  templateLiterals: /`[\s\S]*?`/g,
  strings: /'[^']*'|"[^"]*"/g,
  jsxExpressions: /\{.*?\}/g,
  htmlEntities: {
    quot: /&quot;/g,
    amp: /&amp;/g,
    lt: /&lt;/g,
    gt: /&gt;/g,
    apos: /&apos;/g,
  },
};

const EXTRACTION_REGEX = {
  route: /<Route\s+[^>]*>/g,
  path: /path=["']([^"']+)["']/,
  element: /element=\{?<(\w+)/,
  helmet: /<Helmet[^>]*?>([\s\S]*?)<\/Helmet>/i,
  helmetTest: /<Helmet[\s\S]*?<\/Helmet>/i,
  title: /<title[^>]*?>\s*(.*?)\s*<\/title>/i,
  description:
    /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i,
};

// Remove comments + strings
function cleanContent(content) {
  return content
    .replace(CLEAN_CONTENT_REGEX.comments, "")
    .replace(CLEAN_CONTENT_REGEX.templateLiterals, "")
    .replace(CLEAN_CONTENT_REGEX.strings, "");
}

// Clean meta text
function cleanText(text) {
  if (!text) return "";
  return text
    .replace(CLEAN_CONTENT_REGEX.jsxExpressions, "")
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.quot, '"')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.amp, "&")
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.lt, "<")
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.gt, ">")
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.apos, "'")
    .trim();
}

// Extract route mapping
function extractRoutes(appJsxPath) {
  if (!fs.existsSync(appJsxPath)) return new Map();

  try {
    const content = fs.readFileSync(appJsxPath, "utf8");
    const routes = new Map();
    const matches = [...content.matchAll(EXTRACTION_REGEX.route)];

    for (const match of matches) {
      const tag = match[0];
      const pathMatch = tag.match(EXTRACTION_REGEX.path);
      const elementMatch = tag.match(EXTRACTION_REGEX.element);

      if (elementMatch) {
        const comp = elementMatch[1];
        const urlPath = pathMatch
          ? pathMatch[1].startsWith("/")
            ? pathMatch[1]
            : "/" + pathMatch[1]
          : "/";

        routes.set(comp, urlPath);
      }
    }

    return routes;
  } catch (error) {
    console.error("Error parsing App.jsx:", error);
    return new Map();
  }
}

// Get list of all JSX files
function findReactFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".jsx"))
    .map((f) => path.join(dir, f));
}

// Extract Helmet SEO data
function extractHelmetData(content, filePath, routes) {
  const cleaned = cleanContent(content);

  if (!EXTRACTION_REGEX.helmetTest.test(cleaned)) return null;

  const match = content.match(EXTRACTION_REGEX.helmet);
  if (!match) return null;

  const section = match[1];
  const title = cleanText(section.match(EXTRACTION_REGEX.title)?.[1]);
  const desc = cleanText(section.match(EXTRACTION_REGEX.description)?.[1]);

  const name = path.basename(filePath, ".jsx");
  const url = routes.get(name) || "/" + name.replace(/Page$/, "").toLowerCase();

  return {
    url,
    title: title || "Untitled Page",
    description: desc || "No description available",
  };
}

// Generate llms.txt
function generateLlmsTxt(pages) {
  return (
    "## Pages\n" +
    pages
      .map((p) => `- [${p.title}](${p.url}): ${p.description}`)
      .join("\n")
  );
}

// Ensure output folder exists
function ensureDirectoryExists(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function main() {
  const pagesDir = path.join(process.cwd(), "src", "pages");
  const appJsx = path.join(process.cwd(), "src", "App.jsx");

  const routes = extractRoutes(appJsx);
  let pages = [];

  if (fs.existsSync(pagesDir)) {
    const files = findReactFiles(pagesDir);
    pages = files
      .map((file) => {
        const content = fs.readFileSync(file, "utf8");
        return extractHelmetData(content, file, routes);
      })
      .filter(Boolean);
  }

  if (pages.length === 0) {
    console.warn("⚠ No Helmet pages found.");
  }

  const output = generateLlmsTxt(pages);
  const outPath = path.join(process.cwd(), "public", "llms.txt");

  ensureDirectoryExists(path.dirname(outPath));
  fs.writeFileSync(outPath, output, "utf8");

  console.log("✅ llms.txt generated successfully.");
}

// Run script
main();
