import { Request, Response } from "express";
import { usuarioService } from "../services/usuarioService";
import { usuario } from "../interface/usuarioInterface";

export const usuarioController = {
  // POST /Usuarios
  async registro(req: Request<{}, {}, usuario>, res: Response) {
    try {
      const { user, token } = await usuarioService.register(req.body);
      res.status(201).json({
        message: `Usuário criado com sucesso!`,
        token: `Bearer ${token}`,
        user: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `Não foi possível criar o usuário: ${error}`,
      });
    }
  },

  // GET /Usuarios
  async login(req: Request<{}, {}, usuario>, res: Response) {
    try {
      const { user, token } = await usuarioService.login(req.body);
      res.status(200).json({
        message: `Usuário logado com sucesso!`,
        token: `Bearer ${token}`,
        user: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `Não foi possível realizar o login: ${error}`,
      });
    }
  },
};
