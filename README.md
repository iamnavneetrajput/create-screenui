# create-screenui

A CLI tool for scaffolding ready-made full-stack frontend projects built using either Next.js (with TypeScript) or Vite React (with TypeScript).

⚠️ IMPORTANT
🚫 Do NOT install this package using npm install.
✅ Use npx <package-name> instead:

## Usage

```bash
# Interactive mode - select template and tech stack
npx create-screenui
```

```bash
# Specify template name - select only tech stack
npx create-screenui clock
```

## Features

- Interactive CLI for selecting project templates and tech stacks
- Multiple tech stack support (Next.js, Vite React)
- Various UI templates for different use cases
- Automatic project setup and dependency installation
- Clear success messages with next steps

## Project Structure

## Website

Visit our official website at [ScreenUI](https://screenui.com/) to explore the latest updates, features, and detailed project insights.

```
create-screenui/
├─ templates/
│  ├─ nextjs/
│  │  ├─ layout/
│  │  │  ├─ template-info.json  # Optional metadata about the template
│  │  │  └─ ...                 # Template files
│  │  └─ dashboard/
│  │     └─ ...
│  └─ vite-react/
│     ├─ layout/
│     │  └─ ...
│     └─ dashboard/
│        └─ ...
├─ cli.ts
├─ tsup.config.ts
├─ package.json
└─ README.md
```

## Adding New Templates

To add a new template:

1. Create a new folder under the appropriate tech stack directory in `templates/`
2. Add all necessary files for the template
3. Optionally include a `template-info.json` file with metadata about the template:

```json
{
  "description": "A brief description of what this template provides"
}
```

## Development

```bash
# Clone the repository
git clone https://github.com/iamnavneetrajput/create-screenui.git
cd create-screenui

# Install dependencies
npm install

# Build the CLI
npm run build

# Run the CLI locally
node dist/cli.js

# Watch mode during development
npm run dev
```

## License

MIT