import { Request, Response } from "express";
import { tarefasService } from "../services/tarefasService";
import { CreateTarefaDTO, listTarefas } from "../interface/tarefaInterface";

export const tarefasController = {
  //Post /Tarefas
  async criar(req: Request<{}, {}, CreateTarefaDTO>, res: Response) {
    try {
      const tarefa = await tarefasService.criarTarefa(req.body);
      res.status(201).json({
        message: "Tarefa criada com sucesso!",
        tarefa,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Erro ao buscar usuários: ${error}` });
    }
  },

  // GET /Tarefas
  async listagem(req: Request<{}, {}, listTarefas>, res: Response) {
    const { usuario_id } = req.body;
    if (!usuario_id) {
      res.status(400).json({ error: "Usuário não informado" });
    }
    try {
      const tarefa = await tarefasService.listarTarefas(req.body);
      res.status(200).json({ tarefa });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `Erro ao listar tarefas: ${error}`,
      });
    }
  },
};
