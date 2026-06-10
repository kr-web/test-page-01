import { Screen } from '../../components/layout/BackofficeLayout'
import { Select } from '../../components/ui/SearchPanel'
import { USER_GROUPS } from '../../data/codes'

// 상점관리 > 정보변경 > 관리자 권한 및 설정 변경 (SM_0100)
export default function ChangeAdmin() {
  return (
    <Screen title="관리자 권한 및 설정 변경">
      <h3 className="bo-section-title">관리자권한 설정 및 변경</h3>
      <table className="form-table">
        <tbody>
          <tr><th>마켓컬리(조회용) 설정 ID</th><td>kcptest125</td></tr>
        </tbody>
      </table>

      <h3 className="bo-section-title">아이디추가하기</h3>
      <table className="form-table">
        <thead>
          <tr><th>사용자그룹</th><th>아이디</th><th>비밀번호</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><Select value={USER_GROUPS[0]} options={USER_GROUPS} width={420} onChange={() => {}} /></td>
            <td><span className="inline">kcptest125_<input style={{ width: 140 }} /></span></td>
            <td><input type="password" className="w-220" /></td>
          </tr>
        </tbody>
      </table>
      <div className="form-actions">
        <button className="btn btn-primary">→ 등록하기</button>
      </div>
    </Screen>
  )
}
