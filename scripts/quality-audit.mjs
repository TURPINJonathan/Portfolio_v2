#!/usr/bin/env node

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const workspaceRoot = process.cwd();
const appDir = path.join(workspaceRoot, 'app');

/**
 * Very small heuristic audit (no AST) to catch common regressions.
 * - <a target="_blank"> should have rel="noreferrer noopener"
 * - next/image <Image ... fill> should have sizes="..."
 * - pages should have a single h1, and should not skip heading levels (h2 -> h4)
 * - next/image <Image> should always have alt; decorative images should use alt="" AND aria-hidden={true}
 */

async function listFilesRecursively(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursively(fullPath)));
      continue;
    }

    if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) files.push(fullPath);
  }

  return files;
}

function toRel(filePath) {
  return path.relative(workspaceRoot, filePath).split(path.sep).join('/');
}

function findBlankTargetAnchors(content) {
  // Very naive: only catches anchors where target is in the opening tag.
  const results = [];
  const regex = /<a\b[^>]*\btarget\s*=\s*(["'])_blank\1[^>]*>/gi;

  let match;
  while ((match = regex.exec(content))) {
    const tag = match[0];
    const hasRel = /\brel\s*=\s*(["'])[^"']*\1/i.test(tag);
    const relValue = (tag.match(/\brel\s*=\s*(["'])([^"']*)\1/i) ?? [])[2] ?? '';

    const hasNoopener = /\bnoopener\b/i.test(relValue);
    const hasNoreferrer = /\bnoreferrer\b/i.test(relValue);

    if (!hasRel || !hasNoopener || !hasNoreferrer) {
      results.push({ tag, index: match.index });
    }
  }

  return results;
}

function findFillImagesWithoutSizes(content) {
  // Heuristic: checks for <Image ... fill ...> without sizes in the same tag.
  const results = [];
  const regex = /<Image\b[^>]*\bfill\b[^>]*>/gi;

  let match;
  while ((match = regex.exec(content))) {
    const tag = match[0];
    const hasSizes = /\bsizes\s*=\s*/i.test(tag);
    if (!hasSizes) results.push({ tag, index: match.index });
  }

  return results;
}

function isPageFile(filePath) {
  return /\/page\.tsx$/i.test(toRel(filePath));
}

function findHeadingIssues(content) {
  const results = [];
  const regex = /<h([1-6])\b[^>]*>/gi;

  const headings = [];
  let match;
  while ((match = regex.exec(content))) {
    const level = Number(match[1]);
    headings.push({ level, index: match.index, tag: match[0] });
  }

  if (headings.length === 0) return results;

  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) {
    results.push({
      type: 'page-missing-h1',
      index: headings[0].index,
      detail: 'No <h1> found in page.',
    });
  } else if (h1s.length > 1) {
    for (const h of h1s.slice(1)) {
      results.push({
        type: 'page-multiple-h1',
        index: h.index,
        detail: h.tag,
      });
    }
  }

  for (let i = 0; i < headings.length - 1; i += 1) {
    const current = headings[i];
    const next = headings[i + 1];
    if (next.level - current.level > 1) {
      results.push({
        type: 'heading-level-skip',
        index: next.index,
        detail: `Skip from h${current.level} to h${next.level}`,
      });
    }
  }

  return results;
}

function findNextImageAltIssues(content) {
  const results = [];
  const regex = /<Image\b[\s\S]*?\/>/gi;

  let match;
  while ((match = regex.exec(content))) {
    const tag = match[0];

    const hasAlt = /\balt\s*=\s*/i.test(tag);
    if (!hasAlt) {
      results.push({
        type: 'next-image-missing-alt',
        index: match.index,
        detail: tag,
      });
      continue;
    }

    const ariaHiddenTrue = /\baria-hidden\s*=\s*(\{\s*true\s*\}|["']true["'])/i.test(tag);

    const altQuoted = tag.match(/\balt\s*=\s*(["'])([\s\S]*?)\1/i);
    const altIsEmptyString = altQuoted ? altQuoted[2] === '' : false;

    const altBrace = altQuoted ? null : tag.match(/\balt\s*=\s*\{([\s\S]*?)\}/i);
    const altIsExplicitEmptyExpression = altBrace ? /^\s*(['"])\s*\1\s*$/.test(altBrace[1] ?? '') : false;

    const altIsEmpty = altIsEmptyString || altIsExplicitEmptyExpression;

    if (altIsEmpty && !ariaHiddenTrue) {
      results.push({
        type: 'next-image-decorative-alt-without-aria-hidden',
        index: match.index,
        detail: tag,
      });
      continue;
    }

    if (!altIsEmpty && ariaHiddenTrue) {
      results.push({
        type: 'next-image-aria-hidden-with-nonempty-alt',
        index: match.index,
        detail: tag,
      });
    }
  }

  return results;
}

function computeLineAndCol(content, index) {
  const prefix = content.slice(0, index);
  const lines = prefix.split(/\r?\n/);
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;
  return { line, col };
}

async function main() {
  const exists = await stat(appDir)
    .then(() => true)
    .catch(() => false);
  if (!exists) {
    console.error('Cannot find ./app directory. Run from repository root.');
    process.exit(2);
  }

  const files = await listFilesRecursively(appDir);

  const issues = [];

  for (const file of files) {
    const content = await readFile(file, 'utf8');

    const blankTargets = findBlankTargetAnchors(content);
    for (const hit of blankTargets) {
      const { line, col } = computeLineAndCol(content, hit.index);
      issues.push({
        type: 'a-target-blank-missing-rel',
        file,
        line,
        col,
        detail: hit.tag,
      });
    }

    const fillWithoutSizes = findFillImagesWithoutSizes(content);
    for (const hit of fillWithoutSizes) {
      const { line, col } = computeLineAndCol(content, hit.index);
      issues.push({
        type: 'next-image-fill-missing-sizes',
        file,
        line,
        col,
        detail: hit.tag,
      });
    }

    if (isPageFile(file)) {
      const headingIssues = findHeadingIssues(content);
      for (const hit of headingIssues) {
        const { line, col } = computeLineAndCol(content, hit.index);
        issues.push({
          type: hit.type,
          file,
          line,
          col,
          detail: hit.detail,
        });
      }
    }

    const imageAltIssues = findNextImageAltIssues(content);
    for (const hit of imageAltIssues) {
      const { line, col } = computeLineAndCol(content, hit.index);
      issues.push({
        type: hit.type,
        file,
        line,
        col,
        detail: hit.detail,
      });
    }
  }

  if (issues.length === 0) {
    console.log('✅ quality-audit: no issues found');
    return;
  }

  console.log(`❌ quality-audit: found ${issues.length} issue(s)\n`);

  for (const issue of issues) {
    const rel = toRel(issue.file);
    console.log(`- [${issue.type}] ${rel}:${issue.line}:${issue.col}`);
  }

  console.log('\nDetails (first 5):');
  for (const issue of issues.slice(0, 5)) {
    console.log(`\n${toRel(issue.file)}:${issue.line}:${issue.col}\n${issue.detail}`);
  }

  process.exit(1);
}

await main();
