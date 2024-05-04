import { separateSyllable } from '../syllable';

const onsetMapping: Record<string, string> = {
  ᄀ: 'g',
  ᄁ: 'kk',
  ᄂ: 'n',
  ᄃ: 'd',
  ᄄ: 'tt',
  ᄅ: 'r',
  ᄆ: 'm',
  ᄇ: 'b',
  ᄈ: 'pp',
  ᄉ: 's',
  ᄊ: 'ss',
  ᄋ: '',
  ᄌ: 'j',
  ᄍ: 'jj',
  ᄎ: 'ch',
  ᄏ: 'k',
  ᄐ: 't',
  ᄑ: 'p',
  ᄒ: 'h',
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

const codaMapping: Record<string, string> = {
  '': '',
  ᆨ: 'k',
  ᆩ: 'k',
  ᆪ: 'ks',
  ᆫ: 'n',
  ᆬ: 'nc',
  ᆭ: 'nh',
  ᆮ: 't',
  ᆯ: 'l',
  ᆰ: 'k',
  ᆱ: 'm',
  ᆲ: 'l',
  ᆳ: 'l',
  ᆴ: 'l',
  ᆵ: 'l',
  ᆶ: 'l',
  ᆷ: 'm',
  ᆸ: 'p',
  ᆹ: 'ps',
  ᆺ: 't',
  ᆻ: 'ss',
  ᆼ: 'ng',
  ᆽ: 't',
  ᆾ: 't',
  ᆿ: 'k',
  ᇀ: 't',
  ᇁ: 'p',
  ᇂ: 'h',
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
  ['ᆯᄅ', 'll'],
  ['ᆯᄇ', 'lb'],
  ['ᆯᄌ', 'lj'],
  ['ᆯᄋ', 'r'],
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
 * Converts a Hangul string into Ministry of Culture 2000 romanization.
 *
 * Revised Romanization of Korean, also known as the
 * Ministry of Culture and Tourism's romanization 2000
 * version of the Korean language is the official system
 * of South Korea, developed by the National Academy of
 * the Korean Language since 1995.
 *
 * @param hangul A string containing Hangul characters.
 */
export function convertHangulToMC2000(hangul: string): string {
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
