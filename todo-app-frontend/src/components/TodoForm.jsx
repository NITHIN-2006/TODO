import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "../lib/utils";

export function TodoForm({ onCreate }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onCreate(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-2xl",
        "bg-white dark:bg-zinc-900",
        "border transition-all duration-200 ease-in-out",
        focused
          ? "border-zinc-400 dark:border-zinc-500 shadow-md"
          : "border-zinc-200 dark:border-zinc-800 shadow-sm"
      )}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Add a new task..."
        className={cn(
          "flex-1 bg-transparent text-sm outline-none",
          "text-zinc-900 dark:text-zinc-100",
          "placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
        )}
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim()}
        aria-label="Add todo"
        className={cn(
          "inline-flex items-center justify-center w-7 h-7 rounded-lg",
          "transition-all duration-200 ease-in-out",
          value.trim()
            ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
        )}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
