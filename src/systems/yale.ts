import { separateSyllable } from '../syllable';

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
  // ᄌ: 'ch',
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
  ᅰ: 'we',
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
  ᆴ: 'lt',
  ᆵ: 'lp',
  ᆶ: 'lh',
  ᆷ: 'm',
  ᆸ: 'p',
  ᆹ: 'ps',
  // ᆺ: 's',
  ᆺ: 's',
  // ᆻ: 'ss',
  ᆻ: 'ss',
  ᆼ: 'ng',
  ᆽ: 't',
  ᆾ: 'ch',
  ᆿ: 'kh',
  ᇀ: 'th',
  ᇁ: 'ph',
  // ᇂ: 'h'
  ᇂ: 'h',
};

const HangulSoundRules = new Map<string, string>([
  ['ᆮᄋ', 't'],
  ['ᆮᄂ', 'nn'],
  ['ᆮᄅ', 'nn'],
  ['ᆮᄆ', 'nm'],
  ['ᆮᄉ', 'ss'],
  ['ᆸᄋ', 'b'],
  ['ᆹᄋ', 'ps'],
  ['ᆺᄋ', 'ss'],
  ['ᆻᄋ', 'ss'],
  ['ᆬᄋ', 'nc'],
  ['ᆭᄋ', 'nh'],
  ['ᆰᄋ', 'lk'],
  ['ᆱᄋ', 'lm'],
  ['ᆲᄋ', 'lp'],
  ['ᆳᄋ', 'ls'],
  ['ᆴᄋ', 'th'],
  ['ᆵᄋ', 'lph'],
  ['ᆶᄋ', 'r'],
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
      let romanNucleus = nucleusMapping[nucleus];
      let romanCoda = codaMapping[coda] ?? '';

      // Adjust for voicing of the onset when it follows a voiced sound
      if (index > 0 && romanNucleus) {
        // const previousCoda = hangulParts[index - 1][2];
        // if (codaMapping[previousCoda] === '') {/*
        //   if (onset === 'ᄀ') romanOnset = 'g';
        //   else if (onset === 'ᄃ') romanOnset = 'd';
        //   else if (onset === 'ᄇ') romanOnset = 'b';
        // } */
      }

      // pwu -> pu, phwu -> phu, etc.
      if (['p', 'ph', 'pp', 'm'].includes(romanOnset) && romanNucleus.startsWith('w')) {
        romanNucleus = romanNucleus.slice(1);
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
    .join('');
}

/**
 * Converts a Hangul string into Yale romanization.
 *
 * The transcription is based on the Yale University system
 * originally by Samuel Elmo Martin and his colleagues,
 * which is widely used in Korean linguistics.
 *
 * @param hangul A string containing Hangul characters.
 */
export function convertHangulToYale(hangul: string): string {
  return (
    hangul
      // Preprocessing for special cases of preservative spelling of north korean
      //   1. -nr- -> -ll-
      // .replace('한나산', '한라산')
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
