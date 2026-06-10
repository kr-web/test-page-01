import { KurlyPayLogo } from '../../components/ui/Logos'

export function AuthShell({ children }) {
  return (
    <div className="auth-shell">
      <div className="auth-topbar">
        <KurlyPayLogo size={16} />
        <span className="sys">PG 시스템</span>
      </div>
      <div className="auth-main">{children}</div>
      <AuthFooter />
    </div>
  )
}

function AuthFooter() {
  return (
    <footer className="auth-footer">
      <div className="links">
        <a href="#회사소개">회사소개</a><span className="sep">|</span>
        <a href="#이용약관">이용약관</a><span className="sep">|</span>
        <a href="#개인정보취급방침">개인정보취급방침</a>
        <span className="fam">
          <select defaultValue="" style={{ fontSize: 12 }}>
            <option value="" disabled>Family Site</option>
            <option>마켓컬리</option>
            <option>뷰티컬리</option>
            <option>컬리페이</option>
          </select>
        </span>
      </div>
      <div className="biz">
        회사명 : ㈜컬리페이 | 사업자등록번호 : 000-00-00000 | 전화번호 : 00-0000-0000 | 이메일 : email@kurlypay.co.kr<br />
        주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동) | 대표자 : OOO | 개인정보책임자 : OOO<br />
        ⓒ KurlyPay CORP. ALL RIGHTS RESERVED
      </div>
    </footer>
  )
}
