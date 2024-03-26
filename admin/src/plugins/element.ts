import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
export default function load (app: ReturnType<typeof createApp>) {
  app.use(ElementPlus)
}
