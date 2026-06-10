import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from './AuthShell'
import { KurlyPayLogo } from '../../components/ui/Logos'

export default function AuthCode() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const submit = (e) => {
    e.preventDefault()
    navigate('/main')
  }
  return (
    <AuthShell>
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-logo">
          <KurlyPayLogo size={26} stacked />
        </div>
        <p className="auth-desc">
          로그인 인증코드를 입력하세요.<br />
          슬랙에서 인증코드를 확인하세요.
        </p>
        <div className="auth-input">
          <span className="ico">🔒</span>
          <input type="text" placeholder="인증코드" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <button type="submit" className="auth-submit">로그인</button>
        <p className="hint" style={{ marginTop: 16, textAlign: 'center' }}>
          데모 — 아무 값이나 입력 후 로그인
        </p>
      </form>
    </AuthShell>
  )
}
