import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // make sure to import it

export default defineConfig({
  plugins: [svgr(), react()],
});
