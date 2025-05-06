import express, { Request, Response } from "express";
import { pool } from "../../db";
const route = express.Router();

interface createTarefaType {
  usuario_id: number;
  titulo: string;
  descricao: string;
  data_hora: string;
  prioridade: string;
}

route.post(
  "/",
  async (req: Request<{}, {}, createTarefaType>, res: Response) => {
    const { usuario_id, titulo, descricao, data_hora, prioridade } = req.body;

    try {
      const tarefa = await pool.query(
        `INSERT INTO tarefas (usuario_id, titulo, descricao, data_hora, prioridade)
VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [usuario_id, titulo, descricao, data_hora, prioridade]
      );

      res.status(201).send({
        response: `Tarefa criada com sucesso!`,
        info: tarefa.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Erro ao criar a tarefa: ${error}` });
    }
  }
);

route.get("/", async (req: Request, res: Response) => {
  const { usuario_id } = req.body;

  try {
    const listarTarefas = await pool.query(
      `SELECT * FROM tarefas WHERE usuario_id = $1
      ORDER BY data_hora asc`,
      [usuario_id]
    );

    res.status(200).send({
      tarefas: listarTarefas.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      erro: error,
    });
  }
});

module.exports = route;
