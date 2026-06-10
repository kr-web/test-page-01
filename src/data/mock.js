/**
 * 목업 데이터 — 데모용 가짜 데이터.
 * 조회/페이징/필터가 동작하는 것처럼 보이도록 결정론적으로 생성.
 */

export const won = (n) => n.toLocaleString('ko-KR')

const NAMES = ['김벤', '차펀치', '유일리', '하미리', '이상이', '박자정', '이기자', '정해리', '문수빈', '강도윤', '오세나', '임찬호']
const CARDS = ['삼성카드', '신한카드', 'KB국민카드', '현대카드', '롯데카드', 'BC카드', '하나카드']
const BANKS = ['신한은행', '국민은행', '농협중앙회', '기업은행', '우리은행', 'KEB하나은행']
const PRODUCTS = ['[컬리] 신선식품 외 3건', '[컬리] 샐러드 정기배송', '[뷰티컬리] 스킨케어 세트', '[컬리] 밀키트 2종', '[컬리] 생수 2L 6입']
const SIMPLE = ['카카오페이', '네이버페이', '삼성페이', 'PAYCO 결제', 'SSG페이']
const STATUS = ['승인', '매입요청', '대금지급완료', '부분취소']

function seeded(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}
const pad = (n) => String(n).padStart(2, '0')

/** 신용카드/간편결제 거래내역 행 생성 */
export function genTransactions(count = 47, kind = 'card') {
  const rnd = seeded(kind === 'card' ? 101 : 202)
  const pool = kind === 'card' ? CARDS : SIMPLE
  const rows = []
  for (let i = 0; i < count; i++) {
    const amount = Math.floor(rnd() * 480000 + 12000)
    const tax = Math.round(amount / 11)
    const supply = amount - tax
    const day = pad(((i * 3) % 28) + 1)
    const hh = pad((i * 7) % 24)
    rows.push({
      id: i + 1,
      site: '마켓컬리(조회용)',
      siteCode: 'A9BDS',
      type: i % 5 === 0 ? '에스크로' : '일반',
      approveDate: `2022-02-${day} ${hh}:${pad((i * 13) % 60)}:00`,
      cancelDate: i % 9 === 0 ? `2022-02-${day} 18:30:00` : '-',
      orderNo: `WM${5000 + i}${kind === 'card' ? 'C' : 'S'}372a7`,
      memberNo: `KP${100200 + i * 7}`,
      orderer: NAMES[i % NAMES.length],
      cardType: pool[i % pool.length],
      bank: BANKS[i % BANKS.length],
      approveNo: `${49000000 + i * 137}`,
      status: STATUS[i % STATUS.length],
      installment: i % 4 === 0 ? `${(i % 6) + 2}개월` : '일시불',
      total: amount,
      amount: amount,
      supply,
      tax,
      product: PRODUCTS[i % PRODUCTS.length],
      media: i % 2 === 0 ? 'PC-WEB' : '스마트폰',
    })
  }
  return rows
}

/** 통합 거래내역(결제수단별 집계) */
export function genIntegratedSummary() {
  return [
    { date: '2022-02-07', method: '신용카드', okCnt: 1820, okAmt: 482190000, cancelCnt: 64, cancelAmt: 18420000 },
    { date: '2022-02-07', method: '간편결제', okCnt: 1344, okAmt: 311050000, cancelCnt: 38, cancelAmt: 9120000 },
    { date: '2022-02-06', method: '신용카드', okCnt: 1655, okAmt: 451200000, cancelCnt: 51, cancelAmt: 14110000 },
    { date: '2022-02-06', method: '간편결제', okCnt: 1209, okAmt: 289430000, cancelCnt: 33, cancelAmt: 7830000 },
  ].map((r, i) => ({ ...r, id: i + 1, sumCnt: r.okCnt + r.cancelCnt, sumAmt: r.okAmt - r.cancelAmt }))
}

/** 승인내역 (정산관리) */
export function genApprovals() {
  return [
    { id: 1, site: '마켓컬리(조회용)', code: 'A9BDS', date: '2022-02-07', card: 482190000, simple: 311050000 },
    { id: 2, site: '마켓컬리(조회용)', code: 'A9BDS', date: '2022-02-06', card: 451200000, simple: 289430000 },
    { id: 3, site: '마켓컬리(조회용)', code: 'A9BDS', date: '2022-02-05', card: 433870000, simple: 276640000 },
  ].map((r) => ({ ...r, sum: r.card + r.simple }))
}

/** 정산내역 (정산관리) */
export function genSettlements() {
  return [
    { id: 1, site: '마켓컬리(조회용)', code: 'A9BDS', date: '2022-02-09', card: 466300000, simple: 301900000 },
    { id: 2, site: '마켓컬리(조회용)', code: 'A9BDS', date: '2022-02-08', card: 442100000, simple: 283500000 },
  ].map((r) => ({ ...r, sum: r.card + r.simple }))
}

/** 마감내역 (정산관리) */
export function genClosings() {
  return [
    { id: 1, site: '마켓컬리(조회용)', code: 'A9BDS', closeDate: '2022-02-08', payDate: '2022-02-10', card: 466300000, simple: 301900000 },
    { id: 2, site: '마켓컬리(조회용)', code: 'A9BDS', closeDate: '2022-02-07', payDate: '2022-02-09', card: 442100000, simple: 283500000 },
  ].map((r) => ({ ...r, sum: r.card + r.simple }))
}

/** 매출 기간별/결제수단별 */
export function genSalesByPeriod() {
  return [
    { id: 1, site: '마켓컬리(조회용)', code: 'A9BDS', date: '2022-02-07', okCnt: 3164, okAmt: 793240000, cancelCnt: 102, cancelAmt: 27540000 },
    { id: 2, site: '마켓컬리(조회용)', code: 'A9BDS', date: '2022-02-06', okCnt: 2864, okAmt: 740630000, cancelCnt: 84, cancelAmt: 21940000 },
  ].map((r) => ({ ...r, sumCnt: r.okCnt + r.cancelCnt, sumAmt: r.okAmt - r.cancelAmt }))
}
export function genSalesByMethod() {
  return [
    { id: 1, site: '마켓컬리(조회용)', code: 'A9BDS', date: '2022-02-07', method: '신용카드', okCnt: 1820, okAmt: 482190000, cancelCnt: 64, cancelAmt: 18420000 },
    { id: 2, site: '마켓컬리(조회용)', code: 'A9BDS', date: '2022-02-07', method: '간편결제', okCnt: 1344, okAmt: 311050000, cancelCnt: 38, cancelAmt: 9120000 },
  ].map((r) => ({ ...r, sumCnt: r.okCnt + r.cancelCnt, sumAmt: r.okAmt - r.cancelAmt }))
}

/** 회원 매출통계 (p.46) */
export function genMemberSales() {
  return [
    { id: 1, date: '2022-02-07', total: 1100000000, card: 700000000, simple: 400000000 },
  ]
}
/** 회원 가입/탈퇴통계 (p.47) */
export function genMemberJoinStats() {
  return [
    { id: 1, date: '2022-02-07', total: 2960, join: 2730, withdraw: 230 },
  ]
}

/** 가맹점 통계 (p.55) */
export function genMerchantStats() {
  return [
    { id: 1, date: '2022-02-07', merchantId: 'parms', total: 1230000, card: 1000000, simple: 500000, sum: 1500000 },
  ]
}

/** 다운로드 관리 (p.56) */
export function genDownloads() {
  const menus = ['전체 거래내역', '신용카드 거래내역', '간편결제 거래내역', '정산내역', '마감내역']
  const states = ['다운로드 진행중', '다운로드 완료', '다운로드 완료', '다운로드 완료']
  const rows = []
  for (let i = 0; i < 24; i++) {
    const no = 100 - i
    const done = i !== 0
    rows.push({
      id: no,
      reqAt: `2022-02-07 ${pad(11 + (i % 6))}:${pad((i * 7) % 60)}:00`,
      menu: menus[i % menus.length],
      state: states[i % states.length],
      file: `전체거래내역_220207_220207_.${pad((i % 9) + 1)}.csv`,
      lastAt: done ? `2022-02-07 14:${pad((i * 3) % 60)}:13` : '',
      count: done ? (i % 3) + 1 : 0,
    })
  }
  return rows
}

/** 계정관리 사용자 목록 (p.57) */
export function genAccounts() {
  const groups = ['FA 관리자, Master', 'FA 일반', '개발팀 관리자', '개발팀 일반', '마케팅 일반']
  const channels = ['Slack , e-mail', 'Slack', 'Slack , e-mail', 'Slack']
  const rows = []
  for (let i = 0; i < 22; i++) {
    const no = 100 - i
    rows.push({
      id: no,
      userId: ['asdf123', 'fdsa321', 'qwer5', 'zxxcv4', 'lkjh7', 'ldkgh6', 'mnbd5'][i % 7] + (i > 6 ? i : ''),
      name: NAMES[i % NAMES.length],
      group: groups[i % groups.length],
      alarm: i % 3 === 0 ? 'Y' : 'N',
      channel: channels[i % channels.length],
      email: `${['asdf', 'sdfasdf', 'asdfgdf', 'adgsdf', 'hdgsdf', 'gsdf'][i % 6]}@kurlycorp.com`,
      regDate: '2022-02-07',
      expireDate: i === 0 ? '9999-12-31' : '2023-02-06',
      lockDate: i === 0 ? '2021-08-30' : '-',
    })
  }
  return rows
}

/** 권한그룹 목록 (p.64) */
export function genRoles() {
  return [
    { id: 1, name: '마스터', users: '1명', closeAuth: '최종 마감권한', regAt: '2021-07-01 09:00', expireAt: '2999-12-31 23:59', regBy: '홍길동', use: 'Y' },
    { id: 2, name: 'FA팀 관리', users: '5명', closeAuth: '1차 마감권한', regAt: '2021-07-01 09:00', expireAt: '2999-12-31 23:59', regBy: '홍길동', use: 'Y' },
    { id: 3, name: 'FA팀 일반', users: '14명', closeAuth: '1차 마감권한', regAt: '2021-07-01 09:00', expireAt: '2999-12-31 23:59', regBy: '홍길동', use: 'Y' },
    { id: 4, name: '개발팀 관리', users: '5명', closeAuth: '미부여', regAt: '2021-07-01 09:00', expireAt: '2999-12-31 23:59', regBy: '홍길동', use: 'Y' },
    { id: 5, name: '마케팅 일반', users: '14명', closeAuth: '미부여', regAt: '2021-07-01 09:00', expireAt: '2999-12-31 23:59', regBy: '홍길동', use: 'N' },
  ]
}

/** 공통코드 목록 (p.66) */
export function genCommonCodes() {
  const base = ['TRANSACTION_TYPE_CODE', 'PAYMENT_KIND_CODE', 'DELIVERY_TYPE_CODE', 'CENTER_CODE', 'TAX_TYPE']
  const cnt = [4, 4, 2, 2, 3]
  const rows = []
  for (let i = 0; i < 20; i++) {
    rows.push({
      id: i + 1,
      group: base[i % base.length],
      desc: 'Text contents text contents text contents',
      codeCount: cnt[i % cnt.length],
      updatedAt: `2021-06-${pad(10 + Math.floor(i / 5))} ${pad(10 + (i % 5))}:00:00`,
    })
  }
  return rows
}

/** 공휴일 목록 (p.69) */
export function genHolidays() {
  return [
    { id: 1, date: '2021-08-16', name: '대체공휴일', type: '대체공휴일' },
    { id: 2, date: '2021-05-05', name: '어린이날', type: '지정공휴일' },
    { id: 3, date: '2021-05-19', name: '부처님오신날', type: '지정공휴일' },
    { id: 4, date: '2021-03-01', name: '삼일절', type: '지정공휴일' },
    { id: 5, date: '2021-09-20', name: '추석연휴', type: '지정공휴일' },
    { id: 6, date: '2021-09-21', name: '추석연휴', type: '지정공휴일' },
    { id: 7, date: '2021-09-22', name: '추석연휴', type: '지정공휴일' },
    { id: 8, date: '2021-10-04', name: '대체공휴일', type: '대체공휴일' },
  ].map((r) => ({ ...r, createdAt: '2022-01-01 00:00:00', updatedAt: '2022-01-01 00:00:00', editor: '나으뜸' }))
}

/** 회원 가입/탈퇴 조회 (p.44) */
export function genMembers() {
  const rows = []
  for (let i = 0; i < 18; i++) {
    rows.push({
      id: i + 1,
      memberNo: `KP${300100 + i * 11}`,
      joinDate: `2022-01-${pad((i % 28) + 1)}`,
      withdrawDate: i % 5 === 0 ? `2022-02-${pad((i % 27) + 1)}` : '-',
      payAuth: i % 2 === 0 ? 'Y' : 'N',
      fingerAuth: i % 3 === 0 ? 'Y' : 'N',
      card: (i % 4) + 1,
      simple: i % 3,
    })
  }
  return rows
}

/** 가맹점 등록/조회 (p.48) */
export function genMerchants() {
  const rows = []
  for (let i = 0; i < 12; i++) {
    rows.push({
      id: `MCH${pad(i + 1)}`,
      contractDate: `2021-${pad((i % 12) + 1)}-15`,
      company: ['이커머스영업팀 테스트', '컬리물류', '뷰티컬리', '컬리넥스트마일'][i % 4],
      type: i % 2 === 0 ? '법인사업자' : '개인사업자',
      bizNo: `11385${pad(21000 + i)}`,
      ceo: NAMES[i % NAMES.length],
      cycle: ['월 1회', '주 1회 정산', '15일 정산'][i % 3],
      bank: BANKS[i % BANKS.length],
      account: `11111111${pad(i)}`,
      manager: NAMES[(i + 3) % NAMES.length],
      managerTel: '070-7595-1111',
      email: 'kcp@kcp.co.kr',
    })
  }
  return rows
}

/** 가맹점 계약조회 (p.51) */
export function genMerchantContracts() {
  const rows = []
  for (let i = 0; i < 9; i++) {
    rows.push({
      id: `MCH${pad(i + 1)}`,
      contractDate: `2021-${pad((i % 12) + 1)}-15`,
      expireDate: `2024-${pad((i % 12) + 1)}-14`,
      company: ['이커머스영업팀 테스트', '컬리물류', '뷰티컬리'][i % 3],
      fee: ['3.4%', '2.12%', '1.87%'][i % 3],
      cycle: ['월 1회', '주 1회 정산', '15일 정산'][i % 3],
    })
  }
  return rows
}
