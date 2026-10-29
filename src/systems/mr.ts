import { convertWords, type Syllable } from '../hangul';
import { pronounce, type Coda, type Consonant } from '../phonology';

const onsetMapping: Record<Consonant, string> = {
  '': '',
  ㄱ: 'k',
  ㄲ: 'kk',
  ㄴ: 'n',
  ㄷ: 't',
  ㄸ: 'tt',
  ㄹ: 'r',
  ㅁ: 'm',
  ㅂ: 'p',
  ㅃ: 'pp',
  ㅅ: 's',
  ㅆ: 'ss',
  ㅈ: 'ch',
  ㅉ: 'tch',
  ㅊ: "ch'",
  ㅋ: "k'",
  ㅌ: "t'",
  ㅍ: "p'",
  ㅎ: 'h',
};

const VOICED: Record<Consonant, string> = { ㄱ: 'g', ㄷ: 'd', ㅂ: 'b', ㅈ: 'j' };

const nucleusMapping: Record<string, string> = {
  ᅡ: 'a',
  ᅢ: 'ae',
  ᅣ: 'ya',
  ᅤ: 'yae',
  ᅥ: 'ŏ',
  ᅦ: 'e',
  ᅧ: 'yŏ',
  ᅨ: 'ye',
  ᅩ: 'o',
  ᅪ: 'wa',
  ᅫ: 'wae',
  ᅬ: 'oe',
  ᅭ: 'yo',
  ᅮ: 'u',
  ᅯ: 'wŏ',
  ᅰ: 'we',
  ᅱ: 'wi',
  ᅲ: 'yu',
  ᅳ: 'ŭ',
  ᅴ: 'ŭi',
  ᅵ: 'i',
};

const codaMapping: Record<Coda, string> = {
  '': '',
  ㄱ: 'k',
  ㄴ: 'n',
  ㄷ: 't',
  ㄹ: 'l',
  ㅁ: 'm',
  ㅂ: 'p',
  ㅇ: 'ng',
};

const VOICED_CODAS = new Set<Coda>(['', 'ㄴ', 'ㄹ', 'ㅁ', 'ㅇ']);

/** A final whose letter merges into the tense onset after it: 받침 ㄷ + ㅅ is ss, not tss. */
const ABSORBED = new Set(['ㄱㄲ', 'ㄷㄸ', 'ㅂㅃ', 'ㄷㅉ', 'ㄷㅅ', 'ㄷㅆ']);

/** ㅎ merged into a stop is written as the stop plus h: 밝히는 palkhinŭn. */
const H_MERGED: Record<Consonant, string> = { ㅋ: 'kh', ㅌ: 'th', ㅍ: 'ph' };

function romanizeWord(syllables: Syllable[]): string {
  let result = '';
  let previous: Coda = '';
  pronounce(syllables).forEach(({ onset, tense, nucleus, coda }, i) => {
    let romanOnset = onsetMapping[onset]!;
    if (syllables[i]![0] === 'ᄒ' && H_MERGED[onset]) {
      romanOnset = H_MERGED[onset]!;
    } else if (ABSORBED.has(previous + onset)) {
      result = result.slice(0, -codaMapping[previous].length);
      if (onset === 'ㅅ') romanOnset = 'ss';
    } else if (VOICED[onset] && result && !tense && VOICED_CODAS.has(previous)) {
      // ㄱ, ㄷ, ㅂ, ㅈ are voiced between vowels and after ㄴ, ㄹ, ㅁ, ㅇ.
      romanOnset = VOICED[onset]!;
      // An apostrophe keeps ㄴ + ㄱ apart from ㅇ: 연구 yŏn'gu, 영어 yŏngŏ.
      if (previous === 'ㄴ' && onset === 'ㄱ') romanOnset = `'${romanOnset}`;
    } else if (onset === 'ㄹ' && previous === 'ㄹ') {
      romanOnset = 'l';
    } else if (onset === 'ㅅ' && nucleus === 'ᅱ') {
      romanOnset = 'sh'; // 쉽다 shwipta
    }
    let romanNucleus = nucleusMapping[nucleus]!;
    // 에 after a or o is ë, so that 회사에 hoesaë differs from 회새 hoesae.
    if (!onset && !previous && romanNucleus === 'e' && /[ao]$/.test(result)) romanNucleus = 'ë';
    // ㄹ before ㅎ is r: 발해 Parhae.
    if (onset === 'ㅎ' && previous === 'ㄹ') result = `${result.slice(0, -1)}r`;
    result += romanOnset + romanNucleus + codaMapping[coda];
    previous = coda;
  });
  return result;
}

/**
 * Converts a Hangul string into McCune–Reischauer romanization.
 *
 * The system George M. McCune and Edwin O. Reischauer published in 1939
 * romanizes the pronunciation, writing ㄱ, ㄷ, ㅂ, ㅈ voiced between voiced
 * sounds and marking aspiration with an apostrophe (`k'`, `ch'`). This
 * follows the original system, not the South Korean variant of 1984 or the
 * ALA-LC rules, but writes the ASCII apostrophe where the 1939 paper prints
 * ’. Capitals, hyphens and spacing are left as in the input.
 *
 * @param hangul A string containing Hangul characters.
 */
export function convertHangulToMR(hangul: string): string {
  return convertWords(hangul, romanizeWord);
}
