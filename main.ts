// World news of Friday 20 November 2026 in one image (make.fun news-image-20261120).
//
// The image is entry.png beside this file: a newspaper front page drawn as SVG in art/front-page.html and
// rendered once with art/render.sh. This program checks the file against the contest's limits, then writes
// the same bytes to /output/entry.png. No network, standard library only, identical output on every run.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1024 * 1024;
const MAX_SIDE = 1024;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Reads width and height from a PNG's IHDR chunk and refuses anything the gate would refuse. */
function checkPng(bytes: Buffer): { width: number; height: number } {
  if (bytes.length > MAX_BYTES) throw new Error(`entry.png is ${bytes.length} bytes, over ${MAX_BYTES}`);
  if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error('entry.png is not a PNG');
  if (bytes.toString('latin1', 12, 16) !== 'IHDR') throw new Error('entry.png has no IHDR chunk first');
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (width > MAX_SIDE || height > MAX_SIDE) throw new Error(`entry.png is ${width}x${height}, over ${MAX_SIDE}`);
  if (bytes.toString('latin1', bytes.length - 8, bytes.length - 4) !== 'IEND') throw new Error('entry.png is cut short');
  return { width, height };
}

const image = readFileSync(new URL('./entry.png', import.meta.url));
const { width, height } = checkPng(image);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.png'), image);
console.log(`wrote entry.png: ${width}x${height}, ${image.length} bytes`);
