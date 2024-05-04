import { test, expect } from 'bun:test';
import { convertHangulToDPRK, convertHangulToYale, convertHangulToMC2000 } from '../src/index';

const TEST_CASES = [
  {
    hangul: '안녕하세요',
    mc2000: 'annyeonghaseyo',
    dprk: 'annyŏnghaseyo',
    yale: 'annyenghaseyyo',
  },
  {
    hangul: '반갑습니다',
    mc2000: 'bangapseumnida',
    dprk: 'pangapsŭmnida',
    yale: 'pankapsupnita',
  },
  {
    hangul: '감사합니다',
    mc2000: 'gamsahamnida',
    dprk: 'kamsahamnida',
    yale: 'kamsahapnita',
  },
  // Examples from DPRK 2012
  {
    hangul: '교구동',
    mc2000: 'gyogudong',
    dprk: 'kyogudong',
    yale: 'kyokwutong',
  },
  {
    hangul: '고비리',
    mc2000: 'gobiri',
    dprk: 'kobiri',
    yale: 'kopili',
  },
  {
    hangul: '금교',
    mc2000: 'geumgyo',
    dprk: 'kŭmgyo',
    yale: 'kumkyo',
  },
  {
    hangul: '초도',
    mc2000: 'chodo',
    dprk: 'chodo',
    yale: 'choto',
  },
  {
    hangul: '강동',
    mc2000: 'gangdong',
    dprk: 'kangdong',
    yale: 'kangtong',
  },
  {
    hangul: '칠보산',
    mc2000: 'chilbosan',
    dprk: 'chilbosan',
    yale: 'chilposan',
  },
  {
    hangul: '곡산',
    mc2000: 'goksan',
    dprk: 'koksan',
    yale: 'koksan',
  },
  {
    hangul: '갑산',
    mc2000: 'gapsan',
    dprk: 'kapsan',
    yale: 'kapsan',
  },
  {
    hangul: '앞산',
    mc2000: 'apsan',
    dprk: 'Apsan',
    yale: 'aphsan',
  },
  {
    hangul: '삿갓봉',
    mc2000: 'satgatbong',
    dprk: 'Satkatbong',
    yale: 'saskaspong',
  },
  {
    hangul: '울산',
    mc2000: 'ulsan',
    dprk: 'Ulsan',
    yale: 'wulsan',
  },
  // {
  //   hangul: '은률',
  //   dprk: 'Ŭnryul',
  // },
  {
    hangul: '닭섬',
    mc2000: 'dakseom',
    dprk: 'Taksŏm',
    yale: 'talksem',
  },
  // {
  //   hangul: '물곬',
  //   dprk: 'Mulkol', // Why not Mulgol?
  // },
  {
    hangul: '붉은바위', // 붉은 바위
    mc2000: 'bulgeunbawi',
    dprk: 'Pulgŭnbawi',
    yale: 'pulkunpawi',
  },
  {
    hangul: '앉은바위', // 앉은 바위
    mc2000: 'anjeunbawi',
    dprk: 'Anjŭnbawi',
    yale: 'ancunpawi',
  },
  {
    hangul: '백마산',
    mc2000: 'baengmasan',
    dprk: 'Paengmasan',
    yale: 'paykmasan',
  },
  {
    hangul: '꽃마을',
    mc2000: 'kkonmaeul',
    dprk: 'Kkonmaŭl',
    yale: 'kkochmaul',
  },
  {
    hangul: '압록강',
    mc2000: 'amrokgang',
    dprk: 'Amrokgang',
    yale: 'aplokkang',
  },
  {
    hangul: '천리마',
    mc2000: 'cheollima',
    dprk: 'Chŏllima',
    yale: 'chenlima',
  },
  {
    hangul: '한나산',
    mc2000: 'hallasan',
    dprk: 'Hallasan',
    yale: 'hannasan',
  },
  {
    hangul: '전라도',
    mc2000: 'jeollado',
    dprk: 'Jŏllado',
    yale: 'cenlato',
  },
  {
    hangul: '기대산',
    mc2000: 'gitdaesan',
    dprk: 'Kittaesan',
    yale: 'kistaysan', // kiqtaysan
  },
  // {
  //   hangul: '새별읍',
  //   dprk: 'Saeppŏl-ŭp', // Why not Saeppyŏl-ŭp??
  // },
  {
    hangul: '뒤문',
    mc2000: 'dwinmun',
    dprk: 'Twinmun',
    yale: 'twismun',
  },
  {
    hangul: '앞언덕',
    mc2000: 'apeondeok',
    dprk: 'Ap-ŏndŏk',
    yale: 'aphentek',
  },
  {
    hangul: '부엌안골',
    mc2000: 'bueokangol',
    dprk: 'Puŏk-angol',
    yale: 'puekhankol',
  },
  {
    hangul: '판교',
    mc2000: 'pangyo',
    dprk: 'Phan-gyo',
    yale: 'phankyo',
  },
  {
    hangul: '방어동',
    mc2000: 'bangeodong',
    dprk: 'Pang-ŏ-dong',
    yale: 'pangetong',
  },
  {
    hangul: '평안남도 평성시',
    mc2000: 'pyeongannamdo pyeongseongsi',
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
    mc2000: 'seopo',
    dprk: 'Sŏpho',
    yale: 'sepho',
  },
  {
    hangul: '찔레골',
    mc2000: 'jjillegol',
    dprk: 'JJilre-gol',
    yale: 'ccilleykol',
  },
  // Examples from Wikipedia - Romanization_of_Korean#Examples
  {
    hangul: '벽',
    mc2000: 'byeok',
    dprk: 'pyŏk',
    yale: 'pyek',
  },
  {
    hangul: '밖',
    mc2000: 'bak',
    dprk: 'pak',
    yale: 'pakk',
  },
  {
    hangul: '부엌',
    mc2000: 'bueok',
    dprk: 'puŏk',
    yale: 'puekh',
  },
  {
    hangul: '위키백과',
    mc2000: 'wikibaekgwa',
    dprk: 'wikhibaekgwa',
    yale: 'wikhipayk.kwa',
  },
  {
    hangul: '한글',
    mc2000: 'hangeul',
    dprk: "han'gŭl",
    yale: 'hānkul',
  },
  {
    hangul: '글자',
    mc2000: 'geulja',
    dprk: 'kŭlja',
    yale: 'kulca',
  },
  {
    hangul: '쉬운',
    mc2000: 'swiun',
    dprk: 'swiun',
    yale: 'swīwun',
  },
  {
    hangul: '한국은 네 계절이 뚜렷하다',
    mc2000: 'hangugeun ne gyejeori tturyeothada',
    dprk: 'Hangugŭn ne kyejŏli tturyŏthada',
    yale: 'Hānkwukun nēy kyēyceli ttwulyeshata',
  },
  {
    hangul: '원하시는 선 색깔과 굵기에 체크하시면 됩니다',
    mc2000: 'wonhasineun seon saekkkalgwa gulgie chekeuhasimyeon doemnida',
    dprk: 'Wŏnhasinŭn sŏn saekkkalgwa kulgie chekhŭhasimyŏn toimnida',
    yale: 'Wēnhasinun sen sayk.kkalkwa kwulk.kiey cheykhuhasimyen toypnita',
  },
  // Examples from https://menu.gerosyab.net/ko/romanizer
  {
    hangul: '해돋이',
    mc2000: 'haedoji',
    dprk: 'haedoji',
    yale: 'haytoti',
  },
  {
    hangul: '선릉역',
    mc2000: 'seolleungyeok',
    dprk: 'sŏllŭngyŏk',
    yale: 'senlungyek',
  },
  {
    hangul: '역량',
    mc2000: 'yeongnyang',
    dprk: 'yŏngnyang',
    yale: 'yeklyang',
  },
  {
    hangul: '굳이',
    mc2000: 'guji',
    dprk: 'kuji',
    yale: 'kwuti',
  },
  {
    hangul: '물티슈',
    mc2000: 'multisyu',
    dprk: 'multhisyu',
    yale: 'multhisyu',
  },
  {
    hangul: '티슈',
    mc2000: 'tisyu',
    dprk: 'thisyu',
    yale: 'thisyu',
  },
  {
    hangul: '박 지성',
    mc2000: 'bak jiseong',
    dprk: 'pak jisŏng',
    yale: 'pak ciseng',
  },
  {
    hangul: '김치',
    mc2000: 'gimchi',
    dprk: 'kimchi',
    yale: 'kimchi',
  },
];

test('Hangul-DPRK', () => {
  for (const { hangul, dprk } of TEST_CASES) {
    expect(convertHangulToDPRK(hangul)).toEqual(dprk.toLowerCase().replace(/[\-.']/g, ''));
  }
});

test('Hangul-MC2000', () => {
  for (const { hangul, mc2000 } of TEST_CASES) {
    expect(convertHangulToMC2000(hangul)).toEqual(
      mc2000
        .toLowerCase()
        .replace(/[\-.]/g, '')
        .normalize('NFD') // Remove macrons from vowels.
        .replace(/[\u0304]/g, '')
    );
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
