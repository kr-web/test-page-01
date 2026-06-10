import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// GitHub Pages 프로젝트 페이지(https://kr-web.github.io/test-page-01/)에 맞춰
// 빌드 시에만 base 를 '/test-page-01/' 로 설정. 로컬 dev 는 '/' 유지.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/test-page-01/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
}))
