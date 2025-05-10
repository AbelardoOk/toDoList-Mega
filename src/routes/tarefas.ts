import express from "express";
import { tarefasController } from "../controllers/tarefaController";
import { authMiddleware } from "../middleware/authMiddleware";

const route = express.Router();

route.use(authMiddleware);

// Criar Tarefa
route.post("/", tarefasController.criar);

// Listar Tarefas
route.get("/", tarefasController.listagem);

// Atualizar Tarefas
route.put("/", tarefasController.update);

// Deletar UMA Tarefa
route.delete("/", tarefasController.deleteOne);

// Deletar TODAS tarefas Concluidas
route.delete("/", tarefasController.deleteAll);
export default route;
