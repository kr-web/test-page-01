import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// 검색엔진 개별 색인을 위해 경로형 URL(BrowserRouter)을 사용합니다.
// GitHub Pages 프로젝트 페이지 하위 경로라 basename 을 지정하고,
// 딥링크/새로고침 404 는 public/404.html SPA 폴백으로 처리합니다.
const BASENAME = '/test-page-01'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
