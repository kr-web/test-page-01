/**
 * 메뉴 구조도 (화면설계서 p.3 메뉴구조도 기반)
 * GNB(1depth) > LNB(2depth) > 3depth
 * path 는 react-router 경로와 1:1 매핑.
 */
export const MENU = [
  {
    key: 'payments',
    label: '결제관리',
    children: [
      {
        label: '통합내역 조회',
        children: [
          { label: '전체 거래내역', path: '/payments/all-transactions' },
          { label: '전체 거절내역', path: '/payments/all-rejections' },
        ],
      },
      {
        label: '신용카드',
        children: [
          { label: '거래내역 조회', path: '/payments/card/transactions' },
          { label: '중복거래 예상', path: '/payments/card/duplicates' },
        ],
      },
      {
        label: '간편결제',
        children: [
          { label: '거래내역 조회', path: '/payments/simple/transactions' },
          { label: '중복거래 예상', path: '/payments/simple/duplicates' },
        ],
      },
      {
        label: '매출통계',
        children: [
          { label: '매출기간별', path: '/payments/sales/period' },
          { label: '결제수단별', path: '/payments/sales/method' },
        ],
      },
    ],
  },
  {
    key: 'settlement',
    label: '정산관리',
    children: [
      { label: '승인내역', path: '/settlement/approvals' },
      { label: '정산내역', path: '/settlement/settlements' },
      { label: '마감내역', path: '/settlement/closings' },
      { label: '반송/부분 취소내역', path: '/settlement/returns' },
      { label: '부가세 신고 참고자료', path: '/settlement/vat' },
      { label: '영중소 차액정산내역', path: '/settlement/sme-diff' },
    ],
  },
  {
    key: 'store',
    label: '상점관리',
    children: [
      {
        label: '상점정보',
        children: [
          { label: '기본정보', path: '/store/info/basic' },
          { label: '계약정보', path: '/store/info/contract' },
          { label: '부가/담당자정보', path: '/store/info/manager' },
          { label: '카드사 프로모션 현황', path: '/store/info/promotion' },
        ],
      },
      {
        label: '정보변경',
        children: [
          { label: '비밀번호 변경', path: '/store/change/password' },
          { label: '입금계좌 변경', path: '/store/change/account' },
          { label: '관리자 권한 및 설정 변경', path: '/store/change/admin' },
          { label: '로그인 인증정보 관리', path: '/store/change/login-auth' },
        ],
      },
    ],
  },
  {
    key: 'member',
    label: '회원관리',
    children: [
      {
        label: '통합내역 조회',
        children: [
          { label: '가입/탈퇴 조회', path: '/member/join-withdraw' },
          { label: '결제수단 조회', path: '/member/payment-methods' },
        ],
      },
      {
        label: '회원통계',
        children: [
          { label: '매출통계', path: '/member/stats/sales' },
          { label: '가입/탈퇴통계', path: '/member/stats/join-withdraw' },
        ],
      },
    ],
  },
  {
    key: 'merchant',
    label: '가맹점관리',
    children: [
      {
        label: '기본정보 관리',
        children: [
          { label: '가맹점 등록/조회', path: '/merchant/list' },
          { label: '가맹점 계약 조회', path: '/merchant/contracts' },
        ],
      },
      { label: '거래조회', path: '/merchant/transactions' },
      { label: '정산내역', path: '/merchant/settlements' },
      { label: '마감내역', path: '/merchant/closings' },
      { label: '통계', path: '/merchant/stats' },
    ],
  },
  {
    key: 'system',
    label: '시스템',
    children: [
      { label: '다운로드 관리', path: '/system/downloads' },
      { label: '계정관리', path: '/system/accounts' },
      { label: '메뉴관리', path: '/system/menus' },
      { label: '권한그룹 관리', path: '/system/roles' },
      { label: '공통코드 관리', path: '/system/codes' },
      { label: '공휴일 관리', path: '/system/holidays' },
    ],
  },
]

/** path -> { gnbKey, trail:[..labels], crumb:[홈, ...] } 역인덱스 */
export function buildMenuIndex() {
  const index = {}
  for (const gnb of MENU) {
    walk(gnb, [gnb], gnb.key, index)
  }
  return index
}
function walk(node, trail, gnbKey, index) {
  if (node.path) {
    index[node.path] = {
      gnbKey,
      trail: trail.map((n) => n.label),
    }
  }
  if (node.children) {
    for (const c of node.children) walk(c, [...trail, c], gnbKey, index)
  }
}
