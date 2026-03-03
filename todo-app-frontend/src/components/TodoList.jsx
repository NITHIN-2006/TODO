import { ClipboardList, Loader2 } from "lucide-react";
import { TodoCard } from "./TodoCard";
import { cn } from "../lib/utils";

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "h-14 rounded-2xl animate-pulse",
            "bg-zinc-100 dark:bg-zinc-800/60"
          )}
          style={{ opacity: 1 - i * 0.2 }}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center",
          "bg-zinc-100 dark:bg-zinc-800/60",
          "text-zinc-400 dark:text-zinc-600"
        )}
      >
        <ClipboardList size={20} />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          No tasks yet
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">
          Add one above to get started
        </p>
      </div>
    </div>
  );
}

export function TodoList({ todos, loading, deletingIds, onToggle, onDelete, onUpdate }) {
  if (loading) return <LoadingSkeleton />;
  if (!todos.length) return <EmptyState />;

  const active = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      {active.length > 0 && (
        <section className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-600 px-1">
            Tasks &mdash; {active.length}
          </p>
          <div className="space-y-2">
            {active.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
                isDeleting={deletingIds.has(todo.id)}
              />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-600 px-1">
            Completed &mdash; {completed.length}
          </p>
          <div className="space-y-2">
            {completed.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
                isDeleting={deletingIds.has(todo.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
