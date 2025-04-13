# Personal Site - React + TypeScript + Vite

[![Tests Status](https://github.com/{your-github-username}/spiceroll/workflows/Run%20Tests/badge.svg)](https://github.com/{your-github-username}/spiceroll/actions)

This repository contains the codebase for my personal site, built using React, TypeScript, and Vite. The setup includes hot module replacement (HMR) and ESLint for code quality.

## Project Structure

The project has the following structure:

```
.gitignore
eslint.config.js
index.html
package.json
postcss.config.js
public/
README.md
src/
    App.css
    App.tsx
    assets/
    components/
        Header.tsx
        Sidebar.tsx
    index.css
    main.tsx
    vite-env.d.ts
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Getting Started

### Prerequisites

-   Node.js
-   npm or yarn

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/personal-site.git
    cd personal-site
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the development server with hot module replacement:

```sh
npm run dev
# or
yarn dev
```

### Building for Production

To build the project for production:

```sh
npm run build
# or
yarn build
```

### Linting

This project uses ESLint for linting. To run the linter:

```sh
npm run lint
# or
yarn lint
```

### Testing

This project uses Vitest for unit testing. To run the tests:

```sh
# Run tests once
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## Continuous Integration

This project uses GitHub Actions for continuous integration. The following checks run automatically on pull requests:

- Unit tests
- Test coverage reporting to Codecov

You can view the status of these checks in the GitHub Actions tab of the repository.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
    languageOptions: {
        // other options...
        parserOptions: {
            project: ['./tsconfig.node.json', './tsconfig.app.json'],
            tsconfigRootDir: import.meta.dirname,
        },
    },
})
```

-   Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
-   Optionally add `...tseslint.configs.stylisticTypeChecked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
    // Set the react version
    settings: { react: { version: '18.3' } },
    plugins: {
        // Add the react plugin
        react,
    },
    rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
    },
})
```

## License

This project is licensed under the MIT License.
