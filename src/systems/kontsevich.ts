import { convertWords, type Syllable } from '../hangul';
import { pronounce, type Coda, type Consonant } from '../phonology';

const onsetMapping: Record<Consonant, string> = {
  '': '',
  ㄱ: 'к',
  ㄲ: 'кк',
  ㄴ: 'н',
  ㄷ: 'т',
  ㄸ: 'тт',
  ㄹ: 'р',
  ㅁ: 'м',
  ㅂ: 'п',
  ㅃ: 'пп',
  ㅅ: 'с',
  ㅆ: 'сс',
  ㅈ: 'ч',
  ㅉ: 'чч',
  ㅊ: 'чх',
  ㅋ: 'кх',
  ㅌ: 'тх',
  ㅍ: 'пх',
  ㅎ: 'х',
};

const VOICED: Record<Consonant, string> = { ㄱ: 'г', ㄷ: 'д', ㅂ: 'б', ㅈ: 'дж' };

const nucleusMapping: Record<string, string> = {
  ᅡ: 'а',
  ᅢ: 'э',
  ᅣ: 'я',
  ᅤ: 'йя',
  ᅥ: 'о',
  ᅦ: 'е',
  ᅧ: 'ё',
  ᅨ: 'йе',
  ᅩ: 'о',
  ᅪ: 'ва',
  ᅫ: 'вэ',
  ᅬ: 'ве',
  ᅭ: 'ё',
  ᅮ: 'у',
  ᅯ: 'во',
  ᅰ: 'ве',
  ᅱ: 'ви',
  ᅲ: 'ю',
  ᅳ: 'ы',
  ᅴ: 'ый',
  ᅵ: 'и',
};

/** Vowels written differently after a consonant: 계 ке, 희 хи. */
const AFTER_CONSONANT: Record<string, string> = { ᅨ: 'е', ᅴ: 'и' };

/** Vowels written differently at the start of a word: 여주 Йоджу, 요성산 Йосонсан. */
const WORD_INITIAL: Record<string, string> = { ᅧ: 'йо', ᅭ: 'йо' };

const codaMapping: Record<Coda, string> = {
  '': '',
  ㄱ: 'к',
  ㄴ: 'н',
  ㄷ: 'т',
  ㄹ: 'ль',
  ㅁ: 'м',
  ㅂ: 'п',
  ㅇ: 'н',
};

const SONORANTS = new Set<Coda>(['', 'ㄴ', 'ㄹ', 'ㅁ', 'ㅇ']);

/** A final whose letter merges into the tense onset after it: ㄷ + ㅅ is сс. */
const ABSORBED = new Set(['ㄱㄲ', 'ㄷㄸ', 'ㅂㅃ', 'ㄷㅉ', 'ㄷㅅ', 'ㄷㅆ']);

function romanizeWord(syllables: Syllable[]): string {
  let result = '';
  let previous: Coda = '';
  for (const { onset, tense, nucleus, coda } of pronounce(syllables)) {
    let cyrillicOnset = onsetMapping[onset]!;
    if (ABSORBED.has(previous + onset)) {
      result = result.slice(0, -codaMapping[previous].length);
      if (onset === 'ㅅ') cyrillicOnset = 'сс';
    } else if (VOICED[onset] && result && !tense && SONORANTS.has(previous)) {
      // ㄱ, ㄷ, ㅂ, ㅈ are voiced after a vowel or a sonorant, unless tensed (앉고 анко),
      // and ㄷ, ㅈ stay voiceless after ㄹ (철도 чхольто).
      if (previous !== 'ㄹ' || onset === 'ㄱ' || onset === 'ㅂ') cyrillicOnset = VOICED[onset]!;
    } else if (onset === 'ㄹ' && previous === 'ㄹ') {
      result = result.slice(0, -1); // ㄹㄹ is лл
      cyrillicOnset = 'л';
    }
    // ㄹ before a vowel or ㅎ is р: 발해 Пархэ.
    if (onset === 'ㅎ' && previous === 'ㄹ') result = `${result.slice(0, -2)}р`;
    const vowel =
      (!result && !onset && WORD_INITIAL[nucleus]) ||
      (onset && AFTER_CONSONANT[nucleus]) ||
      nucleusMapping[nucleus]!;
    // ъ keeps final ㅇ from softening into нь before и, е, ё, ю, я: 용인 Йонъин,
    // against 평안 Пхёнан. The sources show it only before и; the other
    // vowels are inferred from the same reading rule.
    if (!onset && previous === 'ㅇ' && /^[иеёюя]/.test(vowel)) cyrillicOnset = 'ъ';
    result += cyrillicOnset + vowel + codaMapping[coda];
    previous = coda;
  }
  return result;
}

/**
 * Converts a Hangul string into the Kontsevich Cyrillization.
 *
 * The system Lev Kontsevich formalized from the Russian tradition of
 * Kholodovich is the standard way to write Korean in Russian. It renders
 * the pronunciation: ㄱ, ㄷ, ㅂ, ㅈ are voiced after vowels and sonorants,
 * final ㄹ is ль and final ㅇ is н. Capitals and hyphens are left as in the
 * input.
 *
 * @param hangul A string containing Hangul characters.
 */
export function convertHangulToKontsevich(hangul: string): string {
  return convertWords(hangul, romanizeWord);
}
