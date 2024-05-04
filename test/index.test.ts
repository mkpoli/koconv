import { test, expect } from 'bun:test';
import { convertHangulToDPRK, convertHangulToYale } from '../src/index';

const TEST_CASES = [
  {
    hangul: '안녕하세요',
    dprk: 'annyŏnghaseyo',
    yale: 'annyenghaseyyo',
  },
  {
    hangul: '반갑습니다',
    dprk: 'pangapsŭmnida',
    yale: 'pankapsupnita',
  },
  {
    hangul: '감사합니다',
    dprk: 'kamsahamnida',
    yale: 'kamsahapnita',
  },
  // Examples from DPRK 2012
  {
    hangul: '교구동',
    dprk: 'kyogudong',
    yale: 'kyokwutong',
  },
  {
    hangul: '고비리',
    dprk: 'kobiri',
    yale: 'kopili',
  },
  {
    hangul: '금교',
    dprk: 'kŭmgyo',
    yale: 'kumkyo',
  },
  {
    hangul: '초도',
    dprk: 'chodo',
    yale: 'choto',
  },
  {
    hangul: '강동',
    dprk: 'kangdong',
    yale: 'kangtong',
  },
  {
    hangul: '칠보산',
    dprk: 'chilbosan',
    yale: 'chilposan',
  },
  {
    hangul: '곡산',
    dprk: 'koksan',
    yale: 'koksan',
  },
  {
    hangul: '갑산',
    dprk: 'kapsan',
    yale: 'kapsan',
  },
  {
    hangul: '앞산',
    dprk: 'Apsan',
    yale: 'aphsan',
  },
  {
    hangul: '삿갓봉',
    dprk: 'Satkatbong',
    yale: 'saskaspong',
  },
  {
    hangul: '울산',
    dprk: 'Ulsan',
    yale: 'wulsan',
  },
  // {
  //   hangul: '은률',
  //   dprk: 'Ŭnryul',
  // },
  {
    hangul: '닭섬',
    dprk: 'Taksŏm',
    yale: 'talksem',
  },
  // {
  //   hangul: '물곬',
  //   dprk: 'Mulkol', // Why not Mulgol?
  // },
  {
    hangul: '붉은바위', // 붉은 바위
    dprk: 'Pulgŭnbawi',
    yale: 'pulkunpawi',
  },
  {
    hangul: '앉은바위', // 앉은 바위
    dprk: 'Anjŭnbawi',
    yale: 'ancunpawi',
  },
  {
    hangul: '백마산',
    dprk: 'Paengmasan',
    yale: 'paykmasan',
  },
  {
    hangul: '꽃마을',
    dprk: 'Kkonmaŭl',
    yale: 'kkochmaul',
  },
  {
    hangul: '압록강',
    dprk: 'Amrokgang',
    yale: 'aplokkang',
  },
  {
    hangul: '천리마',
    dprk: 'Chŏllima',
    yale: 'chenlima',
  },
  {
    hangul: '한나산',
    dprk: 'Hallasan',
    yale: 'hannasan',
  },
  {
    hangul: '전라도',
    dprk: 'Jŏllado',
    yale: 'cenlato',
  },
  {
    hangul: '기대산',
    dprk: 'Kittaesan',
    yale: 'kistaysan', // kiqtaysan
  },
  // {
  //   hangul: '새별읍',
  //   dprk: 'Saeppŏl-ŭp', // Why not Saeppyŏl-ŭp??
  // },
  {
    hangul: '뒤문',
    dprk: 'Twinmun',
    yale: 'twismwun',
  },
  {
    hangul: '앞언덕',
    dprk: 'Ap-ŏndŏk',
    yale: 'aphentek',
  },
  {
    hangul: '부엌안골',
    dprk: 'Puŏk-angol',
    yale: 'puekhankol',
  },
  {
    hangul: '판교',
    dprk: 'Phan-gyo',
    yale: 'phankyo',
  },
  {
    hangul: '방어동',
    dprk: 'Pang-ŏ-dong',
    yale: 'pangetong',
  },
  {
    hangul: '평안남도 평성시',
    // dprk: 'Phyŏngannam-do Phyŏngsong-si', // Probable typo in the report: o should be ŏ
    dprk: 'Phyŏngannam-do Phyŏngsŏng-si',
    yale: 'phyengannamto phyengsengsi',
  },
  // {
  //   hangul: '평양',
  //   dprk: 'Pyongyang',
  // },
  // {
  //   hangul: '서울',
  //   dprk: 'Seoul',
  // },
  {
    hangul: '서포',
    dprk: 'Sŏpho',
    yale: 'sepho',
  },
  {
    hangul: '찔레골',
    dprk: 'JJilre-gol',
    yale: 'ccilleykol',
  },
  // Examples from Wikipedia - Romanization_of_Korean#Examples
  {
    hangul: '벽',
    dprk: 'pyŏk',
    yale: 'pyek',
  },
  {
    hangul: '밖',
    dprk: 'pak',
    yale: 'pakk',
  },
  {
    hangul: '부엌',
    dprk: 'puŏk',
    yale: 'puekh',
  },
  {
    hangul: '위키백과',
    dprk: 'wikhibaekgwa',
    yale: 'wikhipayk.kwa',
  },
  {
    hangul: '한글',
    dprk: "han'gŭl",
    yale: 'hānkul',
  },
  {
    hangul: '글자',
    dprk: 'kŭlja',
    yale: 'kulca',
  },
  {
    hangul: '쉬운',
    dprk: 'swiun',
    yale: 'swīwun',
  },
  {
    hangul: '한국은 네 계절이 뚜렷하다',
    dprk: 'Hangugŭn ne kyejŏli tturyŏthada',
    yale: 'Hānkwukun nēy kyēyceli ttwulyeshata',
  },
  {
    hangul: '원하시는 선 색깔과 굵기에 체크하시면 됩니다',
    dprk: 'Wŏnhasinŭn sŏn saekkkalgwa kukkie chekhŭhasimyŏn toimnida',
    yale: 'Wēnhasinun sen sayk.kkalkwa kwulk.kiey cheykhuhasimyen toypnita',
  },
];

test('Hangul-DPRK', () => {
  for (const { hangul, dprk } of TEST_CASES) {
    expect(convertHangulToDPRK(hangul)).toEqual(dprk.toLowerCase().replace(/[\-.']/g, ''));
  }
});

test('Hangul-Yale', () => {
  for (const { hangul, yale } of TEST_CASES) {
    expect(convertHangulToYale(hangul)).toEqual(
      yale
        .toLowerCase()
        .replace(/[\-.]/g, '')
        .normalize('NFD') // Remove macrons from vowels.
        .replace(/[\u0304]/g, '')
    );
  }
});
