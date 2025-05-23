import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db";
import { usuario } from "../interface/usuarioInterface";
import dotenv from "dotenv";

dotenv.config();
const saltRounds = 10;

export const usuarioService = {
  async register(data: usuario): Promise<{ user: usuario; token: string }> {
    const { nome, senha, email } = data;

    if (!nome || !senha || !email) {
      throw new Error("Insira Credenciais Válidas");
    }

    const hashSenha = await bcrypt.hash(senha, saltRounds);

    const { rows } = await pool.query(
      `INSERT INTO usuarios (nome, senha, email) VALUES ($1, $2, $3) RETURNING id, nome, senha, email`,
      [nome, hashSenha, email]
    );
    const user = rows[0];
    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return { user, token };
  },

  async login(data: usuario): Promise<{ user: usuario; token: string }> {
    const { nome, senha } = data;

    if (!nome || !senha) {
      throw new Error("Insira Credenciais Válidas");
    }

    const hashSenha = await pool.query(
      `SELECT senha FROM usuarios WHERE nome = $1;`,
      [nome]
    );

    if (hashSenha.rows.length === 0) {
      throw new Error("Usuário não encontrado!");
    }

    const isMatch = await bcrypt.compare(senha, hashSenha.rows[0].senha);
    if (isMatch) {
      const { rows } = await pool.query(
        `SELECT id, nome, senha, email FROM usuarios WHERE nome = $1`,
        [nome]
      );
      const user = rows[0];

      const token = jwt.sign(
        { id: user.id, nome: user.nome, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      await pool.query(
        `
        UPDATE usuarios
        SET token_jwt = $1
        WHERE id = $2`,
        [token, user.id]
      );

      return { user, token };
    } else {
      throw new Error("Senha incorreta!");
    }
  },
};
