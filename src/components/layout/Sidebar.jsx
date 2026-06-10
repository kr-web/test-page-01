import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MENU, buildMenuIndex } from '../../data/menu'

const index = buildMenuIndex()

// 경로에 해당하는 GNB key 찾기
function gnbOf(pathname) {
  return index[pathname]?.gnbKey
}
// 그룹의 첫 leaf path
function firstLeaf(node) {
  if (node.path) return node.path
  if (node.children) {
    for (const c of node.children) {
      const p = firstLeaf(c)
      if (p) return p
    }
  }
  return null
}

export function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(() => gnbOf(pathname) || 'payments')

  useEffect(() => {
    const g = gnbOf(pathname)
    if (g) setOpen(g)
  }, [pathname])

  const toggle = (gnb) => {
    if (open === gnb.key) {
      setOpen(null)
    } else {
      setOpen(gnb.key)
      const p = firstLeaf(gnb)
      if (p) navigate(p)
    }
  }

  return (
    <nav className="bo-sidebar">
      {MENU.map((gnb) => (
        <div className="bo-nav-group" key={gnb.key}>
          <button
            type="button"
            className={`gnb ${gnbOf(pathname) === gnb.key ? 'active' : ''}`}
            onClick={() => toggle(gnb)}
          >
            {gnb.label}
          </button>
          {open === gnb.key && (
            <div className="bo-lnb">
              {gnb.children.map((node, i) => (
                <LnbNode key={i} node={node} pathname={pathname} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

function LnbNode({ node, pathname, navigate }) {
  if (node.children) {
    return (
      <>
        <button
          type="button"
          className="lnb"
          onClick={() => {
            const p = firstLeaf(node)
            if (p) navigate(p)
          }}
        >
          {node.label}
        </button>
        {node.children.map((c, i) => (
          <button
            key={i}
            type="button"
            className={`lnb depth3 ${pathname === c.path ? 'active' : ''}`}
            onClick={() => navigate(c.path)}
          >
            {c.label}
          </button>
        ))}
      </>
    )
  }
  return (
    <button
      type="button"
      className={`lnb ${pathname === node.path ? 'active' : ''}`}
      onClick={() => navigate(node.path)}
    >
      {node.label}
    </button>
  )
}
