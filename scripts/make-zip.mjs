/**
 * dist/ klasörünü cPanel'e yüklenmeye hazır tek bir zip haline getirir.
 * Çalıştırmak için: npm run zip  →  corventech-site.zip
 *
 * Windows'un Compress-Archive komutu yolları ters eğik çizgiyle yazıyor; cPanel'in
 * açıcısı bunu klasör değil dosya adı sayıp siteyi bozabiliyor. Bu yüzden zip
 * burada elle, ZIP standardına uygun ileri eğik çizgilerle üretilir.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'dist');
const output = path.join(root, 'corventech-site.zip');

if (!fs.existsSync(source)) {
  console.error('dist/ bulunamadı. Önce "npm run build" çalıştırın.');
  process.exit(1);
}

/** dist/ altındaki tüm dosyaları zip içi yollarıyla (ileri eğik çizgili) toplar. */
function collect(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    return entry.isDirectory() ? collect(full, name) : [{ name, full }];
  });
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

const files = collect(source);
const locals = [];
const central = [];
let offset = 0;

for (const file of files) {
  const content = fs.readFileSync(file.full);
  const deflated = zlib.deflateRawSync(content, { level: 9 });
  // Sıkıştırma işe yaramadıysa dosyayı olduğu gibi sakla (yöntem 0)
  const useDeflate = deflated.length < content.length;
  const data = useDeflate ? deflated : content;
  const method = useDeflate ? 8 : 0;
  const nameBuffer = Buffer.from(file.name, 'utf8');
  const crc = crc32(content);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4); // gerekli sürüm
  local.writeUInt16LE(0x0800, 6); // UTF-8 ad bayrağı
  local.writeUInt16LE(method, 8);
  local.writeUInt16LE(0, 10); // saat
  local.writeUInt16LE(0x21, 12); // tarih (sabit: 1980-01-01)
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(data.length, 18);
  local.writeUInt32LE(content.length, 22);
  local.writeUInt16LE(nameBuffer.length, 26);
  locals.push(local, nameBuffer, data);

  const entry = Buffer.alloc(46);
  entry.writeUInt32LE(0x02014b50, 0);
  entry.writeUInt16LE(20, 4); // oluşturan sürüm
  entry.writeUInt16LE(20, 6); // gerekli sürüm
  entry.writeUInt16LE(0x0800, 8);
  entry.writeUInt16LE(method, 10);
  entry.writeUInt16LE(0, 12);
  entry.writeUInt16LE(0x21, 14);
  entry.writeUInt32LE(crc, 16);
  entry.writeUInt32LE(data.length, 20);
  entry.writeUInt32LE(content.length, 24);
  entry.writeUInt16LE(nameBuffer.length, 28);
  entry.writeUInt32LE(offset, 42);
  central.push(entry, nameBuffer);

  offset += local.length + nameBuffer.length + data.length;
}

const centralBuffer = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralBuffer.length, 12);
end.writeUInt32LE(offset, 16);

fs.writeFileSync(output, Buffer.concat([...locals, centralBuffer, end]));

console.log(`corventech-site.zip yazıldı — ${files.length} dosya, ${Math.round(fs.statSync(output).size / 1024)} KB`);
for (const file of files) console.log(`  ${file.name}`);
