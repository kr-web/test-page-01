import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from './AuthShell'
import { KurlyPayLogo } from '../../components/ui/Logos'
import { NoticeModal } from '../../components/ui/Modal'

export default function FindPassword() {
  const navigate = useNavigate()
  const [channel, setChannel] = useState('slack')
  const [userId, setUserId] = useState('')
  const [done, setDone] = useState(false)
  return (
    <AuthShell>
      <div className="auth-card">
        <div className="auth-logo">
          <KurlyPayLogo size={24} stacked />
        </div>
        <div className="auth-title">비밀번호 찾기</div>
        <p className="auth-desc" style={{ textAlign: 'left' }}>
          사용자 ID를 입력하세요.<br />
          등록된 {channel === 'slack' ? '슬랙 채널' : '이메일'}로 임시 패스워드가 발송됩니다.
        </p>

        <div className="auth-input">
          <input type="text" placeholder="사용자 ID 입력" value={userId} onChange={(e) => setUserId(e.target.value)} style={{ paddingLeft: 12 }} />
        </div>
        <div className="radio-group" style={{ margin: '12px 0 16px' }}>
          <label><input type="radio" name="ch" checked={channel === 'slack'} onChange={() => setChannel('slack')} /> Slack</label>
          <label><input type="radio" name="ch" checked={channel === 'email'} onChange={() => setChannel('email')} /> e-mail</label>
        </div>

        <button type="button" className="auth-submit" onClick={() => setDone(true)}>임시비밀번호 발송</button>
        <button type="button" className="auth-submit outline" onClick={() => navigate('/login')}>취소</button>
      </div>

      {done && (
        <NoticeModal onClose={() => navigate('/login')}>
          입력하신 {channel === 'slack' ? '슬랙 채널' : '이메일'}로<br />임시 비밀번호를 발송했습니다.
        </NoticeModal>
      )}
    </AuthShell>
  )
}
