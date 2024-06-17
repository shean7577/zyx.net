import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    //生产环境要关闭代理
    proxy: {
      "/api": {
        target: "http://b.com/api.php/home/index/", // 目标地址
        changeOrigin: true,            // 是否换源
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  }
})
