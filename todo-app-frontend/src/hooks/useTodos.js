import { useCallback, useEffect, useState } from "react";
import { todoService } from "../services/api";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingIds, setDeletingIds] = useState(new Set());

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getAll();
      setTodos(data);
    } catch {
      setError("Failed to load todos. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = useCallback(async (body) => {
    const optimistic = { id: `temp-${Date.now()}`, body, completed: false };
    setTodos((prev) => [optimistic, ...prev]);
    try {
      const created = await todoService.create(body);
      setTodos((prev) => prev.map((t) => (t.id === optimistic.id ? created : t)));
    } catch {
      setTodos((prev) => prev.filter((t) => t.id !== optimistic.id));
      setError("Failed to create todo.");
    }
  }, []);

  const toggleTodo = useCallback(async (id, completed) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
    );
    try {
      const updated = await todoService.update(id, { completed: !completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed } : t))
      );
      setError("Failed to update todo.");
    }
  }, []);

  const updateTodo = useCallback(async (id, body) => {
    const prev_body = todos.find((t) => t.id === id)?.body;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, body } : t))
    );
    try {
      const updated = await todoService.update(id, { body });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, body: prev_body } : t))
      );
      setError("Failed to update todo.");
    }
  }, [todos]);

  const deleteTodo = useCallback(async (id) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    await new Promise((r) => setTimeout(r, 200));
    try {
      await todoService.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete todo.");
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    todos,
    loading,
    error,
    deletingIds,
    createTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearError,
    refetch: fetchTodos,
  };
}
