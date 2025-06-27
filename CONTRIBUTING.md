# Contributing to fill-me

Thank you for your interest in contributing to **fill-me**! We appreciate your help in improving and maintaining this project.

## Getting Started

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page and clone your fork.

   ```sh
   git clone fill-me
   cd fill-me
   ```

2. **Install Dependencies**: Ensure you have Node.js and npm installed, then run:

   ```sh
   npm install
   ```

   Note, that the project uses npm workspaces, so all dependencies will be installed in the root `node_modules` folder.

3. **Create a Branch**: Use a meaningful branch name related to your changes.
   ```sh
   git checkout -b feature/my-new-feature
   ```

## Development Workflow

### Running the Project

- Start the development environment:
  ```sh
  npm run dev
  ```
- Run tests:
  ```sh
  npm run test
  ```
- Build the library:
  ```sh
  npm run build
  ```

### Code Guidelines

- Follow the existing code style and conventions.
- Ensure your changes pass ESLint, Prettier and TypeScript checks:
  ```sh
  npm run lint
  ```
- Keep PRs focused and provide clear descriptions.

## Submitting Changes

1. **Commit Your Changes**:
   ```sh
   git commit -m "feat: Add new feature"
   ```
   Note, that we use commitlint to enforce conventional commit messages.
3. **Push to Your Fork**:
   ```sh
   git push origin feature/my-new-feature
   ```
4. **Open a Pull Request**:
   - Go to the original repository.
   - Click "New Pull Request".
   - Select your branch and submit the PR with a clear description.

## Issues and Feature Requests

- Use the **GitHub Issues** tab to report bugs and request features.

## License

By contributing, you agree that your code will be licensed under the [MIT License](fill-me).

Thank you for your contributions! 🎉
