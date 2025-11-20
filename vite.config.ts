import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시 저장소 이름에 맞게 base 경로를 수정하세요
  // 예: 저장소가 'username.github.io'인 경우 base: '/'
  // 예: 저장소가 'portfolio'인 경우 base: '/portfolio/'
  base: '/portfolio/',
  server: {
    host: '127.0.0.1', // localhost 대신 IP 주소 직접 사용
    port: 5173,
  },
})

