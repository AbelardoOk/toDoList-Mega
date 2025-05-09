import { pool } from "../config/db";
import { usuario } from "../interface/usuarioInterface";
import bcrypt, { hash } from "bcrypt";
const saltRounds = 10;

export const usuarioService = {
  async register(data: usuario): Promise<usuario> {
    const { nome, senha, email } = data;

    const hashSenha = await bcrypt.hash(senha, saltRounds);

    const { rows } = await pool.query(
      `INSERT INTO usuarios (nome, senha, email) VALUES ($1, $2, $3)`,
      [nome, hashSenha, email]
    );
    return rows[0];
  },

  async login(data: usuario): Promise<usuario> {
    const { nome, senha } = data;

    const hashSenha = await pool.query(
      `SELECT senha FROM usuarios WHERE nome = $1`,
      [senha]
    );
    const isMatch = await bcrypt.compare(senha, hashSenha.rows[0]);
    if (isMatch) {
      const { rows } = await pool.query(
        `SELECT id FROM usuarios WHERE nome = $1`,
        [nome]
      );
      return rows[0];
    } else {
      throw new Error("Senha incorreta!");
    }
  },
};
