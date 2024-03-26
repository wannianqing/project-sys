import { createApp } from 'vue'

interface EagerLoadedModule {
  default: (app: ReturnType<typeof createApp>) => void;
}

type EagerLoadedModules = Record<string, EagerLoadedModule>;

export function useAllPlugins (app: ReturnType<typeof createApp>) {
  const modules: EagerLoadedModules = import.meta.glob('./*.ts', {
    eager: true
  })
  for (const fileName in modules) {
    if (typeof modules[fileName].default === 'function') {
      if (fileName !== './index.ts') {
        modules[fileName].default(app)
      }
    }
  }
}
