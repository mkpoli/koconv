import { test, expect } from 'bun:test';
import { convertHangulToDPRK } from '../src/index';

const TEST_CASES = [
  {
    hangul: '안녕하세요',
    dprk: 'annyŏnghaseyo',
  },
  {
    hangul: '반갑습니다',
    dprk: 'pangapsŭmnida',
  },
  {
    hangul: '감사합니다',
    dprk: 'kamsahamnida',
  },
  // Examples from DPRK 2012
  {
    hangul: '교구동',
    dprk: 'kyogudong',
  },
  {
    hangul: '고비리',
    dprk: 'kobiri',
  },
  {
    hangul: '금교',
    dprk: 'kŭmgyo',
  },
  {
    hangul: '초도',
    dprk: 'chodo',
  },
  {
    hangul: '강동',
    dprk: 'kangdong',
  },
  {
    hangul: '칠보산',
    dprk: 'chilbosan',
  },
  {
    hangul: '곡산',
    dprk: 'koksan',
  },
  {
    hangul: '갑산',
    dprk: 'kapsan',
  },
  {
    hangul: '앞산',
    dprk: 'Apsan',
  },
  {
    hangul: '삿갓봉',
    dprk: 'Satkatbong',
  },
  {
    hangul: '울산',
    dprk: 'Ulsan',
  },
  // {
  //   hangul: '은률',
  //   dprk: 'Ŭnryul',
  // },
  {
    hangul: '닭섬',
    dprk: 'Taksŏm',
  },
  // {
  //   hangul: '물곬',
  //   dprk: 'Mulkol', // Why not Mulgol?
  // },
  {
    hangul: '붉은바위', // 붉은 바위
    dprk: 'Pulgŭnbawi',
  },
  {
    hangul: '앉은바위', // 앉은 바위
    dprk: 'Anjŭnbawi',
  },
  {
    hangul: '백마산',
    dprk: 'Paengmasan',
  },
  {
    hangul: '꽃마을',
    dprk: 'Kkonmaŭl',
  },
  {
    hangul: '압록강',
    dprk: 'Amrokgang',
  },
  {
    hangul: '천리마',
    dprk: 'Chŏllima',
  },
  {
    hangul: '한나산',
    dprk: 'Hallasan',
  },
  {
    hangul: '전라도',
    dprk: 'Jŏllado',
  },
  {
    hangul: '기대산',
    dprk: 'Kittaesan',
  },
  // {
  //   hangul: '새별읍',
  //   dprk: 'Saeppŏl-ŭp', // Why not Saeppyŏl-ŭp??
  // },
  {
    hangul: '뒤문',
    dprk: 'Twinmun',
  },
  {
    hangul: '앞언덕',
    dprk: 'Ap-ŏndŏk',
  },
  {
    hangul: '부엌안골',
    dprk: 'Puŏk-angol',
  },
  {
    hangul: '판교',
    dprk: 'Phan-gyo',
  },
  {
    hangul: '방어동',
    dprk: 'Pang-ŏ-dong',
  },
  {
    hangul: '평안남도 평성시',
    // dprk: 'Phyŏngannam-do Phyŏngsong-si', // Probable typo in the report: o should be ŏ
    dprk: 'Phyŏngannam-do Phyŏngsŏng-si',
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
  },
  {
    hangul: '찔레골',
    dprk: 'JJilre-gol',
  },
];

test('Hangul-DPRK', () => {
  for (const { hangul, dprk } of TEST_CASES) {
    expect(convertHangulToDPRK(hangul)).toEqual(dprk.toLowerCase().replace(/-/g, ''));
  }
});
