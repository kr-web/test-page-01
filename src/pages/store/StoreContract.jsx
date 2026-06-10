import { Screen } from '../../components/layout/BackofficeLayout'
import { CARD_BRANDS } from '../../data/codes'

// 상점관리 > 상점정보 > 계약정보 (SM_0100)
const TIERS = [
  { name: '일반', fee: '3.4%' },
  { name: '중소3', fee: '2.12%' },
  { name: '중소2', fee: '1.87%' },
  { name: '중소1', fee: '1.72%' },
]

export default function StoreContract() {
  return (
    <Screen title="계약정보">
      <h3 className="bo-section-title">가맹점 계약정보</h3>
      <table className="form-table">
        <tbody>
          <tr><th>상호</th><td>이커머스영업팀 테스트</td><th>회사구분</th><td>법인사업자</td></tr>
          <tr><th>사업자번호</th><td>1138521083</td><th>대표자명</th><td>박준석</td></tr>
          <tr><th>담보조건</th><td>면제</td><th>담보금액</th><td className="num">0원</td></tr>
          <tr><th>등록비</th><td className="num">0원</td><th>연회비</th><td className="num">0원</td></tr>
        </tbody>
      </table>

      <h3 className="bo-section-title">결제수단별 수수료 및 정산주기 (VAT별도)</h3>
      <p className="dl-note" style={{ marginBottom: 10 }}>
        ※ 신용카드 수수료는 「여신전문금융업법 감독규정 제25의4」에 따라 영중소 사업자의 경우 우대수수료율을 적용받을 수 있습니다.<br />
        ※ 에스크로는 계좌이체/가상계좌 결제수단에만 적용되며 수수료는 면제, 정산주기는 구매확인 여부에 따라 상이합니다. (2일~7일, 영업일 기준)<br />
        ※ PAYCO/네이버페이/카카오페이/삼성페이/SSG페이/L.PAY 카드결제는 '신용카드 수수료 + 제휴간편결제 이용수수료'가 적용됩니다.<br />
        <span className="star">▶ 접속한 사이트코드는 일반 가맹점 수수료가 적용됩니다.</span>
      </p>
      <div className="table-wrap">
        <table className="grid">
          <thead>
            <tr>
              <th rowSpan={2} style={{ width: 110 }}>결제수단</th>
              <th rowSpan={2} style={{ width: 90 }}>구분</th>
              <th colSpan={CARD_BRANDS.length}>수수료(/건)</th>
              <th rowSpan={2} style={{ width: 110 }}>정산주기</th>
            </tr>
            <tr>{CARD_BRANDS.map((b) => <th key={b}>{b}</th>)}</tr>
          </thead>
          <tbody>
            {TIERS.map((t, i) => (
              <tr key={t.name}>
                {i === 0 && <td rowSpan={TIERS.length} style={{ fontWeight: 700 }}>신용카드</td>}
                <td>{t.name}</td>
                {CARD_BRANDS.map((b) => <td key={b}>{t.fee}</td>)}
                {i === 0 && <td rowSpan={TIERS.length}>월 1회</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Screen>
  )
}
