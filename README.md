# Todo App

A production-ready React + Vite + TailwindCSS todo application with dark mode, optimistic updates, and a clean SaaS aesthetic.

---
## Screenshots
![App Screenshot](Screenshot 2026-03-03 171656.png)

## Project Structure

```
todo-app/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── ErrorBanner.jsx
    │   ├── ThemeToggle.jsx
    │   ├── TodoCard.jsx
    │   ├── TodoForm.jsx
    │   └── TodoList.jsx
    ├── context/
    │   └── ThemeContext.jsx
    ├── hooks/
    │   └── useTodos.js
    ├── lib/
    │   └── utils.js
    └── services/
        └── api.js
```

---

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. shadcn/ui setup (optional, for additional components)

```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Zinc
- CSS variables: Yes

To add specific shadcn components:
```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add checkbox
```

### 3. Run the dev server

Make sure your backend is running at `http://localhost:5000`, then:

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## API

The app connects to a backend at `http://localhost:5000` with the following endpoints:

| Method | Endpoint         | Description     |
|--------|------------------|-----------------|
| GET    | /api/todos       | Fetch all todos |
| POST   | /api/todos       | Create a todo   |
| PUT    | /api/todos/:id   | Update a todo   |
| DELETE | /api/todos/:id   | Delete a todo   |

Todo object shape:
```json
{
  "id": "string",
  "body": "string",
  "completed": false
}
```

---

## Features

- Create, read, update, delete todos
- Inline edit with keyboard support (Enter to save, Escape to cancel)
- Toggle completion with optimistic UI updates
- Dark / light mode with persistence via localStorage
- Loading skeleton, error banner, and empty state
- Smooth fade-in / fade-out animations
- Responsive and accessible
