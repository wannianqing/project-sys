import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),AutoImport({
    imports: ["vue", "vue-router", "vuex"],
  }),],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
  server: {
    host: '0.0.0.0', // 或者指定具体的192 IP地址，如 '192.168.1.100'
    port: 8000, // 你的服务器端口
    // 其他服务器配置...
  },
})
