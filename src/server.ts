import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const hostname = "127.0.0.1"; // Localhost

const tarefasRoute = require("./routes/tarefas");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/tarefas", tarefasRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    mensagem: "API Funcionando Corretamente",
  });
});

app.listen(port, hostname, () => {
  console.log(`Servidor iniciado em ${hostname}:${port}`);
});
