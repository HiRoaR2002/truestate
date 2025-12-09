const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../data/sales_data.csv');
const outputDir = path.join(__dirname, '../data/chunks');
const CHUNK_SIZE = 50 * 1024 * 1024; // 50MB

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const buffer = Buffer.alloc(CHUNK_SIZE);
const fd = fs.openSync(inputFile, 'r');
let bytesRead = 0;
let part = 0;

while ((bytesRead = fs.readSync(fd, buffer, 0, CHUNK_SIZE, null)) > 0) {
  const chunkPath = path.join(outputDir, `part_${String(part).padStart(3, '0')}`);
  const dataToWrite = bytesRead === CHUNK_SIZE ? buffer : buffer.slice(0, bytesRead);
  fs.writeFileSync(chunkPath, dataToWrite);
  console.log(`Created ${chunkPath}`);
  part++;
}

fs.closeSync(fd);
console.log('Splitting complete.');
