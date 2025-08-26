#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { cac } from 'cac';
import chalk from 'chalk';
import { execa } from 'execa';
import ora from 'ora';

// Define available tech stacks
const TECH_STACKS = ['nextjs', 'vite-react'];

interface TemplateInfo {
  description: string;
}

interface ScreenUIConfig {
  techStack: string;
  template: string;
  version: string;
}

// Get the templates directory path
function getTemplatesDir(): string {
  const prodPath = path.resolve(__dirname, 'templates'); // used after build
  const devPath = path.resolve(__dirname, '../templates'); // used during development
  return fs.existsSync(devPath) ? devPath : prodPath;
}

// Get available templates for the given tech stack
async function getAvailableTemplates(techStack: string): Promise<string[]> {
  const templatesDir = path.join(getTemplatesDir(), techStack);

  if (!fs.existsSync(templatesDir)) {
    return [];
  }

  const templates = await fs.readdir(templatesDir);
  return templates.filter(template =>
    fs.statSync(path.join(templatesDir, template)).isDirectory()
  );
}

// Get template info (description) if available
async function getTemplateInfo(techStack: string, template: string): Promise<TemplateInfo | null> {
  const infoPath = path.join(getTemplatesDir(), techStack, template, 'template-info.json');
  if (fs.existsSync(infoPath)) {
    return fs.readJson(infoPath);
  }
  return null;
}

// Copy template files to destination
async function copyTemplateFiles(techStack: string, template: string, destination: string): Promise<void> {
  const templateDir = path.join(getTemplatesDir(), techStack, template);
  const spinner = ora('Copying template files...').start();

  try {
    const files = await fs.readdir(templateDir);
    for (const file of files) {
      if (file !== 'template-info.json') {
        await fs.copy(
          path.join(templateDir, file),
          path.join(destination, file)
        );
      }
    }
    spinner.succeed('Template files copied successfully');
  } catch (error) {
    spinner.fail('Failed to copy template files');
    throw error;
  }
}

// Write .screenui.json into project directory
async function writeScreenUIConfig(destination: string, techStack: string, template: string, version: string): Promise<void> {
  const config: ScreenUIConfig = { techStack, template, version };
  const configPath = path.join(destination, '.screenui.json');
  await fs.writeJson(configPath, config, { spaces: 2 });
}

// Run installation and setup commands
async function runSetupCommands(destination: string): Promise<void> {
  const spinner = ora('Setting up dependencies...').start();
  try {
    await execa('npm', ['install'], { cwd: destination });
    spinner.succeed('Dependencies installed successfully');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    console.error(`You'll need to run 'npm install' manually in the project directory.`);
  }
}

// Print success message with next steps
function printSuccessMessage(projectName: string, techStack: string): void {
  console.log('\n');
  console.log(chalk.green('✨ Project successfully created! ✨'));
  console.log('\n');
  console.log('Next steps:');
  console.log(chalk.cyan(`  cd ${projectName}`));
  console.log(chalk.cyan('  npm install'));
  console.log(chalk.cyan('  npm run dev'));
  console.log('\n');

  if (techStack === 'nextjs') {
    console.log(`Your Next.js app will be available at: ${chalk.cyan('http://localhost:3000')}`);
  } else if (techStack === 'vite-react') {
    console.log(`Your Vite React app will be available at: ${chalk.cyan('http://localhost:5173')}`);
  }
  console.log('\n');
}

// -------------------- UPDATE LOGIC --------------------

// Read .screenui.json from project
async function readScreenUIConfig(projectDir: string): Promise<ScreenUIConfig | null> {
  const configPath = path.join(projectDir, '.screenui.json');
  if (!fs.existsSync(configPath)) {
    return null;
  }
  return fs.readJson(configPath);
}

// Update project files from template
async function updateProject(projectDir: string): Promise<void> {
  const spinner = ora('Checking for updates...').start();

  try {
    const config = await readScreenUIConfig(projectDir);
    if (!config) {
      spinner.fail('No .screenui.json found. Cannot determine template.');
      console.log(chalk.yellow('Make sure this project was created with create-screenui.'));
      return;
    }

    const { techStack, template } = config;
    const templateDir = path.join(getTemplatesDir(), techStack, template);

    if (!fs.existsSync(templateDir)) {
      spinner.fail(`Template "${template}" for ${techStack} not found.`);
      return;
    }

    let updatedFiles: string[] = [];

    // Compare and update files
    const files = await fs.readdir(templateDir);
    for (const file of files) {
      if (file !== 'template-info.json') {
        const srcPath = path.join(templateDir, file);
        const destPath = path.join(projectDir, file);

        let shouldUpdate = true;

        // If file exists, compare contents
        if (fs.existsSync(destPath)) {
          try {
            const srcContent = await fs.readFile(srcPath, 'utf-8');
            const destContent = await fs.readFile(destPath, 'utf-8');
            if (srcContent === destContent) {
              shouldUpdate = false;
            }
          } catch {
            shouldUpdate = true;
          }
        }

        if (shouldUpdate) {
          await fs.copy(srcPath, destPath, { overwrite: true });
          updatedFiles.push(file);
        }
      }
    }

    if (updatedFiles.length === 0) {
      spinner.succeed('Project is already up to date.');
      return;
    }

    spinner.succeed(`Updated ${updatedFiles.length} file(s): ${updatedFiles.join(', ')}`);

    // Run npm install if package.json was updated
    if (updatedFiles.includes('package.json')) {
      await runSetupCommands(projectDir);
    }

    console.log(chalk.green('\n✅ Update complete!'));
  } catch (error) {
    spinner.fail('Update failed');
    console.error(error);
  }
}

// -------------------- MAIN CLI --------------------
async function run() {
  const cli = cac('create-screenui');

  // CREATE COMMAND
  cli
    .command('[template]', 'Create a new ScreenUI project')
    .action(async (templateArg) => {
      try {
        // Step 1: Select tech stack
        const { techStack } = await inquirer.prompt([
          {
            type: 'list',
            name: 'techStack',
            message: 'Select the tech stack:',
            choices: TECH_STACKS
          }
        ]);

        // Step 2: Get available templates for selected tech stack
        const templates = await getAvailableTemplates(techStack);
        if (templates.length === 0) {
          console.error(chalk.red(`No templates available for ${techStack}`));
          process.exit(1);
        }

        // Step 3: Select template if not specified
        let template = templateArg;
        if (!template) {
          const choices = [];
          for (const tmpl of templates) {
            const info = await getTemplateInfo(techStack, tmpl);
            const description = info?.description ?? '';
            choices.push({
              name: description ? `${tmpl} - ${description}` : tmpl,
              value: tmpl
            });
          }

          const { selectedTemplate } = await inquirer.prompt([
            {
              type: 'list',
              name: 'selectedTemplate',
              message: 'Select a template:',
              choices
            }
          ]);
          template = selectedTemplate;
        } else if (!templates.includes(template)) {
          console.error(chalk.red(`Template "${template}" not found for ${techStack}`));
          console.log(`Available templates: ${templates.join(', ')}`);
          process.exit(1);
        }

        // Step 4: Get project name
        const defaultProjectName = `${template}-${techStack}`;
        const { projectName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            default: defaultProjectName,
            validate: (input) => {
              if (fs.existsSync(input)) {
                return `Directory "${input}" already exists. Please choose a different name.`;
              }
              return true;
            }
          }
        ]);

        // Step 5: Create project directory
        const projectDir = path.join(process.cwd(), projectName);
        await fs.ensureDir(projectDir);

        // Step 6: Copy template files
        await copyTemplateFiles(techStack, template, projectDir);

        // Step 7: Write .screenui.json
        await writeScreenUIConfig(projectDir, techStack, template, '0.1.0');

        // Step 8: Ask if user wants to install dependencies
        const { installDeps } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'installDeps',
            message: 'Would you like to install dependencies now?',
            default: true
          }
        ]);

        if (installDeps) {
          await runSetupCommands(projectDir);
        }

        // Step 9: Print success message
        printSuccessMessage(projectName, techStack);
      } catch (error) {
        console.error(chalk.red('An error occurred:'), error);
        process.exit(1);
      }
    });

  // UPDATE COMMAND
  cli
    .command('update', 'Update the current ScreenUI project')
    .action(async () => {
      const projectDir = process.cwd();
      await updateProject(projectDir);
    });

  // HELP & VERSION
  cli.help();

  try {
    let packageJson;
    const packagePaths = [
      path.join(__dirname, '..', 'package.json'),
      path.join(__dirname, 'package.json'),
      path.join(process.cwd(), 'package.json')
    ];

    for (const packagePath of packagePaths) {
      if (fs.existsSync(packagePath)) {
        packageJson = fs.readJsonSync(packagePath);
        break;
      }
    }

    if (packageJson) {
      cli.version(packageJson.version);
    } else {
      cli.version('0.1.0');
    }
  } catch (error) {
    cli.version('0.1.0');
  }

  cli.parse();
}

run().catch((error) => {
  console.error(chalk.red('Unhandled error:'), error);
  process.exit(1);
});
