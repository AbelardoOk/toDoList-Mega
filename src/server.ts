import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

import tarefasRoute from "./routes/tarefas";
import usuarioRoute from "./routes/usuarios";

const app = express();
const port = 3000;
const hostname = "127.0.0.1"; // Localhost

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

app.use("/tarefas", tarefasRoute);
app.use("/usuario", usuarioRoute);

app.listen(port, hostname, () => {
  console.log(`Servidor iniciado em ${hostname}:${port}`);
  console.log(`Documentação da API: ${hostname}:${port}/api-docs`);
});
