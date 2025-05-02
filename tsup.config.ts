import { defineConfig } from 'tsup';
import fs from 'fs-extra';

export default defineConfig({
  entry: ['cli.ts'],
  format: ['cjs'],
  clean: true,
  dts: true,
  shims: true,
  onSuccess: async () => {
    // Copy templates folder to dist directory
    console.log('Copying templates to dist directory...');
    await fs.copy('templates', 'dist/templates');
    console.log('Templates copied successfully!');
  },
  noExternal: [
    // Bundle all dependencies in the final output
    'inquirer',
    'cac',
    'chalk',
    'fs-extra',
    'execa',
    'ora'
  ],
});