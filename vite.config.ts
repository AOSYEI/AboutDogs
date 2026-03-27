import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isUserOrOrgPages = repositoryName?.toLowerCase().endsWith('.github.io');

export default defineConfig({
  base: isGitHubActions
    ? repositoryName && !isUserOrOrgPages
      ? `/${repositoryName}/`
      : '/'
    : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
