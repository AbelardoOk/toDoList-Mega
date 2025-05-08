import express from "express";
import { tarefasController } from "../controllers/tarefaController";

const route = express.Router();

// Criar Tarefa
route.post("/", tarefasController.criar);

// Listar Tarefas
route.get("/", tarefasController.listagem);

export default route;
