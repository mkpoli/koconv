import { convertWords, type Syllable } from '../hangul';

const onsetMapping: Record<string, string> = {
  ᄀ: 'k',
  ᄁ: 'kk',
  ᄂ: 'n',
  ᄃ: 't',
  ᄄ: 'tt',
  ᄅ: 'l',
  ᄆ: 'm',
  ᄇ: 'p',
  ᄈ: 'pp',
  ᄉ: 's',
  ᄊ: 'ss',
  ᄋ: '',
  ᄌ: 'c',
  ᄍ: 'cc',
  ᄎ: 'ch',
  ᄏ: 'kh',
  ᄐ: 'th',
  ᄑ: 'ph',
  ᄒ: 'h',
};

const nucleusMapping: Record<string, string> = {
  ᅡ: 'a',
  ᅢ: 'ay',
  ᅣ: 'ya',
  ᅤ: 'yay',
  ᅥ: 'e',
  ᅦ: 'ey',
  ᅧ: 'ye',
  ᅨ: 'yey',
  ᅩ: 'o',
  ᅪ: 'wa',
  ᅫ: 'way',
  ᅬ: 'oy',
  ᅭ: 'yo',
  ᅮ: 'wu',
  ᅯ: 'we',
  ᅰ: 'wey',
  ᅱ: 'wi',
  ᅲ: 'yu',
  ᅳ: 'u',
  ᅴ: 'uy',
  ᅵ: 'i',
};

const codaMapping: Record<string, string> = {
  '': '',
  ᆨ: 'k',
  ᆩ: 'kk',
  ᆪ: 'ks',
  ᆫ: 'n',
  ᆬ: 'nc',
  ᆭ: 'nh',
  ᆮ: 't',
  ᆯ: 'l',
  ᆰ: 'lk',
  ᆱ: 'lm',
  ᆲ: 'lp',
  ᆳ: 'ls',
  ᆴ: 'lth',
  ᆵ: 'lph',
  ᆶ: 'lh',
  ᆷ: 'm',
  ᆸ: 'p',
  ᆹ: 'ps',
  ᆺ: 's',
  ᆻ: 'ss',
  ᆼ: 'ng',
  ᆽ: 'c',
  ᆾ: 'ch',
  ᆿ: 'kh',
  ᇀ: 'th',
  ᇁ: 'ph',
  ᇂ: 'h',
};

const LABIALS = new Set(['p', 'ph', 'pp', 'm']);
const ONSETS = new Set(Object.values(onsetMapping));
const CODAS = new Set(Object.values(codaMapping));

/**
 * Whether `coda + onset` can also be read with the boundary elsewhere,
 * e.g. `k` + `kw` (백과) against `kk` + `w`.
 */
function isAmbiguous(coda: string, onset: string): boolean {
  const cluster = coda + onset;
  for (let i = 0; i <= cluster.length; i++) {
    if (i === coda.length) continue;
    const left = cluster.slice(0, i);
    const right = cluster.slice(i);
    if (right && CODAS.has(left) && ONSETS.has(right)) return true;
  }
  return false;
}

function romanizeWord(syllables: Syllable[]): string {
  let result = '';
  let previousCoda = '';
  for (const [onset, nucleus, coda] of syllables) {
    const romanOnset = onsetMapping[onset]!;
    let romanNucleus = nucleusMapping[nucleus]!;
    // After a labial ㅜ is abbreviated to u, the spelling of ㅡ everywhere.
    if (romanNucleus === 'wu' && LABIALS.has(romanOnset)) romanNucleus = 'u';
    if (previousCoda && (!romanOnset || isAmbiguous(previousCoda, romanOnset))) result += '.';
    previousCoda = codaMapping[coda]!;
    result += romanOnset + romanNucleus + previousCoda;
  }
  return result;
}

/**
 * Converts a Hangul string into Yale romanization.
 *
 * The system is the one Samuel E. Martin and his colleagues at Yale
 * University used for modern Korean. It transliterates letter by letter,
 * so the result follows the spelling, not the pronunciation. A period
 * marks the syllable boundary after a final consonant when the next
 * syllable starts with a vowel (`kath.i` 같이) or when the consonants
 * could be divided another way (`payk.kwa` 백과, against 배꽈 `paykkwa`).
 *
 * @param hangul A string containing Hangul characters.
 */
export function convertHangulToYale(hangul: string): string {
  return convertWords(hangul, romanizeWord);
}
