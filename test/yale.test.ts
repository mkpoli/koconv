import { expect, test } from 'bun:test';
import { convertHangulToYale } from '../src/index';

test.each([
  // Spelling is transliterated as written, with no sound change.
  ['옷이', 'os.i'],
  ['걷는', 'ketnun'],
  ['낮', 'nac'],
  ['앉아', 'anc.a'],
  ['핥다', 'halthta'],
  ['읊다', 'ulphta'],
  ['한나산', 'hannasan'],
  // ㅞ is wey; only ㅜ loses its w after a labial.
  ['웨', 'wey'],
  ['봐', 'pwa'],
  ['뭐', 'mwe'],
  ['무', 'mu'],
  // A period marks a boundary after a final consonant before a vowel,
  // or where the consonants could be divided another way.
  ['늙은', 'nulk.un'],
  ['같이', 'kath.i'],
  ['영어', 'yeng.e'],
  ['각하', 'kak.ha'],
  ['악가', 'ak.ka'],
  ['아까', 'akka'],
])('%s → %s', (hangul, yale) => {
  expect(convertHangulToYale(hangul)).toBe(yale);
});
