import { AlertCircle, X } from "lucide-react";
import { cn } from "../lib/utils";

export function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-2xl",
        "bg-red-50 dark:bg-red-950/40",
        "border border-red-200 dark:border-red-900",
        "animate-fade-in"
      )}
    >
      <AlertCircle
        size={15}
        className="text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0"
      />
      <p className="flex-1 text-sm text-red-700 dark:text-red-300">{message}</p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="text-red-400 hover:text-red-600 dark:hover:text-red-200 transition-colors duration-150"
      >
        <X size={14} />
      </button>
    </div>
  );
}
