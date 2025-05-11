import express from "express";
import bodyParser from "body-parser";
import tarefasRoute from "./routes/tarefas";
import usuarioRoute from "./routes/usuarios";

const app = express();
const port = 3000;
const hostname = "127.0.0.1"; // Localhost

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/tarefas", tarefasRoute);
app.use("/usuario", usuarioRoute);

app.listen(port, hostname, () => {
  console.log(`Servidor iniciado em ${hostname}:${port}`);
});
