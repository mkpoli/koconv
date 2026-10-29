import { expect, test } from 'bun:test';
import { convertHangulToMC2000 } from '../src/index';

// Examples from 국어의 로마자 표기법 (문화관광부 고시 제2000-8호), as published
// by the National Institute of Korean Language. Capitals are lowered and
// hyphens dropped: the converter does not know proper nouns.
const EXAMPLES: [string, string][] = [
  // 제2장 제1항
  ['광희문', 'Gwanghuimun'],
  // 제2장 제2항 붙임 1, 2
  ['구미', 'Gumi'],
  ['영동', 'Yeongdong'],
  ['백암', 'Baegam'],
  ['옥천', 'Okcheon'],
  ['합덕', 'Hapdeok'],
  ['호법', 'Hobeop'],
  ['월곶', 'Wolgot'],
  ['벚꽃', 'beotkkot'],
  ['한밭', 'Hanbat'],
  ['구리', 'Guri'],
  ['설악', 'Seorak'],
  ['칠곡', 'Chilgok'],
  ['임실', 'Imsil'],
  ['울릉', 'Ulleung'],
  ['대관령', 'Daegwallyeong'],
  // 제3장 제1항 1: assimilation
  ['백마', 'Baengma'],
  ['종로', 'Jongno'],
  ['왕십리', 'Wangsimni'],
  ['별내', 'Byeollae'],
  ['신라', 'Silla'],
  // 3: palatalization
  ['해돋이', 'haedoji'],
  ['같이', 'gachi'],
  ['굳히다', 'guchida'],
  // 4: aspiration, and ㅎ kept after ㄱ, ㄷ, ㅂ in nouns
  ['좋고', 'joko'],
  ['놓다', 'nota'],
  ['낳지', 'nachi'],
  ['묵호', 'Mukho'],
  ['집현전', 'Jiphyeonjeon'],
  // 붙임: tensing is not written
  ['압구정', 'Apgujeong'],
  ['낙동강', 'Nakdonggang'],
  ['죽변', 'Jukbyeon'],
  ['낙성대', 'Nakseongdae'],
  ['합정', 'Hapjeong'],
  ['팔당', 'Paldang'],
  ['샛별', 'saetbyeol'],
  ['울산', 'Ulsan'],
  // 제2항, without the optional hyphen
  ['중앙', 'Jungang'],
  ['반구대', 'Bangudae'],
  ['세운', 'Seun'],
  ['해운대', 'Haeundae'],
  // 제6항
  ['남산', 'Namsan'],
  ['속리산', 'Songnisan'],
  ['금강', 'Geumgang'],
  ['독도', 'Dokdo'],
  ['경복궁', 'Gyeongbokgung'],
  ['무량수전', 'Muryangsujeon'],
  ['연화교', 'Yeonhwagyo'],
  ['극락전', 'Geungnakjeon'],
  ['안압지', 'Anapji'],
  ['남한산성', 'Namhansanseong'],
  ['화랑대', 'Hwarangdae'],
  ['불국사', 'Bulguksa'],
  ['현충사', 'Hyeonchungsa'],
  ['독립문', 'Dongnimmun'],
  ['오죽헌', 'Ojukheon'],
  ['촉석루', 'Chokseongnu'],
  ['종묘', 'Jongmyo'],
  ['다보탑', 'Dabotap'],
];

test.each(EXAMPLES)('%s → %s', (hangul, romanized) => {
  expect(convertHangulToMC2000(hangul)).toBe(romanized.toLowerCase());
});

// Further sound changes from the Standard Pronunciation (표준 발음법).
test.each([
  ['닭', 'dak'],
  ['값', 'gap'],
  ['넋이', 'neoksi'],
  ['앉다', 'anda'],
  ['맑게', 'malge'],
  ['밟는', 'bamneun'],
  ['여덟', 'yeodeol'],
  ['않아', 'ana'],
  ['싫어', 'sireo'],
  ['뚫는', 'ttulleun'],
  ['놓는', 'nonneun'],
  ['밝히다', 'balkida'],
  ['디자인', 'dijain'],
  ['꽃향기', 'kkothyanggi'],
  ['낮하고', 'nathago'],
  ['맞히다', 'machida'],
  ['닭고기', 'dakgogi'],
  ['흙과', 'heukgwa'],
  ['넓죽하다', 'neopjukhada'],
  ['넓둥글다', 'neopdunggeulda'],
  ['넓다', 'neolda'],
  ['디귿이', 'digeusi'],
  ['피읖이', 'pieubi'],
  ['히읗이', 'hieusi'],
  ['키읔이', 'kieugi'],
  ['닫혀', 'dachyeo'],
])('%s → %s', (hangul, romanized) => {
  expect(convertHangulToMC2000(hangul)).toBe(romanized);
});

// These depend on meaning, which spelling alone does not show.
test.todo('신문로 → Sinmunno (ㄴㄹ read as ㄴㄴ in this compound)');
test.todo('학여울 → Hangnyeoul, 알약 → allyak, 꽃잎 → kkonnip (ㄴ insertion)');
test.todo('겉옷 → geodot, 맛없다 → madeopda (neutralization before a second element)');
test.todo('잡혀 → japyeo (aspiration in a verb, against the noun rule)');
