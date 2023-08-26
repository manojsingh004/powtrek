import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

const {resolve} = require('path');

export default defineConfig({
  publicDir: 'assets',
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/pixie.tsx'),
      name: 'Pixie',
      formats: ['es'],
      fileName: format => `pixie.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'formatjs',
            {
              idInterpolationPattern: '[sha512:contenthash:base64:6]',
              ast: true,
            },
          ],
        ],
      },
    }),
  ],
});
