import { useNavigate } from 'react-router-dom'
import { KurlyPayLogo } from '../ui/Logos'

export function Header() {
  const navigate = useNavigate()
  return (
    <header className="bo-header">
      <div className="bo-logo" onClick={() => navigate('/main')} style={{ cursor: 'pointer' }}>
        <KurlyPayLogo size={17} />
        <span className="sys">PG 시스템</span>
      </div>
      <div className="bo-header-right">
        <div className="bo-header-icons">
          <button type="button" className="bo-iconbtn" title="다운로드 관리" onClick={() => navigate('/system/downloads')}>⤓</button>
          <button type="button" className="bo-iconbtn ghost" title="내 계정">⚙</button>
        </div>
        <div className="bo-status">
          <span className="dot on">온라인</span>
          <span className="dot">로그아웃</span>
          <button type="button" onClick={() => navigate('/login')}>나가기</button>
        </div>
      </div>
    </header>
  )
}
