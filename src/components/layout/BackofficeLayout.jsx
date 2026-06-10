import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { buildMenuIndex } from '../../data/menu'

const index = buildMenuIndex()

export function BackofficeLayout() {
  return (
    <div className="bo-app">
      <Header />
      <div className="bo-body">
        <Sidebar />
        <main className="bo-main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

/**
 * 화면 공통 래퍼 — 우측 상단 breadcrumb + 좌측 페이지 타이틀(● ...).
 * title 미지정 시 메뉴 trail 의 마지막 라벨 사용.
 */
export function Screen({ title, children, crumbExtra }) {
  const { pathname } = useLocation()
  const trail = index[pathname]?.trail || []
  const crumb = ['홈', ...trail, ...(crumbExtra || [])]
  const pageTitle = title || trail[trail.length - 1] || ''
  return (
    <>
      <div className="bo-breadcrumb">
        {crumb.map((c, i) => (
          <span key={i}>
            {i > 0 && ' > '}
            {i === crumb.length - 1 ? <b>{c}</b> : c}
          </span>
        ))}
      </div>
      <h2 className="bo-page-title">{pageTitle}</h2>
      {children}
    </>
  )
}
