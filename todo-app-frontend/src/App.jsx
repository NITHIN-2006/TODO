import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { ErrorBanner } from "./components/ErrorBanner";
import { useTodos } from "./hooks/useTodos";
import { cn } from "./lib/utils";
export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "/api";
function TodoApp() {
  const {
    todos,
    loading,
    error,
    deletingIds,
    createTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearError,
  } = useTodos();

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="flex items-start justify-between mb-10">
          <div>
            <h1
              className={cn(
                "text-2xl font-semibold tracking-tight",
                "text-zinc-900 dark:text-zinc-50"
              )}
            >
              My Tasks
            </h1>
            {!loading && totalCount > 0 && (
              <p className="text-sm text-zinc-400 dark:text-zinc-600 mt-1">
                {completedCount} of {totalCount} completed
              </p>
            )}
          </div>
          <ThemeToggle />
        </header>

        <div className="space-y-4">
          <TodoForm onCreate={createTodo} />

          {error && (
            <ErrorBanner message={error} onDismiss={clearError} />
          )}

          <TodoList
            todos={todos}
            loading={loading}
            deletingIds={deletingIds}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
}
