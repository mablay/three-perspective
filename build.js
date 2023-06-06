import * as esbuild from "esbuild"
import vuePlugin from "esbuild-plugin-vue3"

esbuild.build({
    entryPoints: ["index.ts"],
    bundle: true,
    format: 'esm',
    target: ['esnext'],
    // platform: 'neutral',
    outfile: "dist/index.js",
    plugins: [vuePlugin()],
    external: ['vue', 'three']
})