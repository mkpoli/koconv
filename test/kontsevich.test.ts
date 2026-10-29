import { expect, test } from 'bun:test';
import { convertHangulToKontsevich } from '../src/index';

// Examples from ru.wikipedia "Система Концевича" (revision 154552527) and
// en.wikipedia "Cyrillization of Korean" (revision 1359438695). Capitals
// are lowered and spaces between name parts dropped.
const EXAMPLES: [string, string][] = [
  // en: Cyrillization of Korean § Examples
  ['벽', 'пёк'],
  ['벽에', 'пёге'],
  ['밖', 'пак'],
  ['밖에', 'пакке'],
  ['부엌', 'пуок'],
  ['부엌에', 'пуокхе'],
  ['위키백과', 'викхибэкква'],
  ['한글', 'хангыль'],
  ['쉬운', 'свиун'],
  ['사계절이', 'сагеджори'],
  ['뚜렷하다', 'ттурётхада'],
  ['원하시는', 'вонхасинын'],
  // The en example has кульккие; the ru table's ㄺ row writes the ㄱ single.
  ['굵기에', 'кулькие'],
  ['체크하시면', 'чхекхыхасимён'],
  ['됩니다', 'твемнида'],
  ['대한민국', 'тэханмингук'],
  ['조선', 'чосон'],
  ['민주주의', 'минджуджуый'],
  ['인민', 'инмин'],
  ['공화국', 'конхвагук'],
  // ru: word-initial ㅕ, ㅛ, ㅖ
  ['요성산', 'Йосонсан'],
  ['용인', 'Йонъин'],
  ['여주', 'Йоджу'],
  ['연평도', 'Йонпхёндо'],
  ['예산', 'Йесан'],
  ['예천', 'Йечхон'],
  // ru: geographical names
  ['한강', 'Ханган'],
  ['백두산', 'Пэктусан'],
  ['제주도', 'Чеджудо'],
  ['평안도', 'Пхёнандо'],
  ['광안동', 'Кванандон'],
  ['연화리', 'Йонхвари'],
  ['김해', 'Кимхэ'],
  ['평창', 'Пхёнчхан'],
  ['수영', 'Суён'],
  ['철마', 'Чхольма'],
  ['동면', 'Тонмён'],
  ['북구', 'Пукку'],
  ['종로', 'Чонно'],
  // ru: personal names, one part at a time
  ['정철', 'Чончхоль'],
  ['사공', 'Сагон'],
  // ru junction table: ㄷ, ㅈ after ㄹ
  ['철도', 'чхольто'],
  ['발전', 'пальчон'],
  // ru junction table: a tensed onset after a two-letter final is single
  ['앉고', 'анко'],
  ['넓다', 'нольта'],
  ['곬이', 'кольси'],
];

test.each(EXAMPLES)('%s → %s', (hangul, cyrillic) => {
  expect(convertHangulToKontsevich(hangul)).toBe(cyrillic.toLowerCase());
});

// These depend on meaning, which spelling alone does not show.
test.todo('한자 → ханчча, 글자 → кыльчча (tensing inside a word)');
