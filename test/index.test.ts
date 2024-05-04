import { test, expect } from 'bun:test';
import { convertHangulToDPRK } from '../src/index';

const TEST_CASES = [
  {
    hangul: '안녕하세요',
    dprk: 'annyŏnghaseyo',
  },
  {
    hangul: '반갑습니다',
    dprk: 'pangapsumnida',
  },
];

test('Hangul-DPRK', () => {
  for (const { hangul, dprk } of TEST_CASES) {
    expect(convertHangulToDPRK(hangul)).toEqual(dprk);
  }
});
