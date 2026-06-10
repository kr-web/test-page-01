import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from './AuthShell'
import { KurlyPayLogo } from '../../components/ui/Logos'
import { NoticeModal } from '../../components/ui/Modal'

export default function FindId() {
  const navigate = useNavigate()
  const [channel, setChannel] = useState('slack')
  const [val, setVal] = useState('')
  const [done, setDone] = useState(false)
  return (
    <AuthShell>
      <div className="auth-card">
        <div className="auth-logo">
          <KurlyPayLogo size={24} stacked />
        </div>
        <div className="auth-title">아이디 찾기</div>
        <p className="auth-desc" style={{ textAlign: 'left' }}>
          사업자 등록 번호를 입력하세요.<br />
          등록된 {channel === 'slack' ? '슬랙 채널' : '이메일'}로 아이디가 발송됩니다.
        </p>

        <div className="radio-group" style={{ marginBottom: 12 }}>
          <span style={{ color: '#555' }}>아이디 확인채널</span>
          <label><input type="radio" name="ch" checked={channel === 'slack'} onChange={() => setChannel('slack')} /> Slack</label>
          <label><input type="radio" name="ch" checked={channel === 'email'} onChange={() => setChannel('email')} /> e-mail</label>
        </div>

        <div className="inline" style={{ marginBottom: 16 }}>
          <input type="text" value={val} onChange={(e) => setVal(e.target.value)} style={{ width: 150 }} placeholder="" />
          <span>@</span>
          <select defaultValue="kurlycorp.com" style={{ flex: 1 }}>
            <option>kurlycorp.com</option>
            <option>kurlypay.co.kr</option>
            <option>직접입력</option>
          </select>
        </div>

        <button type="button" className="auth-submit" onClick={() => setDone(true)}>아이디 찾기</button>
        <button type="button" className="auth-submit outline" onClick={() => navigate('/login')}>취소</button>
      </div>

      {done && (
        <NoticeModal onClose={() => navigate('/login')}>
          입력하신 {channel === 'slack' ? '슬랙 채널' : '이메일'}로<br />아이디를 발송했습니다.
        </NoticeModal>
      )}
    </AuthShell>
  )
}
