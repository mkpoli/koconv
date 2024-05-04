import { defineConfig } from 'vite';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'koconv',
      fileName: 'index',
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      plugins: [
        typescript({
          declaration: true,
          outDir: 'dist',
          rootDir: 'src',
        }),
        terser(),
      ],
    },
  },
});
