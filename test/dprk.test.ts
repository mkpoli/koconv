import { expect, test } from 'bun:test';
import { convertHangulToDPRK } from '../src/index';

// Examples from the DPRK's rules submitted to the UN Conferences on the
// Standardization of Geographical Names: E/CONF.101/CRP.15 (2012) and
// E/CONF.94/INF.72 (2002), its annex included. 평성시 is the 1992/2002
// Phyŏngsŏng-si; 2012 prints Phyŏngsong-si. Capitals are lowered and hyphens
// dropped: the converter does not know names or administrative units.
const EXAMPLES: [string, string][] = [
  // 2012 §2.1: voicing after a vowel or a resonant
  ['교구동', 'Kyogu-dong'],
  ['초도', 'Chodo'],
  ['고비리', 'Kobi-ri'],
  ['강동', 'Kangdong'],
  ['금교', 'Kŭmgyo'],
  ['칠보산', 'Chilbosan'],
  // §2.2–2.4: finals
  ['곡산', 'Koksan'],
  ['갑산', 'Kapsan'],
  ['앞산', 'Apsan'],
  ['삿갓봉', 'Satkatbong'],
  ['울산', 'Ulsan'],
  ['닭섬', 'Taksŏm'],
  ['붉은바위', 'Pulgŭnbawi'],
  ['앉은바위', 'Anjŭnbawi'],
  // §3.1: nasalization, with ㄹ kept
  ['백마산', 'Paengmasan'],
  ['꽃마을', 'Kkonmaŭl'],
  ['압록강', 'Amrokgang'],
  // §2.3, §3.2: ㄴ before ㄹ stays n outside established names
  ['은률', 'Ŭnryul'],
  // §4
  ['판교', 'Phan-gyo'],
  ['방어동', 'Pang-ŏ-dong'],
  ['평안남도', 'Phyŏngannam-do'],
  ['평성시', 'Phyŏngsŏng-si'],
  ['서포', 'Sŏpho'],
  ['찔레골', 'JJilre-gol'],
  // 2002 annex
  ['사기리', 'Sagi-ri'],
  ['강계', 'Kanggye'],
  ['석림리', 'Sŏngrim-ri'],
  ['백암', 'Paegam'],
  ['곡우리', 'Kogu-ri'],
  // 2002 §1 2)(5)
  ['우리산', 'Urisan'],
];

test.each(EXAMPLES)('%s → %s', (hangul, romanized) => {
  expect(convertHangulToDPRK(hangul)).toBe(romanized.toLowerCase().replace(/-/g, ''));
});

// ㄹ beside ㄴ, which no document example covers.
test.each([
  ['실내', 'sillae'],
])('%s → %s', (hangul, romanized) => {
  expect(convertHangulToDPRK(hangul)).toBe(romanized);
});

// Generic terms are only recognized after two or more syllables.
test.each([
  ['학교', 'hakkyo'],
  ['책도', 'chaekto'],
])('%s → %s', (hangul, romanized) => {
  expect(convertHangulToDPRK(hangul)).toBe(romanized);
});

// These depend on meaning or on a list of established names.
test.todo('천리마 → Chŏllima, 전라도 → Jŏllado, 한나산 → Hallasan (ll in established names, §3.2)');
test.todo('물곬 → Mulkol (tensing inside a compound)');
test.todo('기대산 → Kittaesan, 새별읍 → Saeppyŏl-ŭp, 뒤문 → Twinmun (compound sound changes, §3.3)');
test.todo('앞언덕 → Ap-ŏndŏk, 부엌안골 → Puŏk-angol (no liaison across a compound boundary)');
test.todo('평양 → Pyongyang, 서울 → Seoul (established spellings, §4.6)');
test.todo('붉은 바위 → Pulgŭnbawi, 3.1 동 → 3.1-dong (voicing and generics across a space)');
test.todo('안복철 → An Pok Chŏl (personal names, §4.5)');
