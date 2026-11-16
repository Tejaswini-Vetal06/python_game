const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation
function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

const table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
  }
  table[i] = c;
}

function makePng(width, height, isMaskable = false) {
  // Generate RGBA pixel buffer
  // Dark navy background (#0a0e1a) with electric purple & cyan gaming shield in center
  const rowLength = width * 4 + 1;
  const rawData = Buffer.alloc(rowLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = isMaskable ? width * 0.4 : width * 0.44;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0; // Filter byte 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        // Gradient from Purple (139, 92, 246) to Cyan (6, 182, 212)
        const t = (x + y) / (width + height);
        rawData[pxOffset + 0] = Math.round(139 * (1 - t) + 6 * t);   // R
        rawData[pxOffset + 1] = Math.round(92 * (1 - t) + 182 * t);   // G
        rawData[pxOffset + 2] = Math.round(246 * (1 - t) + 212 * t);  // B
        rawData[pxOffset + 3] = 255;                                  // A
      } else {
        // Deep navy background
        rawData[pxOffset + 0] = 10;  // #0a
        rawData[pxOffset + 1] = 14;  // #0e
        rawData[pxOffset + 2] = 26;  // #1a
        rawData[pxOffset + 3] = 255; // A
      }
    }
  }

  // PNG Signature
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 6; // Color type 6 (RGBA)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  const ihdrType = Buffer.from('IHDR');
  const ihdrCrc = Buffer.alloc(4);
  ihdrCrc.writeUInt32BE(crc32(Buffer.concat([ihdrType, ihdrData])), 0);

  const ihdrChunk = Buffer.concat([
    Buffer.from([0, 0, 0, 13]),
    ihdrType,
    ihdrData,
    ihdrCrc
  ]);

  // IDAT chunk
  const compressed = zlib.deflateSync(rawData);
  const idatType = Buffer.from('IDAT');
  const idatLength = Buffer.alloc(4);
  idatLength.writeUInt32BE(compressed.length, 0);
  const idatCrc = Buffer.alloc(4);
  idatCrc.writeUInt32BE(crc32(Buffer.concat([idatType, compressed])), 0);

  const idatChunk = Buffer.concat([
    idatLength,
    idatType,
    compressed,
    idatCrc
  ]);

  // IEND chunk
  const iendType = Buffer.from('IEND');
  const iendLength = Buffer.alloc(4);
  iendLength.writeUInt32BE(0, 0);
  const iendCrc = Buffer.alloc(4);
  iendCrc.writeUInt32BE(crc32(iendType), 0);

  const iendChunk = Buffer.concat([
    iendLength,
    iendType,
    iendCrc
  ]);

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

const pubDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(pubDir, 'icon-192.png'), makePng(192, 192, false));
fs.writeFileSync(path.join(pubDir, 'icon-512.png'), makePng(512, 512, false));
fs.writeFileSync(path.join(pubDir, 'maskable-icon-512.png'), makePng(512, 512, true));

console.log('Successfully generated icon-192.png, icon-512.png, and maskable-icon-512.png in public/');
