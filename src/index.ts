import ThreePerspective from './components/ThreePerspective.vue'
import type { Plugin } from 'vue'

export * as entities from './entities'

export type ThreePerspective = InstanceType<typeof ThreePerspective>

/* declare plugin with VueComponent */
export const ThreePerspectivePlugin:Plugin = {
  install: (app, _options) => {
    app.component('ThreePerspective', ThreePerspective)
  }
}
