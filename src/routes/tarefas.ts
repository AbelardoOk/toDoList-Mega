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

// Marcar tarefa como concluída
route.patch("/concluir", async (req, res, next) => {
  try {
    const { usuario_id, id } = req.body;
    const tarefa = await tarefasController.concluirTarefa({ usuario_id, id });
    res.json(tarefa);
  } catch (error) {
    next(error);
  }
});

// Deletar UMA Tarefa
route.delete("/", tarefasController.deleteOne);

// Deletar TODAS tarefas Concluidas
route.delete("/", tarefasController.deleteAll);
export default route;
