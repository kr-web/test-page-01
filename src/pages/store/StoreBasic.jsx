import { Fragment } from 'react'
import { Screen } from '../../components/layout/BackofficeLayout'

// 상점관리 > 상점정보 > 기본정보 (SM_0100)
const PAY_METHODS_GRID = [
  ['신용카드', '계좌이체', '가상계좌', '휴대폰', '모모캐쉬', '상품권', '전화결제', '통머니'],
  ['간편결제 PAYCO', '글로벌결제', 'SSG머니', '카카오머니', '네이버페이포인트', 'LPOINT', '선불카드', ''],
]

export default function StoreBasic() {
  return (
    <Screen title="기본정보">
      <h3 className="bo-section-title">사업자정보</h3>
      <table className="form-table">
        <tbody>
          <tr><th>상점ID</th><td>kcptest125</td><th>상호</th><td>이커머스영업팀 테스트</td></tr>
          <tr><th>회사구분</th><td>법인사업자</td><th>법인등록번호</th><td>1101111113929</td></tr>
          <tr><th>대표자</th><td>박준석</td><th>사업자번호</th><td>1138521083</td></tr>
          <tr><th>대표자 주민번호</th><td>******-*******</td><th>대표 연락처<span className="req">*</span></th><td>070-7595-1111</td></tr>
          <tr><th>대표 E-mail<span className="req">*</span></th><td><input defaultValue="kcp@kcp.co.kr" className="w-300" /></td><th>팩스번호<span className="req">*</span></th><td>070-7595-1111</td></tr>
          <tr><th>업태<span className="req">*</span></th><td><input defaultValue="서비스" className="w-220" /></td><th>종목<span className="req">*</span></th><td><input defaultValue="전자금융업" className="w-220" /></td></tr>
          <tr><th>계약일자</th><td>2020-09-28 17:34:29</td><th>홈페이지주소</th><td>http://www.kcp.co.kr</td></tr>
          <tr><th>사용구분</th><td colSpan={3}>사용가능</td></tr>
          <tr>
            <th>지번 주소<span className="req">*</span></th>
            <td colSpan={3}>
              <div className="inline">
                <input defaultValue="08393" style={{ width: 90 }} />
                <button className="btn btn-gray btn-sm">우편번호 찾기 ▶</button>
                <label className="inline"><input type="radio" name="addr" defaultChecked /> 기본값 표시함</label>
              </div>
              <input className="w-full mt-8" defaultValue="서울특별시 구로구 구로동 222-22 NHN한국사이버결제" />
            </td>
          </tr>
          <tr>
            <th>도로명 주소<span className="req">*</span></th>
            <td colSpan={3}>
              <div className="inline">
                <input defaultValue="08393" style={{ width: 90 }} />
                <label className="inline"><input type="radio" name="addr" /> 기본값 표시함</label>
              </div>
              <input className="w-full mt-8" defaultValue="서울특별시 구로구 디지털로26길 72(구로동) NHN한국사이버결제" />
            </td>
          </tr>
        </tbody>
      </table>
      <p className="dl-note mt-8">
        <span className="star">*</span> 표시 이외의 정보변경을 원하시면 사업자정보변경 신청을 하시기 바랍니다.<br />
        <span className="star">*</span> 주소 변경 시, 에스크로 가입확인서/결제안내메일/매출전표/거래명세서에 표기 될 주소를 선택해 주시기 바랍니다.
      </p>
      <div className="form-actions">
        <button className="btn btn-primary">→ 사업자정보 변경신청</button>
        <button className="btn btn-outline">→ 수정</button>
      </div>

      <h3 className="bo-section-title">사이트정보</h3>
      <table className="form-table">
        <tbody>
          <tr><th>사이트명</th><td>kcptest125</td><th>서비스URL</th><td>www.kcp.co.kr</td></tr>
          <tr><th>사이트코드</th><td>A9BDS</td><th>서비스 등록일</th><td>20200928</td></tr>
          <tr><th>카드 가맹 구분</th><td>대행</td><th>우대수수료 가맹점 구분</th><td>일반</td></tr>
          <tr><th>고객안내전화번호</th><td>070-7595-1111</td><th>매출전표 과세표시</th><td>과세</td></tr>
          <tr><th>사이트 E-mail</th><td>kcp@kcp.co.kr</td><th>결제결과 E-mail</th><td>hjjang@kcp.co.kr</td></tr>
          <tr><th>세금계산서 담당자</th><td>박준석</td><th>세금계산서수신 E-mail</th><td>kcp@kcp.co.kr</td></tr>
          <tr>
            <th>서비스 상세요금</th>
            <td colSpan={3}>
              <div className="inline" style={{ gap: 24 }}>
                <span>가입비 <b>0원</b></span>
                <span>연회비 <b>0원</b></span>
                <span>사이트 보증금 <b>0원</b></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="form-actions"><button className="btn btn-outline">→ 수정</button></div>

      <h3 className="bo-section-title">계좌정보</h3>
      <table className="form-table">
        <tbody>
          <tr><th>업체명</th><td>이커머스영업팀 테스트</td><th>결제은행</th><td>기업은행</td></tr>
          <tr>
            <th>계좌번호</th>
            <td><span className="inline">1111111111 <button className="btn btn-gray btn-sm">입금계좌변경요청 ▶</button></span></td>
            <th>예금주</th><td>안지은</td>
          </tr>
        </tbody>
      </table>

      <h3 className="bo-section-title">사이트설정정보</h3>
      <table className="form-table">
        <tbody>
          <tr><th>결제창 버전</th><td>-</td></tr>
          <tr>
            <th>에스크로</th>
            <td>
              <span className="inline">미사용 <button className="btn btn-gray btn-sm">에스크로 신청 ▶</button> <button className="btn btn-gray btn-sm">에스크로란?</button></span>
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className="bo-section-title">결제수단별 수수료 및 정산정보</h3>
      <div className="table-wrap">
        <table className="grid">
          <tbody>
            {PAY_METHODS_GRID.map((rowArr, ri) => (
              <Fragment key={ri}>
                <tr>
                  {rowArr.map((m, ci) => <th key={ci}>{m || ''}</th>)}
                </tr>
                <tr>
                  {rowArr.map((m, ci) => (
                    <td key={ci}>
                      {m ? <button className={`btn btn-sm ${ci < 2 ? 'btn-primary' : 'btn-gray'}`} disabled={ci >= 2}>정산정보</button> : ''}
                    </td>
                  ))}
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-actions"><button className="btn btn-outline">→ 수정</button></div>
    </Screen>
  )
}
