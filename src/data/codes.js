/**
 * 공통 선택 항목 (화면설계서 p.20 카드/은행/간편결제 목록 등)
 */
export const SITE_CODES = [
  { value: 'A9BDS', label: '[A9BDS] 마켓컬리(조회용)' },
]

export const PAY_METHODS = [
  { value: 'ALL', label: '전체' },
  { value: 'CARD', label: '신용카드' },
  { value: 'SIMPLE', label: '간편결제' },
]

export const CURRENCY = [
  { value: 'KRW', label: '원화' },
  { value: 'USD', label: '달러' },
  { value: 'JPY', label: '엔화' },
  { value: 'ALL', label: '전체' },
]

export const TRANSACTION_TYPE = [
  { value: 'ALL', label: '전체' },
  { value: 'NORMAL', label: '일반' },
  { value: 'ESCROW', label: '에스크로' },
]

export const FINAL_PAY_STATUS = ['전체', '승인', '취소', '부분취소']

export const TRADE_STATUS = [
  '전체', '승인', '매입요청', '매입전취소', '매입후취소',
  '대금지급완료', '정산대금환수', '부분취소',
]

// p.20 카드승인사
export const CARD_APPROVERS = [
  '전체', '롯데아멕스카드', 'BC카드', '축협카드', '제주은행', '씨티카드', '현대카드',
  '한미카드', '전북카드', '산은캐피탈', '외환카드', '광주은행', 'KB국민카드', '조흥카드',
  '신한카드', '롯데카드', '우리카드', '신세계한미', '구)신한카드', '삼성카드', '수협카드',
  '농협NH카드', '하나SK카드', '해외JCB카드', '해외다이너스카드', '해외마스타카드',
  '해외비자카드', 'PAYCO포인트(100%)',
]

// p.20 카드매입사
export const CARD_ACQUIRERS = [
  '전체', '삼성카드', '신한카드', 'BC카드', 'KB국민카드', '하나카드(외환)', '현대카드',
  '롯데아멕스카드', '하나카드', '씨티카드', 'NH카드', 'PAYCO포인트(100%)',
]

// p.20 간편결제구분
export const SIMPLE_PAY_TYPES = [
  '전체', 'PAYCO 결제', '삼성페이', 'LG페이', 'SSG페이', '간편결제Q', 'L.pay',
  '카카오페이', '네이버페이',
]

// p.37 카드사 (수수료 표기용)
export const CARD_BRANDS = ['롯데', '비씨', '현대', '씨티', '하나', '외환', '국민', '농협', '신한', '삼성']

export const PAGE_SIZES = [200, 150, 100, 50, 30]

export const BANKS = [
  '전체', '산업은행', '기업은행', 'KEB하나은행(구.외환)', '국민은행', '농협중앙회', '단위농협',
  '신한은행', '우리은행', '우리은행(자체)', 'SC제일은행', 'KEB하나은행', '대구은행',
  '부산은행', '경남은행', '씨티은행(비씨)', '저축은행', '우체국', '새마을', '신한카드',
  '삼성카드', '현대카드', '외환카드', '국민카드', '롯데카드', '농협카드',
]

export const HOLIDAY_TYPES = ['지정공휴일', '임시/대체 공휴일']

export const POSITIONS = [
  '선택', '인턴', '사원', '대리', '과장', '차장', '부장', '이사', '상무', '전무',
  '부사장', '사장', '부회장', '회장', '연구원', '주임연구원', '전임연구원', '선임연구원',
  '책임연구원', '수석연구원', '기타',
]

export const USER_GROUPS = [
  '쇼핑몰 메뉴 모든 조회만 가능(취소불가) : SHOP_ALL',
  '결제내역만조회 : SHOP_CS',
  '쇼핑몰 CS용(조회만 가능) : SHOP_CS1',
  '쇼핑몰 CS용(조회/취소 가능) : SHOP_CS2',
  'SHOP_CS1 권한 + 정산관리 : SHOP_CS7',
  '쇼핑몰 CS용(조회만 가능+엑셀X) : SHOP_CS8',
  '쇼핑몰 CS용(조회, 취소)+정산관리 : SHOP_CSB',
  '결제내역조회취소 : SHOP_CSC',
  '로그인보안관리(로그인IP사용설정,접속현황) : SHOP_CSE',
]
