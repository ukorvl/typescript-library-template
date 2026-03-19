# Contributing to This Template

Thank you for your interest in contributing to this template. We appreciate your help in improving and maintaining this project.

## Getting Started

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page and clone your fork.

   ```sh
   git clone https://github.com/your-org/typescript-library-template.git
   cd typescript-library-template
   ```

2. **Install Dependencies**: Ensure you have Node.js and pnpm installed, then run:

   ```sh
   pnpm install
   ```

   Note, that the project uses pnpm workspaces, so dependencies are managed via `pnpm-lock.yaml` and the pnpm store.

3. **Create a Branch**: Use a meaningful branch name related to your changes.
   ```sh
   git checkout -b feature/my-new-feature
   ```

## Development Workflow

### Running the Project

- Start the development environment:
  ```sh
  pnpm run dev
  ```
- Run tests:
  ```sh
  pnpm run test
  ```
- Build the library:
  ```sh
  pnpm run build
  ```

### Code Guidelines

- Follow the existing code style and conventions.
- Ensure your changes pass ESLint, Prettier, and TypeScript checks:
  ```sh
  pnpm run lint
  pnpm run typecheck
  ```
- Keep PRs focused and provide clear descriptions.

## Submitting Changes

1. **Commit Your Changes**:
   ```sh
   git commit -m "feat: Add new feature"
   ```
   Note, that we use commitlint to enforce conventional commit messages.
2. **Push to Your Fork**:
   ```sh
   git push origin feature/my-new-feature
   ```
3. **Open a Pull Request**:
   - Go to the original repository.
   - Click "New Pull Request".
   - Select your branch and submit the PR with a clear description.

## Issues and Feature Requests

- Use the **GitHub Issues** tab to report bugs and request features.

## License

By contributing, you agree that your code will be licensed under the [MIT License](./lib/LICENSE).

Thank you for your contributions! 🎉
