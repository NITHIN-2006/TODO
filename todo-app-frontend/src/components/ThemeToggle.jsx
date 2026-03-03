import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "inline-flex items-center justify-center w-9 h-9 rounded-xl",
        "bg-zinc-100 dark:bg-zinc-800",
        "text-zinc-500 dark:text-zinc-400",
        "hover:bg-zinc-200 dark:hover:bg-zinc-700",
        "hover:text-zinc-900 dark:hover:text-zinc-100",
        "transition-all duration-200 ease-in-out"
      )}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
