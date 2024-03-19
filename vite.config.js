import react from '@vitejs/plugin-react';
import sass from 'vite-plugin-sass';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), sass()],
  envPrefix: 'VITE_',
});