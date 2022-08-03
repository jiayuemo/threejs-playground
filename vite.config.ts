import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from "@rollup/plugin-eslint"

export default defineConfig({
  base: './',
  plugins: [
    tsconfigPaths(),
    {
      ...eslint({ include: 'src/**/*.+(js|ts)'}),
      enforce: 'pre',
      // apply: 'build',
    },
  ],
})
