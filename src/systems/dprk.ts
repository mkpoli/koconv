import { separateSyllable } from '../syllable';

const onsetMapping: Record<string, string> = {
  ᄀ: 'k',
  ᄁ: 'kk',
  ᄂ: 'n',
  ᄃ: 't',
  ᄄ: 'tt',
  ᄅ: 'r',
  ᄆ: 'm',
  ᄇ: 'p',
  ᄈ: 'pp',
  ᄉ: 's',
  ᄊ: 'ss',
  ᄋ: '',
  // ᄌ: 'ch',
  ᄌ: 'j',
  ᄍ: 'jj',
  ᄎ: 'ch',
  ᄏ: 'kh',
  ᄐ: 'th',
  ᄑ: 'ph',
  ᄒ: 'h',
};

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

const codaMapping: Record<string, string> = {
  '': '',
  ᆨ: 'k',
  // ᆩ: 'kk',
  ᆩ: 'k',
  ᆪ: 'k',
  ᆫ: 'n',
  ᆬ: 'nj',
  ᆭ: 'nh',
  ᆮ: 't',
  ᆯ: 'l',
  ᆰ: 'k',
  ᆱ: 'm',
  ᆲ: 'l',
  ᆳ: 'l',
  ᆴ: 'lt',
  ᆵ: 'lp',
  ᆶ: 'lh',
  ᆷ: 'm',
  ᆸ: 'p',
  ᆹ: 'p',
  // ᆺ: 's',
  ᆺ: 't',
  // ᆻ: 'ss',
  ᆻ: 't',
  ᆼ: 'ng',
  ᆽ: 't',
  ᆾ: 't',
  ᆿ: 'k',
  ᇀ: 't',
  ᇁ: 'p',
  // ᇂ: 'h'
  ᇂ: 't',
};

const HangulSoundRules = new Map<string, string>([
  ['ᆼᄀ', 'ngg'],
  ['ᆼᄃ', 'ngd'],
  ['ᆼᄅ', 'ngn'],
  ['ᆼᄇ', 'ngb'],
  ['ᆼᄌ', 'ngj'],
  ['ᆫᄀ', 'ng'],
  ['ᆫᄃ', 'nd'],
  // ['ᆫᄅ', 'nr'],
  ['ᆫᄅ', 'll'],
  ['ᆫᄇ', 'nb'],
  ['ᆫᄌ', 'nj'],
  // ['ᆫᄂ', 'll'],
  ['ᆯᄀ', 'lg'],
  ['ᄅᄂ', 'll'],
  ['ᆯᄃ', 'ld'],
  ['ᆯᄇ', 'lb'],
  ['ᆯᄌ', 'lj'],
  ['ᆮᄋ', 'd'],
  ['ᆮᄂ', 'nn'],
  ['ᆮᄅ', 'nn'],
  ['ᆮᄆ', 'nm'],
  ['ᆮᄉ', 'ss'],
  ['ᆺᄇ', 'tb'],
  ['ᆺᄆ', 'nm'],
  // ['ᆺᄌ', 'tj'],
  // ['ᆺᄃ', 'td'],
  ['ᆾᄆ', 'nm'],
  ['ᆷᄀ', 'mg'],
  ['ᆷᄃ', 'md'],
  ['ᆷᄅ', 'mn'],
  ['ᆷᄇ', 'mb'],
  ['ᆷᄌ', 'mj'],
  ['ᆸᄋ', 'b'],
  ['ᆸᄂ', 'mn'],
  ['ᆸᄅ', 'mr'],
  ['ᆸᄆ', 'mm'],
  ['ᆹᄋ', 'ps'],
  ['ᆺᄋ', 'ss'],
  ['ᆻᄋ', 'ss'],
  ['ᆬᄋ', 'nj'],
  ['ᆭᄋ', 'nh'],
  ['ᆰᄋ', 'lg'],
  ['ᆱᄋ', 'lm'],
  ['ᆲᄋ', 'lb'],
  ['ᆳᄋ', 'ls'],
  ['ᆴᄋ', 'th'],
  ['ᆵᄋ', 'lph'],
  ['ᆶᄋ', 'r'],
  ['ᆰᄀ', 'lg'],
  ['ᆨᄋ', 'g'],
  ['ᆨᄂ', 'ngn'],
  ['ᆨᄅ', 'ngn'],
  ['ᆨᄆ', 'ngm'],
  ['ᆨᄇ', 'gb'],
  ['ᆨᄀ', 'kg'],
]);

/**
 * Converts decomposed Hangul syllable parts to Romanized string, adjusting for voicing and specific sound rules.
 * @param hangulParts An array of tuples where each tuple represents the onset, nucleus, and coda of a Hangul syllable.
 * @returns A string with the Romanized version of the Hangul input.
 */
/**
 * Converts decomposed Hangul syllable parts to Romanized string, adjusting for voicing and specific sound rules.
 * @param hangulParts An array of tuples where each tuple represents the onset, nucleus, and coda of a Hangul syllable.
 * @returns A string with the Romanized version of the Hangul input.
 */
function romanizeHangul(hangulParts: [string, string, string][]): string {
  return hangulParts
    .map(([onset, nucleus, coda], index) => {
      let romanOnset = onsetMapping[onset];
      const romanNucleus = nucleusMapping[nucleus];
      let romanCoda = codaMapping[coda] ?? '';

      // Adjust for voicing of the onset when it follows a voiced sound
      if (index > 0 && romanNucleus) {
        const previousCoda = hangulParts[index - 1][2];
        if (codaMapping[previousCoda] === '') {
          if (onset === 'ᄀ') romanOnset = 'g';
          else if (onset === 'ᄃ') romanOnset = 'd';
          else if (onset === 'ᄇ') romanOnset = 'b';
        }
      }

      if (index > 0) {
        // Remove the initial if sound rule matched (because it already includes the onset)
        const previousCoda = hangulParts[index - 1][2];
        const ruleKey = previousCoda + onset;
        const soundRuleResult = HangulSoundRules.get(ruleKey as any);
        if (soundRuleResult) {
          romanOnset = '';
        }
      }

      // Apply specific sound rule adjustments between coda of the current syllable and onset of the next syllable
      if (index < hangulParts.length - 1) {
        const nextOnset = hangulParts[index + 1][0];
        const ruleKey = coda + nextOnset;
        // console.log(`Checking rule: ${ruleKey}`);
        const soundRuleResult = HangulSoundRules.get(ruleKey as any);
        if (soundRuleResult) {
          // console.log(`Rule matched: ${ruleKey} => ${soundRuleResult}`);
          romanCoda = soundRuleResult;
        }
      }

      return romanOnset + romanNucleus + romanCoda;
    })
    .join('')
    .replace('di', 'ji');
}

/**
 * Converts a Hangul string into DPRK Romanization.
 *
 * The transcription is based on the official guidelines
 * submitted by the Democratic People's Republic of Korea
 * to the United Nations in 1992, 2002 and 2012, modified
 * version and replacement of the McCune-Reischauer system.
 *
 * @param hangul A string containing Hangul characters.
 */
export function convertHangulToDPRK(hangul: string): string {
  return (
    hangul
      // Preprocessing for special cases of preservative spelling of north korean
      //   1. -nr- -> -ll-
      .replace('한나산', '한라산')
      //   2. Tensification: -b- -> -pp-, -d- -> -tt-, -g- -> -kk-,
      .replace('기대산', '깃대산')
      .replace('새별읍', '샛별읍')
      .replace('뒤문', '뒷문')
      .split(/(\p{sc=Hangul}+)/u)
      .map((word) => {
        if (word.match(/\p{sc=Hangul}/u)) {
          const chars = [...word];
          try {
            return romanizeHangul(chars.map((char) => separateSyllable(char)));
          } catch (error) {
            console.error(error);
            return word;
          }
        } else {
          return word;
        }
      })
      .filter(Boolean)
      .join('')
  );
}
