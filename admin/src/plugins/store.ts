import { store } from '@/store'
export default function load (app: any) {
  app.use(store)
}
