import { Query } from "pg";
import { pool } from "../config/db";
import {
  CreateTarefaDTO,
  Tarefa,
  deleteTarefa,
  listTarefas,
  updateTarefa,
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

  async listarTarefas(query: listTarefas): Promise<Tarefa[]> {
    const { usuario_id, tipoListagem } = query;

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
      `SELECT * FROM tarefas WHERE usuario_id = $1 ORDER BY ${orderBy} ASC`,
      [usuario_id]
    );
    return rows;
  },

  async atualizarTarefa(data: updateTarefa): Promise<Tarefa[]> {
    const { usuario_id, id, ...dados } = data;

    const campos = Object.entries(dados)
      .filter(([_, valor]) => valor !== undefined && valor !== "")
      .map(([chave, _], index) => `${chave} = $${index + 1}`);

    const valores = Object.values(dados).filter(
      (valor) => valor !== undefined && valor !== ""
    );

    if (campos.length === 0) {
      throw new Error("Não foram enviados dados para atualização!");
    }

    const query = `UPDATE tarefas SET ${campos.join(", ")} WHERE id = $${
      valores.length + 1
    } AND usuario_id = $${valores.length + 2}`;
    const parametros = [...valores, id, usuario_id];
    const { rows } = await pool.query(query, parametros);
    return rows;
  },

  async deletarTarefa(data: deleteTarefa): Promise<Tarefa[]> {
    const { usuario_id, id } = data;

    const { rows } = await pool.query(
      `DELETE FROM tarefas WHERE usuario_id = $1 AND id = $2`,
      [usuario_id, id]
    );
    return rows;
  },

  async deletarTodos(id: number): Promise<Tarefa[]> {
    await pool.query(
      `DELETE FROM tarefas WHERE usuario_id = $1 AND concluido = true`
    ),
      [id];

    return [];
  },
};
