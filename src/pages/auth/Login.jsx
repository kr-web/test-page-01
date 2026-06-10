import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthShell } from './AuthShell'
import { KurlyPayLogo } from '../../components/ui/Logos'
import { NoticeModal } from '../../components/ui/Modal'

export default function Login() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [fail, setFail] = useState(0) // 0=none, n=fail count
  const [locked, setLocked] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    // 데모: admin / 1234 → 인증코드 단계, 그 외 실패 카운트 증가
    if (id === 'admin' && pw === '1234') {
      navigate('/auth/code')
      return
    }
    const next = fail + 1
    if (next >= 5) {
      setLocked(true)
      setFail(0)
    } else {
      setFail(next)
    }
  }

  return (
    <AuthShell>
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-logo">
          <KurlyPayLogo size={26} stacked />
        </div>
        <div className="auth-input">
          <span className="ico">👤</span>
          <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div className="auth-input">
          <span className="ico">🔒</span>
          <input type="password" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>
        <button type="submit" className="auth-submit">로그인</button>
        <div className="auth-row">
          <label>
            <input type="checkbox" /> 아이디 저장
          </label>
          <span className="auth-links">
            <Link to="/auth/find-id">아이디 찾기</Link>
            <span className="sep">|</span>
            <Link to="/auth/find-pw">비밀번호 찾기</Link>
          </span>
        </div>
        <p className="hint" style={{ marginTop: 18, textAlign: 'center' }}>
          데모 계정 — 아이디 <b>admin</b> / 비밀번호 <b>1234</b>
        </p>
      </form>

      {fail > 0 && (
        <NoticeModal onClose={() => setFail(0)}>
          입력하신 아이디 또는 비밀번호가<br />일치하지 않습니다. (로그인 실패 {fail}회)
          <div className="hint" style={{ marginTop: 8 }}>
            - 로그인 5회 이상 실패 시, 사용계정 잠금처리되오니 이용에 주의하시기 바랍니다.
          </div>
        </NoticeModal>
      )}
      {locked && (
        <NoticeModal onClose={() => setLocked(false)}>
          로그인 5회 실패로 사용 계정이<br />잠금 처리 되었습니다.
          <div className="hint" style={{ marginTop: 8 }}>
            사용권한 등록자에게 해제신청 후 사용하시기 바랍니다.
          </div>
        </NoticeModal>
      )}
    </AuthShell>
  )
}
