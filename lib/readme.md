**Template notice:** This repository is a starter template. Replace package metadata (names, URLs, emails, and publish settings) before your first release.

<div align="center">
  <h1>typescript-library-template</h1>
  <p>
    This is a template for TypeScript ESM-only library projects. It includes guidelines and configurations to help you get started quickly and keep a consistent codebase. It can be used to ship Node.js libraries, browser libraries, or both.
  </p>
  <img
    alt="Illustration of a TypeScript library template as a stack of hotcakes"
    src="https://raw.githubusercontent.com/ukorvl/design/master/typescript-library-template/typescript-hotcake.png"
    loading="lazy"
    width="200"
    height="200"
  />
  <p>
    Churn out your own TypeScript libraries with this template - like hotcakes!
  </p>
</div>

## What you get with this template

- _AI-friendly by default_ - the repository already includes _deterministic_ instructions for coding agents, making it easier to use AI tools.
- _Start fast_ without wiring the basics from scratch - the template already gives you a modern TypeScript library foundation, so you can focus on building your package instead of assembling tooling for days.
- _Strong code quality from day one_ - strict linting, formatting, and type-checking help catch problems early and keep the codebase consistent.
- A library setup that feels _production-minded_ - build, test, package validation, and workspace structure are already in place.
- Confidence in your _package output_ - included checks help validate typings, exports, and package quality before you publish.
- Better _dependency hygiene_ - the repo includes tooling that helps detect unused files.
- _Future-facing TypeScript support_ - the setup is designed to stay aligned with current and upcoming TypeScript versions and best practices.

## Table of Contents

- [Structure](#structure)
- [Getting Started](#getting-started)
- [License](#license)

## Structure

This project is structured to support TypeScript library development with a focus on modularity, tree-shaking, and maintainability. Key directories include:

- `lib/`: Contains the library source code
- `example/`: Contains example applications demonstrating how to use the library
- `docs/`: Contains documentation files

In addition, the project uses pnpm workspaces to manage dependencies across multiple packages, allowing for efficient development and testing.

There is also a simple GitHub action setup to run tests and build the library on every push to the main branch. This ensures that the code remains stable and functional. Additionally, it includes lables configuation and a basic issue template to help users report issues effectively.

## Getting Started

To get started with this template, use GitHub's **"Use this template"** button to create a new repository based on this template. Then, clone your new repository and install the dependencies.

```sh
git clone your-new-repo
cd your-new-repo
pnpm install
pnpm run setup-repo
```

This template intentionally uses generic placeholder metadata and repository links. Update them to your organization values before publishing.

## License

This project is licensed under the [MIT License](./LICENSE). You can freely use, modify, and distribute this template as per the terms of the license.
