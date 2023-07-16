import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import paths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [solid(), paths()],
	server: {
		host: 'localhost',
		port: 3000,
		open: true,
	},
	build: {
		outDir: './build',
	},
});
