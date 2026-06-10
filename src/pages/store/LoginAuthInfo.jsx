import { Screen } from '../../components/layout/BackofficeLayout'
import { Select } from '../../components/ui/SearchPanel'

// 상점관리 > 정보변경 > 로그인 인증정보 관리 (SM_0100)
export default function LoginAuthInfo() {
  const emailRow = (idx, deletable) => (
    <tr>
      <td className="left">이메일주소{idx}</td>
      <td className="left">
        <span className="inline">
          <input style={{ width: 150 }} /> @ <input style={{ width: 130 }} />
          <Select value="직접입력" options={['직접입력', 'kurlycorp.com', 'kurlypay.co.kr']} width={120} onChange={() => {}} />
          {deletable && <button className="btn btn-primary btn-sm">삭제</button>}
        </span>
      </td>
    </tr>
  )
  return (
    <Screen title="로그인 인증정보 관리">
      <h3 className="bo-section-title">로그인인증 정보관리</h3>
      <div className="table-wrap">
        <table className="grid">
          <thead>
            <tr><th style={{ width: 140 }}>상점구분</th><th style={{ width: 140 }}>아이디</th><th>본인인증 정보</th></tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={4}>대표 상점 ID</td>
              <td rowSpan={4}>kcptest125</td>
              <td className="left" style={{ padding: 0 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {emailRow(1, false)}
                    {emailRow(2, true)}
                    {emailRow(3, true)}
                    <tr>
                      <td className="left">휴대폰번호</td>
                      <td className="left">
                        <span className="inline">
                          <Select value="선택" options={['선택', '010', '011']} width={80} onChange={() => {}} />
                          - <input style={{ width: 70 }} /> - <input style={{ width: 70 }} />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="form-actions">
        <button className="btn btn-primary">→ 확인</button>
        <button className="btn btn-outline">→ 다시입력</button>
      </div>
    </Screen>
  )
}
