# MixShift Monorepo

## Environment Setup

For local development, you need to set up environment variables:

```sh
# Copy the example environment file and follow the instructions in it
cp .env.example .env

# Edit the .env file to add your specific configuration
code .env  # or use your preferred editor
```

The `.env.example` file contains all the necessary environment variables with placeholder values. Your local `.env` file should never be committed to the repository as it may contain sensitive information.

## Node.js and Package Management

- **Node.js**: Version 22 (LTS/Jod) is required
- **Package Manager**: This project uses pnpm with Corepack

### Setting Up Corepack and pnpm

Corepack is included with Node.js and manages package manager versions consistently across your team:

```sh
# Enable Corepack
corepack enable

# Use pnpm through Corepack
corepack prepare 
```

### Common pnpm Commands

```sh
# Install dependencies
pnpm install

# Add a dependency
pnpm add <package-name>

# Run a script from package.json
pnpm run <script-name>
```

Corepack ensures everyone working on the project uses the same package manager version, improving consistency and reliability.

## NX

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/js?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created.

### Generate an application

To generate a Next.js application under the `apps/` folder:

```sh
npx nx g @nx/next:app apps/my-app
```

### Generate a library

To generate a publishable library under the `libs/` folder:

```sh
npx nx g @nx/js:lib libs/my-lib --publishable --importPath=@my-org/my-lib
```

### Run tasks

To build an application or library:

```sh
npx nx build my-app
npx nx build my-lib
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Versioning and releasing

To version and release the library use:

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`.

To manually sync project references:

```sh
npx nx sync
```

You can enforce correct TypeScript project references in CI by adding:

```sh
npx nx sync:check
```

### Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
