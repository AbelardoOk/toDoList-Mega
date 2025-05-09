import express from "express";
import { tarefasController } from "../controllers/tarefaController";

const route = express.Router();

// Criar Tarefa
route.post("/", tarefasController.criar);

// Listar Tarefas
route.get("/", tarefasController.listagem);

// Atualizar Tarefas
route.put("/", tarefasController.update);

// Deletar UMA Tarefa
route.delete("/", tarefasController.deleteOne);

export default route;
