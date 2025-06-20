import { Request, Response } from "express";
import { tarefasService } from "../services/tarefasService";
import {
  CreateTarefaDTO,
  deleteTarefa,
  listTarefas,
  Tarefa,
  updateTarefa,
} from "../interface/tarefaInterface";
import { pool } from "../config/db";

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
      res.status(500).json({ error: `Erro ao buscar usuários: ${error}` });
    }
  },

  // GET /Tarefas
  async listagem(req: Request<{}, {}, {}, listTarefas>, res: Response) {
    const { usuario_id } = req.query;
    if (!usuario_id) {
      res.status(400).json({ error: "Usuário não informado" });
    }
    try {
      const tarefa = await tarefasService.listarTarefas(req.query);
      console.log(tarefa);
      res.status(200).json({ tarefa });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `Erro ao listar tarefas: ${error}`,
      });
    }
  },

  // PUT /Tarefas
  async update(req: Request<{}, {}, updateTarefa>, res: Response) {
    const { usuario_id, id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Tarefa não informada" });
    } else if (!usuario_id) {
      res.status(400).json({ error: "Usuário não informado" });
    }
    try {
      const tarefa = await tarefasService.atualizarTarefa(req.body);
      res.status(200).json({ tarefa });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `Erro ao listar tarefas: ${error}`,
      });
    }
  },

  // Deletar UMA tarefa
  async deleteOne(req: Request<{}, {}, deleteTarefa>, res: Response) {
    const { usuario_id, id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Tarefa não informada" });
    } else if (!usuario_id) {
      res.status(400).json({ error: "Usuário não informado" });
    }
    try {
      const tarefa = await tarefasService.deletarTarefa(req.body);
      res.status(200).json({ tarefa });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `Erro ao listar tarefas: ${error}`,
      });
    }
  },

  // Deletar TODAS tarefas concluidas
  async deleteAll(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Id do Usuário não informada" });
    }
    try {
      await tarefasService.deletarTodos(req.body);
      res.status(200).json({ message: "Tarefas Concluídas Limpadas!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `Erro ao listar tarefas: ${error}`,
      });
    }
  },
  async concluirTarefa({
    usuario_id,
    id,
  }: {
    usuario_id: string;
    id: string;
  }): Promise<Tarefa> {
    const { rows } = await pool.query(
      `UPDATE tarefas SET concluida = true WHERE id = $1 AND usuario_id = $2 RETURNING *`,
      [id, usuario_id]
    );

    if (rows.length === 0) {
      throw new Error("Tarefa não encontrada ou usuário não autorizado.");
    }

    return rows[0];
  },
};
