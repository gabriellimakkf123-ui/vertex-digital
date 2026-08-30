import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        planomonalisa: resolve(__dirname, 'plano-monalisa.html'),
        monalisa: resolve(__dirname, 'monalisa.html'),
        boutique: resolve(__dirname, 'plano-boutiquedostemperos.html'),
        operacaomonalisa: resolve(__dirname, 'operacao-monalisa.html')
      }
    }
  }
});
