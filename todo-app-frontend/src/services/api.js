import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

export const todoService = {
  getAll: () => client.get("/api/todos").then((r) => r.data),

  create: (body) => client.post("/api/todos", { body, completed: false }).then((r) => r.data),

  update: (id, data) => client.put(`/api/todos/${id}`, data).then((r) => r.data),

  delete: (id) => client.delete(`/api/todos/${id}`).then((r) => r.data),
};
