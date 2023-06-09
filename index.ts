// @ts-ignore
import Perspective from './src/perspective.vue'
import * as entities from './src/entities'
// import { h, type SetupContext } from 'vue'

export { initPerspective } from './src/perspective'
export { entities, Perspective }

// --- functional component --- no .vue file required //
// export type MyProps = {
//   level: number
// }
// export function MyComponent (props: MyProps, context: SetupContext) {

//   return h(`h${props.level}`, context.attrs, context.slots)
// }
