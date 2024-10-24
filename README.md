# EZFolio

This project is a portfolio for anyone who wants to show their projects and academic formation.

**Table of Contents**

- [EZFolio](#ezfolio)
  - [Features](#features)
  - [How to run the project?](#how-to-run-the-project)
  - [Folder structure](#folder-structure)
  - [ADR (Architectural Decision Record)](#adr-architectural-decision-record)
    - [Why Next.js?](#why-nextjs)
    - [Why Code Standardization?](#why-code-standardization)
    - [Why Git Standardization?](#why-git-standardization)
    - [Why Imports Standardization?](#why-imports-standardization)
    - [Why shadcn/ui?](#why-shadcnui)

## Features

- [ ] Home with projects
  - [ ] Hero
  - [ ] Academic Formation
  - [ ] Projects
  - [ ] Footer
- [ ] Login screen
- [ ] Admin screen
  - [ ] CRUD of projects
  - [ ] CRUD of categories
  - [ ] CRUD of academic formations

## How to run the project?

1. Clone the repository

```bash
git clone git@github.com:andrebeolchi/ezfolio.git
```

2. Install the dependencies

```bash
yarn install
```

3. Run the project

```bash
yarn dev
```

## Folder structure

The default folder structure of a Next.js project includes the following directories:

- `src/app`: Contains the custom `App` component of the application
  - I will use the App Routing structure to create routes
  - `src/components`: Contains the reusable components of the application
  - `src/lib`: Contains utility functions and business logic

## ADR (Architectural Decision Record)

### [Why Next.js?](./docs/ADR001-nextjs.md)

### [Why Code Standardization?](./docs/ADR002-code-standardization.md)

### [Why Git Standardization?](./docs/ADR003-git-standardization.md)

### [Why Imports Standardization?](./docs/ADR004-imports-standardization.md)

### [Why shadcn/ui?](./docs/ADR005-shadcn.md)
