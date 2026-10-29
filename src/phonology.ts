import type { Syllable } from './hangul';

/** A consonant letter, written with compatibility jamo (ㄱ, ㄲ, …, ㅎ). */
export type Consonant = string;

/** One of the seven consonants that can be pronounced at the end of a syllable. */
export type Coda = '' | 'ㄱ' | 'ㄴ' | 'ㄷ' | 'ㄹ' | 'ㅁ' | 'ㅂ' | 'ㅇ';

/** A syllable as pronounced, after the sound changes inside a word. */
export interface Sound {
  /** Pronounced initial consonant, or '' before a vowel. */
  onset: Consonant;
  /** The onset is tensed by the preceding consonant without being spelled tense. */
  tense: boolean;
  /** Vowel, as a conjoining jamo (ᅡ … ᅵ). */
  nucleus: string;
  /** Pronounced final consonant. */
  coda: Coda;
}

const ONSET: Record<string, Consonant> = {
  ᄀ: 'ㄱ', ᄁ: 'ㄲ', ᄂ: 'ㄴ', ᄃ: 'ㄷ', ᄄ: 'ㄸ', ᄅ: 'ㄹ', ᄆ: 'ㅁ', ᄇ: 'ㅂ', ᄈ: 'ㅃ', ᄉ: 'ㅅ',
  ᄊ: 'ㅆ', ᄋ: '', ᄌ: 'ㅈ', ᄍ: 'ㅉ', ᄎ: 'ㅊ', ᄏ: 'ㅋ', ᄐ: 'ㅌ', ᄑ: 'ㅍ', ᄒ: 'ㅎ',
};

/** Spelled final consonants, split into their letters. */
const CODA_LETTERS: Record<string, Consonant[]> = {
  '': [], ᆨ: ['ㄱ'], ᆩ: ['ㄲ'], ᆪ: ['ㄱ', 'ㅅ'], ᆫ: ['ㄴ'], ᆬ: ['ㄴ', 'ㅈ'], ᆭ: ['ㄴ', 'ㅎ'],
  ᆮ: ['ㄷ'], ᆯ: ['ㄹ'], ᆰ: ['ㄹ', 'ㄱ'], ᆱ: ['ㄹ', 'ㅁ'], ᆲ: ['ㄹ', 'ㅂ'], ᆳ: ['ㄹ', 'ㅅ'],
  ᆴ: ['ㄹ', 'ㅌ'], ᆵ: ['ㄹ', 'ㅍ'], ᆶ: ['ㄹ', 'ㅎ'], ᆷ: ['ㅁ'], ᆸ: ['ㅂ'], ᆹ: ['ㅂ', 'ㅅ'],
  ᆺ: ['ㅅ'], ᆻ: ['ㅆ'], ᆼ: ['ㅇ'], ᆽ: ['ㅈ'], ᆾ: ['ㅊ'], ᆿ: ['ㅋ'], ᇀ: ['ㅌ'], ᇁ: ['ㅍ'], ᇂ: ['ㅎ'],
};

/** The pronounced value of a final consonant (표준 발음법 제9항). */
const NEUTRAL: Record<Consonant, Coda> = {
  ㄱ: 'ㄱ', ㄲ: 'ㄱ', ㅋ: 'ㄱ', ㄴ: 'ㄴ', ㄷ: 'ㄷ', ㅅ: 'ㄷ', ㅆ: 'ㄷ', ㅈ: 'ㄷ', ㅊ: 'ㄷ',
  ㅌ: 'ㄷ', ㅎ: 'ㄷ', ㄹ: 'ㄹ', ㅁ: 'ㅁ', ㅂ: 'ㅂ', ㅍ: 'ㅂ', ㅇ: 'ㅇ',
};

const ASPIRATED: Record<Consonant, Consonant> = { ㄱ: 'ㅋ', ㄷ: 'ㅌ', ㅂ: 'ㅍ', ㅈ: 'ㅊ' };
const NASAL: Record<Coda, Coda> = { '': '', ㄱ: 'ㅇ', ㄴ: 'ㄴ', ㄷ: 'ㄴ', ㄹ: 'ㄹ', ㅁ: 'ㅁ', ㅂ: 'ㅁ', ㅇ: 'ㅇ' };
const OBSTRUENTS = new Set<Coda>(['ㄱ', 'ㄷ', 'ㅂ']);
/** Nouns ending in ㄺ, which keep ㄱ before ㄱ (닭과 [닥꽈]); stems drop it (맑게 [말께]). */
const LG_NOUNS = new Set(['닭', '흙', '칡', '삵'].map((noun) => noun.normalize('NFD')));
/** Letter names, whose final has a fixed value before a vowel (제16항): 디귿이 [디그시]. */
const LETTER_NAME_FINALS: Record<string, Consonant> = Object.fromEntries(
  Object.entries({ 귿: 'ㅅ', 읒: 'ㅅ', 읓: 'ㅅ', 읔: 'ㄱ', 읕: 'ㅅ', 읖: 'ㅂ', 읗: 'ㅅ' }).map(([name, final]) => [
    name.normalize('NFD'),
    final,
  ]),
);
const TENSABLE = new Set<Consonant>(['ㄱ', 'ㄷ', 'ㅂ', 'ㅅ', 'ㅈ']);
const I = 'ᅵ';
const YEO = 'ᅧ';

/** The syllable as a string of conjoining jamo, comparable with `normalize('NFD')`. */
const spell = (syllable: Syllable): string => syllable.join('');

/**
 * The letter of a two-letter final that is pronounced before a consonant
 * or at the end of a word (표준 발음법 제10항, 제11항).
 */
function survivor(
  [first, second]: Consonant[],
  next: Consonant,
  syllable: Syllable,
  following?: Syllable,
): Consonant {
  if (!second) return first!;
  switch (`${first}${second}`) {
    case 'ㄹㄱ':
      return next === 'ㄱ' && !LG_NOUNS.has(spell(syllable)) ? 'ㄹ' : 'ㄱ';
    case 'ㄹㅂ': {
      // 밟- is pronounced with ㅂ, and so is 넓- in 넓죽하다, 넓둥글다 (제10항 다만).
      const word = (spell(syllable) + (following ? spell(following) : '')).normalize('NFC');
      return word.startsWith('밟') || word === '넓죽' || word === '넓둥' ? 'ㅂ' : 'ㄹ';
    }
    case 'ㄹㅁ':
    case 'ㄹㅍ':
      return second;
    default:
      return first!;
  }
}

/** Which standard pronunciation to follow. */
export type Norm = 'south' | 'north';

/** Applies the consonant assimilations between a pronounced final and the next onset. */
function assimilate(coda: Coda, onset: Consonant, norm: Norm): [Coda, Consonant, boolean] {
  if (onset === 'ㄹ') {
    // 신라 [실라] (제20항). The North writes ll only in established names (2012 §3.2): 은률 Ŭnryul.
    if (coda === 'ㄴ') {
      if (norm === 'south') coda = 'ㄹ';
    }
    // 종로 [종노], 독립 [독닙] (제19항). The North keeps the ㄹ: 압록강 Amrokgang.
    else if (coda && coda !== 'ㄹ') {
      if (norm === 'south') onset = 'ㄴ';
      else coda = NASAL[coda];
    }
  } else if (onset === 'ㄴ' && coda === 'ㄹ') {
    onset = 'ㄹ'; // 별내 [별래] (제20항)
  }
  if (onset === 'ㄴ' || onset === 'ㅁ') coda = NASAL[coda]; // 백마 [뱅마] (제18항)
  return [coda, onset, OBSTRUENTS.has(coda) && TENSABLE.has(onset)]; // 국밥 [국빱] (제23항)
}

/**
 * Resolves one syllable boundary: the spelled final `letters` of a syllable
 * against the next syllable's onset and vowel.
 */
function join(
  letters: Consonant[],
  onset: Consonant,
  nucleus: string,
  syllable: Syllable,
  following: Syllable,
  norm: Norm,
): [Coda, Consonant, boolean] {
  const [first, second] = letters;
  if (!first) return ['', onset, false];

  // Before a vowel the final moves over (제13항, 제14항) and ㄷ, ㅌ before ㅣ become ㅈ, ㅊ (제17항).
  if (onset === '') {
    const letterName = LETTER_NAME_FINALS[spell(syllable)];
    if (letterName) return ['', letterName, false];
    if (first === 'ㅇ') return ['ㅇ', '', false];
    if (first === 'ㅎ') return ['', '', false]; // 좋아 [조아] (제12항 4)
    if (second === 'ㅎ') return ['', first, false]; // 않아 [아나], 싫어 [시러]
    const moved = second ?? first;
    const palatal = nucleus === I && (moved === 'ㄷ' || moved === 'ㅌ');
    return [
      second ? NEUTRAL[first]! : '',
      palatal ? (moved === 'ㄷ' ? 'ㅈ' : 'ㅊ') : moved,
      second === 'ㅅ', // 넋이 [넉씨], 값을 [갑쓸]
    ];
  }

  // A final ㅎ aspirates the next ㄱ, ㄷ, ㅈ and tenses ㅅ (제12항).
  if (first === 'ㅎ' || second === 'ㅎ') {
    const rest: Coda = second ? NEUTRAL[first]! : '';
    if (ASPIRATED[onset] && onset !== 'ㅂ') return [rest, ASPIRATED[onset]!, false]; // 좋고 [조ː코]
    if (onset === 'ㅅ') return [rest, 'ㅅ', true]; // 닿소 [다ː쏘]
    if (onset === 'ㄴ') return assimilate(rest || 'ㄴ', 'ㄴ', norm); // 놓는 [논는], 뚫는 [뚤른]
    return assimilate(rest || 'ㄷ', onset, norm);
  }

  // ㄱ, ㄷ, ㅂ, ㅈ before ㅎ (제12항 1, 붙임 1).
  if (onset === 'ㅎ') {
    if (second && ASPIRATED[second]) return [NEUTRAL[first]!, ASPIRATED[second]!, false]; // 밝히다 [발키다]
    // Before the suffix 히 (or 혀 from 히어): 맞히다 [마치다], 굳히다 [구치다], 닫혀 [다처] (제17항 붙임).
    if ((nucleus === I || nucleus === YEO) && (first === 'ㅈ' || first === 'ㄷ' || first === 'ㅌ')) {
      return ['', 'ㅊ', false];
    }
    // Otherwise the final stays and the ㅎ is written: 묵호 Mukho, 집현전 Jiphyeonjeon, 낮하고 nathago.
    return [NEUTRAL[survivor(letters, onset, syllable, following)]!, 'ㅎ', false];
  }

  const kept = survivor(letters, onset, syllable, following);
  const result = assimilate(NEUTRAL[kept]!, onset, norm);
  // A two-letter final also tenses what follows: 앉고 [안꼬], 넓다 [널따] (제24항, 제25항).
  if (second && TENSABLE.has(result[1])) result[2] = true;
  return result;
}

/**
 * Pronounces a word written in Hangul following the Standard Pronunciation
 * of Korean (표준 발음법, 1988), as far as spelling alone allows: sound
 * changes that depend on meaning, such as ㄴ insertion (학여울 [항녀울]) or
 * tensing within compounds (물방울 [물빵울]), are not applied. With
 * `norm: 'north'`, ㄹ after another consonant stays ㄹ and ㄴ before ㄹ
 * stays ㄴ, as in the DPRK's romanization.
 */
export function pronounce(syllables: Syllable[], norm: Norm = 'south'): Sound[] {
  const sounds: Sound[] = syllables.map(([onset, nucleus]) => ({
    onset: ONSET[onset]!,
    tense: false,
    nucleus,
    coda: '',
  }));
  for (let i = 0; i < syllables.length; i++) {
    const syllable = syllables[i]!;
    const letters = CODA_LETTERS[syllable[2]]!;
    const sound = sounds[i]!;
    const next = sounds[i + 1];
    if (next) {
      [sound.coda, next.onset, next.tense] = join(
        letters,
        next.onset,
        next.nucleus,
        syllable,
        syllables[i + 1]!,
        norm,
      );
    } else if (letters.length) {
      sound.coda = NEUTRAL[survivor(letters, '', syllable)]!;
    }
  }
  return sounds;
}
