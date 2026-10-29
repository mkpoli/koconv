import { expect, test } from 'bun:test';
import { convertWords } from '../src/hangul';

test('decomposes every precomposed syllable like NFD', () => {
  let text = '';
  for (let code = 0xac00; code <= 0xd7a3; code++) text += String.fromCharCode(code);
  const parts: string[] = [];
  convertWords(text, (syllables) => {
    for (const syllable of syllables) parts.push(syllable.join(''));
    return '';
  });
  expect(parts).toEqual([...text].map((char) => char.normalize('NFD')));
});

test('leaves non-syllable text, including bare jamo, untouched', () => {
  const convert = (text: string) => convertWords(text, (syllables) => `<${syllables.length}>`);
  expect(convert('')).toBe('');
  expect(convert('ㅋㅋ좋아 ᄀ각ᆨ 😀가')).toBe('ㅋㅋ<2> ᄀ<1>ᆨ 😀<1>');
});
