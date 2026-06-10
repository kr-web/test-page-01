import { Screen } from '../../components/layout/BackofficeLayout'
import { Select } from '../../components/ui/SearchPanel'

// 가맹점관리 > 기본정보 관리 > 가맹점 등록 (FM_0100)
const EMAIL_DOMAINS = ['직접입력', 'naver.com', 'hanmail.net', 'daum.net', 'gmail.com', 'nate.com', 'yahoo.co.kr']
const AREA = ['선택', '국번없음', '010', '02', '031', '032', '033', '041', '051', '061', '070']

export default function MerchantRegister({ onBack }) {
  return (
    <Screen title="가맹점 등록" crumbExtra={['가맹점 등록']}>
      <h3 className="bo-section-title">계정 정보입력</h3>
      <table className="form-table">
        <tbody>
          <tr><th>가맹점(상점)ID</th><td><span className="inline"><input className="w-300" /> <button className="btn btn-gray btn-sm">중복조회</button></span></td></tr>
          <tr><th>사이트코드</th><td>A9BDS</td></tr>
        </tbody>
      </table>

      <h3 className="bo-section-title">사업자 정보입력</h3>
      <table className="form-table">
        <tbody>
          <tr>
            <th>회사구분</th>
            <td className="radio-group">
              <label><input type="radio" name="biz" defaultChecked /> 개인사업자</label>
              <label><input type="radio" name="biz" /> 법인사업자</label>
            </td>
          </tr>
          <tr><th>회사명</th><td><input className="w-300" /></td></tr>
          <tr>
            <th>사업자번호</th>
            <td className="inline">
              <input style={{ width: 60 }} /> - <input style={{ width: 60 }} /> - <input style={{ width: 70 }} />
              <span style={{ marginLeft: 16 }}>법인등록번호</span>
              <input style={{ width: 90 }} /> - <input style={{ width: 90 }} />
            </td>
          </tr>
          <tr><th>업태 / 종목</th><td className="inline"><input style={{ width: 200 }} placeholder="업태" /> <input style={{ width: 200 }} placeholder="종목" /></td></tr>
          <tr>
            <th>사업자등록주소</th>
            <td>
              <div className="inline"><input style={{ width: 110 }} /> <button className="btn btn-gray btn-sm">우편번호 찾기 ▶</button> <label className="inline"><input type="checkbox" /> 직접입력</label></div>
              <input className="w-full mt-8" />
            </td>
          </tr>
          <tr><th>대표자명</th><td><input className="w-220" /></td></tr>
          <tr><th>대표자 법정생년월일</th><td className="inline"><input style={{ width: 140 }} /> - <span>*******</span></td></tr>
          <tr><th>대표자 휴대폰번호</th><td className="inline"><Select value="선택" options={AREA} width={90} onChange={() => {}} /> - <input style={{ width: 90 }} /> - <input style={{ width: 90 }} /></td></tr>
          <tr><th>대표 연락처</th><td className="inline"><Select value="국번없음" options={AREA} width={90} onChange={() => {}} /> - <input style={{ width: 90 }} /> - <input style={{ width: 90 }} /></td></tr>
          <tr><th>팩스번호</th><td className="inline"><Select value="선택" options={AREA} width={90} onChange={() => {}} /> - <input style={{ width: 90 }} /> - <input style={{ width: 90 }} /></td></tr>
          <tr>
            <th>대표 E-Mail</th>
            <td className="inline">
              <input style={{ width: 130 }} /> @ <input style={{ width: 130 }} />
              <Select value="직접입력" options={EMAIL_DOMAINS} width={120} onChange={() => {}} />
              <span className="hint">*계약안내메일 등의 메일 수신용</span>
            </td>
          </tr>
          <tr><th>홈페이지주소(URL)</th><td className="inline">http:// <input className="w-300" /></td></tr>
        </tbody>
      </table>

      <h3 className="bo-section-title">사이트 정보입력</h3>
      <table className="form-table">
        <tbody>
          <tr><th>사이트명</th><td><input className="w-300" /></td></tr>
          <tr><th>쇼핑몰주소(URL)</th><td className="inline">http:// <input className="w-300" /></td></tr>
          <tr>
            <th>카드 가맹 구분</th>
            <td className="inline">
              <Select value="대행" options={['대행', '직접']} width={120} onChange={() => {}} />
              <span style={{ marginLeft: 16 }}>우대수수료 가맹점 구분</span>
              <Select value="일반" options={['일반', '영세', '중소1', '중소2', '중소3']} width={120} onChange={() => {}} />
            </td>
          </tr>
          <tr><th>고객안내 전화번호</th><td className="inline"><Select value="국번없음" options={AREA} width={90} onChange={() => {}} /> - <input style={{ width: 90 }} /> - <input style={{ width: 90 }} /></td></tr>
        </tbody>
      </table>

      <h3 className="bo-section-title">담당자 정보입력 <label className="inline" style={{ fontWeight: 400, fontSize: 12 }}><input type="checkbox" /> 사업자 정보와 동일 시 체크</label></h3>
      <table className="form-table">
        <tbody>
          <tr><th>세금계산서 담당자명</th><td><input className="w-300" /></td></tr>
          <tr><th>세금계산서 담당 연락처</th><td className="inline"><Select value="선택" options={AREA} width={90} onChange={() => {}} /> - <input style={{ width: 90 }} /> - <input style={{ width: 90 }} /></td></tr>
          <tr><th>결제결과 E-mail</th><td className="inline"><input style={{ width: 130 }} /> @ <input style={{ width: 130 }} /> <Select value="직접입력" options={EMAIL_DOMAINS} width={120} onChange={() => {}} /></td></tr>
          <tr><th>세금계산서수신 E-Mail</th><td className="inline"><input style={{ width: 130 }} /> @ <input style={{ width: 130 }} /> <Select value="직접입력" options={EMAIL_DOMAINS} width={120} onChange={() => {}} /> <span className="hint">*세금계산서 등의 메일 수신용</span></td></tr>
        </tbody>
      </table>

      <h3 className="bo-section-title">정산계좌 정보입력</h3>
      <table className="form-table">
        <tbody>
          <tr><th>정산주기</th><td><Select value="주 1회 정산" options={['주 1회 정산', '15일 정산', '월 1회 정산']} width={160} onChange={() => {}} /></td></tr>
          <tr><th>정산은행</th><td><Select value="선택" options={['선택', '기업은행', '국민은행', '신한은행', '농협중앙회']} width={160} onChange={() => {}} /></td></tr>
          <tr><th>정산계좌</th><td><input className="w-300" /></td></tr>
          <tr><th>예금주</th><td><input className="w-220" /></td></tr>
        </tbody>
      </table>

      <div className="form-actions">
        <button className="btn btn-primary" onClick={onBack}>→ 저장</button>
        <button className="btn btn-outline" onClick={onBack}>취소</button>
      </div>
    </Screen>
  )
}
