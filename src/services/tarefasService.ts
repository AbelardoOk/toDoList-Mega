import { pool } from "../config/db";
import {
  CreateTarefaDTO,
  Tarefa,
  listTarefas,
} from "../interface/tarefaInterface";

export const tarefasService = {
  async criarTarefa(data: CreateTarefaDTO): Promise<Tarefa> {
    const { usuario_id, titulo, descricao, data_hora, prioridade } = data;

    const { rows } = await pool.query(
      `INSERT INTO tarefas (usuario_id, titulo, descricao, data_hora, prioridade)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [usuario_id, titulo, descricao, data_hora, prioridade]
    );
    return rows[0];
  },

  async listarTarefas(data: listTarefas): Promise<Tarefa[]> {
    const { usuario_id, tipoListagem } = data;

    let orderBy: string;
    switch (tipoListagem) {
      case "prioridade":
        orderBy = "prioridade";
        break;
      case "concluida":
        orderBy = "concluida";
        break;
      default:
        orderBy = "data_hora";
    }
    const { rows } = await pool.query(
      `SELECT * FROM tarefas WHERE usuario_id = $1 ORDER BY $2 asc`,
      [usuario_id, orderBy]
    );
    return rows;
  },
};
