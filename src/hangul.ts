export type Syllable = [
  /// Initial consonant (初聲 초성)
  onset: string,
  /// Medial vowel (中聲 중성)
  nucleus: string,
  /// Final consonant (終聲 종성), empty when absent
  coda: string,
];

const SYLLABLE_BASE = 0xac00;
const NUCLEUS_COUNT = 21;
const CODA_COUNT = 28;

const ONSETS = [...'ᄀᄁᄂᄃᄄᄅᄆᄇᄈᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ'];
const NUCLEI = [...'ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ'];
const CODAS = ['', ...'ᆨᆩᆪᆫᆬᆭᆮᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸᆹᆺᆻᆼᆽᆾᆿᇀᇁᇂ'];

/**
 * Splits a run of precomposed Hangul syllables (U+AC00–U+D7A3) into
 * conjoining jamo by Unicode arithmetic.
 */
function decomposeWord(word: string): Syllable[] {
  const syllables: Syllable[] = new Array(word.length);
  for (let i = 0; i < word.length; i++) {
    const index = word.charCodeAt(i) - SYLLABLE_BASE;
    const coda = index % CODA_COUNT;
    const rest = (index - coda) / CODA_COUNT;
    const nucleus = rest % NUCLEUS_COUNT;
    syllables[i] = [ONSETS[(rest - nucleus) / NUCLEUS_COUNT]!, NUCLEI[nucleus]!, CODAS[coda]!];
  }
  return syllables;
}

/**
 * Converts every run of precomposed Hangul syllables in `text` with
 * `convertWord` and leaves everything else, including bare jamo, untouched.
 */
export function convertWords(
  text: string,
  convertWord: (syllables: Syllable[], word: string) => string,
): string {
  return text.replace(/[가-힣]+/g, (word) => convertWord(decomposeWord(word), word));
}
