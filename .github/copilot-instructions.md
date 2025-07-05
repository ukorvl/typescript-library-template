# Repository technical context

Project description goes here. Emphasize all the important technical aspects of the project.
For more information, refer to the [docs](https://docs.github.com/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot).

## General Guidelines

- Follow strict TypeScript typing. Avoid `any` unless absolutely necessary.
- Use named exports for all components.
- Library files are not placed in the root, but under `lib/` directory.
- The library supports tree-shaking. Ensure exports stay modular and side-effect free.

## Testing

- Tests use Vitest.
- Mock DOM dependencies where needed.

## Code Style

- Write clear JSDoc comments for public components and utilities.
- Use `eslint` and `prettier` for code formatting and linting.
- Implement comprehensive error handling
- Write maintainable, self-documenting code
- Follow security best practices
- Ensure proper type coverage

## Bash commands

- Use `npm run format:fix` to format the code.
- Use `npm run format` to check code formatting.
- Use `npm run lint` to check code style.
- Use `npm run lint:fix` to automatically fix linting issues.
- Use `npm run lint:commits` to check commit messages.
- Use `npm run knip` to analyze exports.
- Use `npm run test` to run tests.
- Use `npm run ci` to install dependencies.
