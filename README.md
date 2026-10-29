# koconv

> [!WARNING]
> 
> The conversion will never be perfect. Please double-check the result.
> 
> Be careful with spacing, dotting and special spelling rules.

A simple library to convert Korean text between Hangul and its transcription/transliteration into various other scripts.

A web application version is available at [korean.mkpo.li](https://korean.mkpo.li).

## Transcription/Transliteration Systems

### Currently Supported
For now only from Hangul to the following systems are supported.
- Yale Romanization of Korean (1942)
- The Romanization of Korean (DPRK, 1992 - 2002 - 2012)
- Revised Romanization of Korean (Ministry of Culture, 2000)

### Planned
- McCune–Reischauer (1939)
- Pronounciation Respelling (한글 발음 표기법)
- Kontsevich Cyrillization (Система Концевича)
- Braille

The reverse conversion is planned to be implemented as well.

### Not Planned
The following systems are not planned to be supported, but is welcome to be contributed.

- ALA-LC
- Bok Moon Kim romanization
- ISO/TR 11941
- Kholodovich Cyrillization (Система Холодовича)
- SKATS
- Linear Hangul

## References

### Inspired by

- Yoshihiko Asao (2013) [Hangul to Yale Romanization Converter](https://asaokitan.net/tools/hangul2yale/) (Github Repository: [asaokitan/hangul2yale](https://github.com/asaokitan/hangul2yale))
- Seongmin Mun (2019) [Yale-romanization-of-Korean](https://github.com/seongmin-mun/Yale-romanization-of-Korean)
- graphemecluster (2024) [Hangul to NK Romaja Converter](https://graphemecluster.github.io/hangul_to_nk_romaja_converter)
- graphemecluster (2024) [Hangul to IPA Converter](https://graphemecluster.github.io/hangul_to_ipa_converter)
- SnuMenu [Hangul(Korean) Romanization Tool (한글-로마자 변환기)](https://menu.gerosyab.net/ko/romanizer)
- Wiktionary contributors (2024) [모듈:ko-pron](https://ko.wiktionary.org/wiki/%EB%AA%A8%EB%93%88:ko-pron)

### Romanization Systems

- Wikipedia contributors. (2024, May 4). [Romanization of Korean](https://en.wikipedia.org/wiki/Romanization_of_Korean). In Wikipedia, The Free Encyclopedia. Retrieved 2024-05-04.

#### DPRK

- *Working Paper No. 46*. [WRITING SYSTEMS AND GUIDES TO PRONUNCIATION: ROMANIZATION <u>Guideline on the Romanization of Korean</u>](https://unstats.un.org/Unsd/geoinfo/UNGEGN/docs/6th-uncsgn-docs/WP/6th_uncsgn_WP46.pdf).  Submitted by the Democratic People’s Republic of Korea. Sixth United Nations Conference on the Standardization of Geographical Names. New York, 25th August-3 September, 1992. Agenda Item 11 (a). UNGEGN. Retrieved 2024-05-04.
- E/CONF.94/INF.78. [WRITING SYSTEMS: ROMANIZATION Guideline for The Romanization of Korean](https://unstats.un.org/unsd/geoinfo/UNGEGN/docs/8th-uncsgn-docs/inf/8th_UNCSGN_econf.94_INF.72.pdf). Submitted by the Democratic People’s Republic of Korea. Eighth United Nations Conference on the Standardization of Geographical Names. Berlin, 27 August-5 September 2002. UNGEGN. Item 16 (a) of the provisionalagenda. Retrieved 2024-05-04.
- E/CONF.101/CRP15 [**Writing systems and pronunciation:
Romanization** The Rules of Latin Alphabetic Transcription of Korean Language](https://unstats.un.org/unsd/geoinfo/ungegn/docs/10th-uncsgn-docs/crp/E_Conf.101_CRP15_Rules%20of%20Latin%20Alphabetic%20Transcription%20of%20Korean.pdf). Submitted by the Democratic People’s Republic of Korea. Tenth United Nations Conference on the Standardization of Geographical Names. New York, 31 July-9 August 2012. UNGEGN. Item 13(a) of the provisional agenda. Retrieved 2024-05-04.

#### Revised Romanization of Korean
- 문화관광부 (2000). 국어의 로마자 표기법 (문화관광부 고시 제2000-8호). Text and examples as published by the National Institute of Korean Language: [제1장](https://korean.go.kr/front/page/pageView.do?page_id=P000148&mn_id=99), [제2장](https://korean.go.kr/front/page/pageView.do?page_id=P000149&mn_id=99), [제3장](https://korean.go.kr/front/page/pageView.do?page_id=P000150&mn_id=99). Retrieved 2026-10-30. The pages give no revision date.
- 국립국어원 (1988). 표준 발음법 (표준어 규정 제2부). The sound changes the converter applies; its article numbers are cited in `src/phonology.ts`.
- Wikipedia contributors. [Revised Romanization of Korean](https://en.wikipedia.org/w/index.php?title=Revised_Romanization_of_Korean&oldid=1382445815). In Wikipedia, The Free Encyclopedia. Revision 1382445815 (2026-10-28). Retrieved 2026-10-30.

#### Yale
- Samuel E. Martin (1992). *A Reference Grammar of Korean*. Rutland, Vermont & Tokyo: Charles E. Tuttle. pp. 8–9. Cited through the Wikipedia article below; not consulted directly.
- Wikipedia contributors. [Yale romanization of Korean](https://en.wikipedia.org/w/index.php?title=Yale_romanization_of_Korean&oldid=1358691122). In Wikipedia, The Free Encyclopedia. Revision 1358691122 (2026-06-10). Retrieved 2026-10-30. Letter values, the labial abbreviation and the period.

## Development

```sh
bun install
bun run check   # type-check
bun test
bun run build   # writes dist/
```

### Releasing

1. Bump `version` in `package.json` on `main`.
2. Push a tag `v<version>`. The `Release` workflow checks that the tag matches `package.json`, publishes to npm with provenance through npm trusted publishing, and creates a GitHub release.
