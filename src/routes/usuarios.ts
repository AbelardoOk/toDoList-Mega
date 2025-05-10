import express from "express";
import { usuarioController } from "../controllers/usuarioController";

const route = express.Router();

// Registrar usuário
route.post("/register", usuarioController.registro);

// Logar usuário
route.post("/login", usuarioController.login);

export default route;
