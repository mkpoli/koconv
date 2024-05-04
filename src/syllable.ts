// const UNICODE_OFFSET = 44032;
// const UNICODE_MAX = 55215;

export type Syllable = [
  /// Initial consonant (初聲 초성)
  onset: string,
  /// Medial vowel (中聲 중성)
  nucleus: string,
  /// Final consonant (終聲 종성)
  coda: string
];

// const UNICODE_HANGUL_SYLLABLE_BASE = 0xac00;
// const UNICODE_HANGUL_INITIAL_BASE = 0x1100;
// const UNICODE_HANGUL_MEDIAL_BASE = 0x1161;
// const UNICODE_HANGUL_FINAL_BASE = 0x11a7;
// const HANGUL_INITIAL_COUNT = 19;
// const HANGUL_MEDIAL_COUNT = 21;
// const HANGUL_FINAL_COUNT = 28;
// const HANGUL_NUCLEUS_CODA_COUNT = HANGUL_MEDIAL_COUNT * HANGUL_FINAL_COUNT; // 588
// const HANGUL_SYLLABLE_COUNT = HANGUL_INITIAL_COUNT * HANGUL_NUCLEUS_CODA_COUNT; // 11,172

/**
 * Separates a single Hangul syllable into its onset (initial), nucleus (medial), and coda (final) parts.
 * @param hangul A single Hangul character.
 * @returns An object with properties `onset`, `nucleus`, and `coda` representing the parts of the Hangul syllable.
 */
export function separateSyllable(hangul: string): Syllable {
  // return hangul.normalize('NFD').split('') as Syllable;
  // make sure [a, b, c] and, [a, b] are both 3 elements
  const normalized = hangul.normalize('NFD').split('');
  if (normalized.length === 2) {
    normalized.push('');
  } else if (normalized.length !== 3) {
    throw new Error(`Invalid Hangul Syllable "${hangul}"`);
  }
  return normalized as Syllable;

  // if (
  // 	hangul.length !== 1 ||
  // 	hangul.charCodeAt(0) < UNICODE_HANGUL_SYLLABLE_BASE ||
  // 	hangul.charCodeAt(0) > UNICODE_HANGUL_SYLLABLE_BASE + HANGUL_SYLLABLE_COUNT - 1
  // ) {
  // 	throw new Error(`Invalid Hangul Syllable "${hangul}"`);
  // }

  // const syllableIndex = hangul.charCodeAt(0) - UNICODE_HANGUL_SYLLABLE_BASE;
  // const onsetIndex = Math.floor(syllableIndex / HANGUL_NUCLEUS_CODA_COUNT);
  // const nucleusIndex = Math.floor(
  // 	(syllableIndex - onsetIndex * HANGUL_NUCLEUS_CODA_COUNT) / HANGUL_FINAL_COUNT
  // );
  // const codaIndex = syllableIndex % HANGUL_FINAL_COUNT;

  // // return {
  // // 	onset: String.fromCharCode(UNICODE_HANGUL_INITIAL_BASE + onsetIndex),
  // // 	nucleus: String.fromCharCode(UNICODE_HANGUL_MEDIAL_BASE + nucleusIndex),
  // // 	coda: codaIndex === 0 ? '' : String.fromCharCode(UNICODE_HANGUL_FINAL_BASE + codaIndex)
  // // };
}
