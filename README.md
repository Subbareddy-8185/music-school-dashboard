# Music School Dashboard

A role-based dashboard for managing a music school, built with **React, TypeScript and Vite**. This is a personal project inspired by the kind of workflows used in music school management software. It uses only my own sample data.

## Tech stack

- React 19 + TypeScript (strict mode)
- Vite
- ESLint
- Redux Toolkit (state management)
- React Router (routing)
- Jest + React Testing Library (tests)

## Features

- [ ] Role-based access: School, Teacher, Student and Parent dashboards
- [ ] Protected routes by role
- [ ] Student, teacher and recital lists with Active / Inactive tabs
- [ ] Search with debounce and pagination
- [ ] Course and enrollment management
- [ ] Loading, error and empty states for every list
- [ ] Unit tests for key components

## Getting started

```bash
git clone https://github.com/Subbareddy-8185/music-school-dashboard.git
cd music-school-dashboard
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually http://localhost:5173).

### Useful scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  components/   reusable UI components
  pages/        screens for each role
  hooks/        custom hooks (e.g. useDebounce)
  types/        shared TypeScript types
```

## Status

Work in progress. I'm building this to practice TypeScript with React, role-based routing, and state management.

## Author

**Subbareddy Gopireddy** – React.js Developer
[LinkedIn](https://linkedin.com/in/subbareddy8185) | gopireddysubba@gmail.com