import { KurlyPayLogo } from '../../components/ui/Logos'

// 로그인/인증 화면 (설계서 p.6 MB_0100) — 상단 로고 바 + 가운데 카드만.
// 설계서상 로그인 화면에는 푸터가 없습니다.
export function AuthShell({ children }) {
  return (
    <div className="auth-shell">
      <div className="auth-topbar">
        <KurlyPayLogo size={16} />
        <span className="sys">PG 시스템</span>
      </div>
      <div className="auth-main">{children}</div>
    </div>
  )
}
