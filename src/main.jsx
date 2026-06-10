import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// GitHub Pages(정적 호스팅)에서는 새로고침/딥링크 시 서버가 경로를 모르면 404 가 납니다.
// HashRouter 는 경로를 URL 해시(#/login)로 관리해 별도 서버 설정 없이 동작합니다.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
