import { useEffect, useRef, useState } from "react";
import { Check, Trash2, Pencil, X } from "lucide-react";
import { cn } from "../lib/utils";

export function TodoCard({ todo, onToggle, onDelete, onUpdate, isDeleting }) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.body);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const commitEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== todo.body) {
      onUpdate(todo.id, trimmed);
    } else {
      setEditValue(todo.body);
    }
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditValue(todo.body);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-3 p-4 rounded-2xl",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        "shadow-sm hover:shadow-md",
        "hover:scale-[1.01] transition-all duration-200 ease-in-out",
        isDeleting ? "animate-fade-out pointer-events-none" : "animate-fade-in"
      )}
    >
      <button
        onClick={() => onToggle(todo.id, todo.completed)}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
        className={cn(
          "mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2",
          "transition-all duration-200 ease-in-out",
          "flex items-center justify-center",
          todo.completed
            ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100"
            : "border-zinc-300 dark:border-zinc-600 hover:border-zinc-500 dark:hover:border-zinc-400"
        )}
      >
        {todo.completed && (
          <Check
            size={11}
            strokeWidth={3}
            className="text-white dark:text-zinc-900"
          />
        )}
      </button>

      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commitEdit}
            className={cn(
              "w-full bg-transparent text-sm outline-none",
              "text-zinc-900 dark:text-zinc-100",
              "border-b border-zinc-300 dark:border-zinc-600 pb-0.5"
            )}
          />
        ) : (
          <p
            className={cn(
              "text-sm leading-relaxed break-words",
              todo.completed
                ? "line-through text-zinc-400 dark:text-zinc-600"
                : "text-zinc-700 dark:text-zinc-300"
            )}
          >
            {todo.body}
          </p>
        )}
      </div>

      <div
        className={cn(
          "flex items-center gap-1 flex-shrink-0",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        )}
      >
        {editing ? (
          <button
            onClick={cancelEdit}
            aria-label="Cancel edit"
            className={cn(
              "inline-flex items-center justify-center w-7 h-7 rounded-lg",
              "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "transition-all duration-150"
            )}
          >
            <X size={13} />
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            aria-label="Edit todo"
            className={cn(
              "inline-flex items-center justify-center w-7 h-7 rounded-lg",
              "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "transition-all duration-150"
            )}
          >
            <Pencil size={13} />
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
          className={cn(
            "inline-flex items-center justify-center w-7 h-7 rounded-lg",
            "text-zinc-400 hover:text-red-500",
            "hover:bg-red-50 dark:hover:bg-red-950",
            "transition-all duration-150"
          )}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}
