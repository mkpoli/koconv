import { expect, test } from 'bun:test';
import { convertHangulToMR } from '../src/index';

// Examples for the original McCune–Reischauer system from English Wikipedia
// ("McCune–Reischauer", revision 1373018240), and from the Library of
// Congress ALA-LC Korean table (2009, updated 2025) where ALA-LC and MR
// agree. Capitals are lowered: the converter does not know proper nouns.
const EXAMPLES: [string, string][] = [
  // Voicing
  ['가구', 'kagu'],
  ['등대', 'tŭngdae'],
  ['반복', 'panbok'],
  ['주장', 'chujang'],
  ['아주', 'aju'],
  ['대궐', 'taegwŏl'],
  ['전등', 'chŏndŭng'],
  ['물방아', 'mulbanga'],
  ['환자', 'hwanja'],
  ['물건', 'mulgŏn'],
  ['무당', 'mudang'],
  ['만두', 'mandu'],
  ['갈비', 'kalbi'],
  ['합동', 'haptong'],
  ['합계', 'hapkye'],
  ['접시', 'chŏpsi'],
  // Finals moving to a vowel, palatalization
  ['독일', 'Togil'],
  ['낟알', 'nadal'],
  ['촬영', "ch'waryŏng"],
  ['답안', 'taban'],
  ['웃어라', 'usŏra'],
  ['낮은', 'najŭn'],
  ['웃음', 'usŭm'],
  ['미닫이', 'midaji'],
  ['같이', "kach'i"],
  ['훑이다', "hulch'ida"],
  ['앉아', 'anja'],
  ['읊어', "ŭlp'ŏ"],
  ['찾아', "ch'aja"],
  // Assimilation
  ['독립', 'tongnip'],
  ['국민', 'kungmin'],
  ['섭리', 'sŏmni'],
  ['잡무', 'chammu'],
  ['빛낸', 'pinnaen'],
  ['콧날', "k'onnal"],
  ['종로', 'Chongno'],
  ['목란', 'mongnan'],
  ['달님', 'tallim'],
  ['진리', 'chilli'],
  ['빨리', 'ppalli'],
  // Finals before consonants and at the end
  ['곧', 'kot'],
  ['장미꽃', 'changmikkot'],
  ['찾다', "ch'atta"],
  ['맑게', 'malke'],
  ['밟는', 'pamnŭn'],
  ['밟다', 'papta'],
  ['넓다', 'nŏlta'],
  ['핥다', 'halta'],
  ['값진', 'kapchin'],
  ['읊다', 'ŭpta'],
  ['있는', 'innŭn'],
  ['있고', 'itko'],
  ['곳간', 'kotkan'],
  ['햇볕', 'haetpyŏt'],
  ['히읗', 'hiŭt'],
  // ㅎ
  ['속히', 'sokhi'],
  ['못하다', 'mothada'],
  ['곱하기', 'kophagi'],
  ['북한', 'Pukhan'],
  ['국학', 'kukhak'],
  ['앉히다', "anch'ida"],
  ['굳히다', "kuch'ida"],
  ['맞히다', "mach'ida"],
  ['닫힌', "tach'in"],
  // ㅎ merging into a stop is written kh, th, ph; ALA-LC writes lk', lp' here.
  ['밝히는', 'palkhinŭn'],
  ['넓히다', 'nŏlphida'],
  ['좋다', "chot'a"],
  ['어떻게', "ŏttŏk'e"],
  ['많던', "mant'ŏn"],
  ['닳지', "talch'i"],
  ['끓고', "kkŭlk'o"],
  ['많네', 'manne'],
  ['쌓는', 'ssannŭn'],
  ['뚫는', 'ttullŭn'],
  ['낳은', 'naŭn'],
  ['많이', 'mani'],
  ['싫어도', 'sirŏdo'],
  ['발해', 'Parhae'],
  // Apostrophe, ë, sh
  ['연구', "yŏn'gu"],
  ['영어', 'yŏngŏ'],
  ['마찬가지', "mach'an'gaji"],
  ['투표', "t'up'yo"],
  ['편지', "p'yŏnji"],
  ['주체', "Chuch'e"],
  ['안쪽', 'antchok'],
  ['회사에서', 'hoesaësŏ'],
  ['차고에', "ch'agoë"],
  ['시장', 'sijang'],
  ['쉽다', 'shwipta'],
  ['화서문', 'Hwasŏmun'],
  ['청주', "Ch'ŏngju"],
  ['김치', "kimch'i"],
];

test.each(EXAMPLES)('%s → %s', (hangul, romanized) => {
  expect(convertHangulToMR(hangul)).toBe(romanized.toLowerCase());
});

// These depend on meaning, which spelling alone does not show.
test.todo('태권도 → t\'aekwŏndo, 손등 → sontŭng, 한자 → hancha, 물방울 → mulpangul (tensing inside a word)');
test.todo('웃어른 → udŏrŭn, 값어치 → kabŏch\'i (neutralization before a second element)');
