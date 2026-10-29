import { convertHangulToDPRK, convertHangulToMC2000, convertHangulToYale } from '../src/index';

const SAMPLE =
  '모든 인간은 태어날 때부터 자유로우며 그 존엄과 권리에 있어 동등하다. 인간은 천부적으로 이성과 양심을 부여받았으며 서로 형제애의 정신으로 행동하여야 한다. ';
const TEXT = SAMPLE.repeat(2000);

for (const [name, convert] of [
  ['MC2000', convertHangulToMC2000],
  ['DPRK', convertHangulToDPRK],
  ['Yale', convertHangulToYale],
] as const) {
  convert(TEXT);
  const start = performance.now();
  for (let i = 0; i < 5; i++) convert(TEXT);
  const ms = (performance.now() - start) / 5;
  console.log(`${name.padEnd(6)} ${ms.toFixed(1).padStart(7)} ms  (${((TEXT.length / ms) * 1000 / 1e6).toFixed(2)} M chars/s)`);
}
