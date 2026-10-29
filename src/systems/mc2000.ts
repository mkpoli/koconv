import { convertWords, type Syllable } from '../hangul';
import { pronounce, type Coda, type Consonant } from '../phonology';

const onsetMapping: Record<Consonant, string> = {
  '': '',
  ㄱ: 'g',
  ㄲ: 'kk',
  ㄴ: 'n',
  ㄷ: 'd',
  ㄸ: 'tt',
  ㄹ: 'r',
  ㅁ: 'm',
  ㅂ: 'b',
  ㅃ: 'pp',
  ㅅ: 's',
  ㅆ: 'ss',
  ㅈ: 'j',
  ㅉ: 'jj',
  ㅊ: 'ch',
  ㅋ: 'k',
  ㅌ: 't',
  ㅍ: 'p',
  ㅎ: 'h',
};

const nucleusMapping: Record<string, string> = {
  ᅡ: 'a',
  ᅢ: 'ae',
  ᅣ: 'ya',
  ᅤ: 'yae',
  ᅥ: 'eo',
  ᅦ: 'e',
  ᅧ: 'yeo',
  ᅨ: 'ye',
  ᅩ: 'o',
  ᅪ: 'wa',
  ᅫ: 'wae',
  ᅬ: 'oe',
  ᅭ: 'yo',
  ᅮ: 'u',
  ᅯ: 'wo',
  ᅰ: 'we',
  ᅱ: 'wi',
  ᅲ: 'yu',
  ᅳ: 'eu',
  ᅴ: 'ui',
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

function romanizeWord(syllables: Syllable[]): string {
  let result = '';
  let previousCoda: Coda = '';
  for (const { onset, nucleus, coda } of pronounce(syllables)) {
    // ㄹㄹ is ll (제2장 제2항 붙임 2).
    result += onset === 'ㄹ' && previousCoda === 'ㄹ' ? 'l' : onsetMapping[onset]!;
    result += nucleusMapping[nucleus]! + codaMapping[coda];
    previousCoda = coda;
  }
  return result;
}

/**
 * Converts a Hangul string into the Revised Romanization of Korean.
 *
 * The Revised Romanization (국어의 로마자 표기법), announced by the
 * Ministry of Culture and Tourism in 2000, is the official system of South
 * Korea. It romanizes the standard pronunciation, so sound changes between
 * syllables are written, except tensing. Following the rule for nouns, ㅎ
 * after ㄱ, ㄷ, ㅂ is kept (묵호 Mukho), and capitals, hyphens and spacing
 * are left as in the input.
 *
 * @param hangul A string containing Hangul characters.
 */
export function convertHangulToMC2000(hangul: string): string {
  return convertWords(hangul, romanizeWord);
}
