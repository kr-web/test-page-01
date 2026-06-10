import { Screen } from '../../components/layout/BackofficeLayout'

// 상점관리 > 정보변경 > 비밀번호 변경 (SM_0100)
export default function ChangePassword() {
  return (
    <Screen title="비밀번호 변경">
      <table className="form-table">
        <tbody>
          <tr><th>현재 비밀번호</th><td><input type="password" className="w-300" /></td></tr>
          <tr><th>새 비밀번호</th><td><input type="password" className="w-300" /> <span className="hint">(8자~20자리 영문,숫자,특수문자 조합)</span></td></tr>
          <tr><th>새 비밀번호 확인</th><td><input type="password" className="w-300" /></td></tr>
        </tbody>
      </table>
      <div className="form-actions">
        <button className="btn btn-primary">→ 확인</button>
        <button className="btn btn-outline">→ 다시입력</button>
      </div>
    </Screen>
  )
}
