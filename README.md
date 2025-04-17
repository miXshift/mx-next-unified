# MxNextUnified

## Getting Started

This guide will help you set up and run the MxNextUnified project using Corepack and Nx.

### Prerequisites

- Node.js v22.14.0 (as specified in package.json)
- Corepack enabled

### Setup and Installation

#### 1. Enable Corepack

Corepack ensures you use the correct package manager version (pnpm 10.8.0):

```bash
# Enable Corepack if not already enabled
corepack enable
```

#### 2. Install Dependencies

```bash
# Clone the repo (if not already done)
git clone <repository-url>
cd mx-next-unified

# Install dependencies using pnpm
pnpm install
```

## Running the Project

### Development Server

```bash
# Run the dev command for the default app
pnpm nx dev

# Or specify the app name explicitly
pnpm nx dev <app-name>
```

### Build for Production

```bash
pnpm nx build <app-name>
```

### Start Production Server

```bash
pnpm nx start <app-name>
```

## Using Nx in this Project

### Common Nx Commands

- **Run a development server**:
  ```bash
  pnpm nx dev <app-name>
  ```

- **Build an application**:
  ```bash
  pnpm nx build <app-name>
  ```

- **Run linting**:
  ```bash
  pnpm nx lint <app-name>
  ```

- **Run tests**:
  ```bash
  pnpm nx test <app-name>
  ```

### Working with Multiple Projects

- **Run a command on all projects**:
  ```bash
  pnpm nx run-many -t <target> # e.g., pnpm nx run-many -t lint
  ```

- **Run multiple commands in sequence**:
  ```bash
  pnpm nx run-many -t lint build test
  ```

### Visualizing Project Dependencies

To see a visualization of the project structure:

```bash
pnpm nx graph
```

### Nx Cache

Nx uses a cache to speed up command execution:

- **Clean the cache**:
  ```bash
  pnpm nx reset
  ```

For more information on Nx, visit the [Nx Documentation](https://nx.dev).

