#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { cac } from 'cac';
import chalk from 'chalk';
import { execa } from 'execa';
import ora from 'ora';

// Define available tech stacks and templates
const TECH_STACKS = ['nextjs', 'vite-react'];

interface TemplateInfo {
  description: string;
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
    // Copy all files except template-info.json
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

// Main function to run the CLI
async function run() {
  const cli = cac('create-screenui');
  
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
          // Create formatted choices with descriptions if available
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
        
        // Step 4: Get project name (folder name)
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
        
        // Step 7: Ask if user wants to install dependencies
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
        
        // Step 8: Print success message
        printSuccessMessage(projectName, techStack);
        
      } catch (error) {
        console.error(chalk.red('An error occurred:'), error);
        process.exit(1);
      }
    });
  
  // Display help information when no arguments are provided
  cli.help();
  
  // Get version from package.json
  try {
    // Try different paths for package.json (development vs production)
    let packageJson;
    const packagePaths = [
      path.join(__dirname, '..', 'package.json'), // When running from dist
      path.join(__dirname, 'package.json'),       // Alternative location
      path.join(process.cwd(), 'package.json')    // When running from project root
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
      cli.version('0.1.0'); // Fallback version
    }
  } catch (error) {
    cli.version('0.1.0'); // Fallback version
  }
  
  cli.parse();
}

run().catch((error) => {
  console.error(chalk.red('Unhandled error:'), error);
  process.exit(1);
});