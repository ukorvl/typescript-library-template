<div align="center">
  <h1>typescript-library-template</h1>
  <p>
    This is a template for TypeScript library projects. It includes a set of guidelines and configurations to help you get started quickly and maintain a consistent codebase.
  </p>
  <img
    alt=""
    src="https://raw.githubusercontent.com/ukorvl/design/master/typescript-library-template/typescript-hotcake.png"
    loading="lazy"
    width="200"
    height="200"
  />
  <p>
    Churn out your own TypeScript libraries with this template - like hotcakes!
  </p>
</div>

## Table of Contents

- [Structure](#structure)
- [Getting Started](#getting-started)
- [License](#license)

## Structure

This project is structured to support TypeScript library development with a focus on modularity, tree-shaking, and maintainability. Key directories include:

- `lib/`: Contains the library source code
- `example/`: Contains example applications demonstrating how to use the library
- `docs/`: Contains documentation files

In addition, the project uses npm workspaces to manage dependencies across multiple packages, allowing for efficient development and testing.

There is also a simple GitHub action setup to run tests and build the library on every push to the main branch. This ensures that the code remains stable and functional. Additionally, it includes lables configuation and a basic issue template to help users report issues effectively.

## Getting Started

To get started with this template, use GitHub's **"Use this template"** button to create a new repository based on this template. Then, clone your new repository and install the dependencies.

```sh
git clone your-new-repo
cd your-new-repo
npm install
```

The code contains `fill-me` placeholders that you should replace with your own library name and description. This will help you quickly set up your project with the correct branding and information.

## License

This project is licensed under the [MIT License](https://github.com/ukorvl/typescript-library-template/blob/main/lib/LICENSE). You can freely use, modify, and distribute this template as per the terms of the license.
