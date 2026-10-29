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
  ㅈ: 'j',
  ㅉ: 'jj',
  ㅊ: 'ch',
  ㅋ: 'kh',
  ㅌ: 'th',
  ㅍ: 'ph',
  ㅎ: 'h',
};

const VOICED: Record<Consonant, string> = { ㄱ: 'g', ㄷ: 'd', ㅂ: 'b' };

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
  ᅬ: 'oi',
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

const RESONANTS = new Set<Coda>(['', 'ㄴ', 'ㄹ', 'ㅁ', 'ㅇ']);

/**
 * Generic terms with a fixed spelling whatever precedes them (2012 §4.3):
 * 삿갓봉 Satkatbong, 압록강 Amrokgang. A generic is only recognized after
 * a name of two or more syllables, so that 학교 and 책도 keep k and t.
 */
const GENERICS = ['거리', '고개', '구역', '각', '강', '곳', '골', '교', '구', '군', '대', '도', '동', '벌', '봉'];

function genericLength(word: string): number {
  for (const generic of GENERICS) {
    if (word.length >= generic.length + 2 && word.endsWith(generic)) return generic.length;
  }
  return 0;
}

function romanizeWord(syllables: Syllable[], word: string): string {
  const sounds = pronounce(syllables, 'north');
  const generic = sounds.length - genericLength(word);
  let result = '';
  sounds.forEach(({ onset, tense, nucleus, coda }, i) => {
    const previous = sounds[i - 1];
    let romanOnset = onsetMapping[onset]!;
    if (VOICED[onset] && i > 0) {
      // ㄱ, ㄷ, ㅂ are voiced after a vowel or a resonant (2012 §2.1).
      if (i === generic || (!tense && RESONANTS.has(previous!.coda))) romanOnset = VOICED[onset]!;
    } else if (onset === 'ㄹ' && previous?.coda === 'ㄹ' && !(syllables[i - 1]![2] === 'ᆯ' && syllables[i]![0] === 'ᄅ')) {
      // ㄹ + ㄴ is ll (실내 sillae), but a spelled ㄹㄹ is lr (찔레골 JJilre-gol).
      romanOnset = 'l';
    }
    result += romanOnset + nucleusMapping[nucleus]! + codaMapping[coda];
  });
  return result;
}

/**
 * Converts a Hangul string into the DPRK romanization.
 *
 * The rules are those the DPRK submitted to the United Nations Conferences
 * on the Standardization of Geographical Names in 1992, 2002 and 2012, a
 * revision of McCune–Reischauer for geographical and personal names. ㅚ is
 * `oi` as in 2012. Hyphens, capitals and the compound spellings that need
 * a dictionary (기대산 Kittaesan, 앞언덕 Ap-ŏndŏk) are not produced.
 *
 * @param hangul A string containing Hangul characters.
 */
export function convertHangulToDPRK(hangul: string): string {
  return convertWords(hangul, romanizeWord);
}
