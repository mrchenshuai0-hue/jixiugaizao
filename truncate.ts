import * as fs from 'fs';
const lines = fs.readFileSync('src/components/CapturedFugitiveRegistration.tsx', 'utf-8').split('\n');
fs.writeFileSync('src/components/CapturedFugitiveRegistration.tsx', lines.slice(0, 306).join('\n'));
