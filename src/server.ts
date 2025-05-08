import express from "express";
import bodyParser from "body-parser";
import tarefasRoute from "./routes/tarefas";

const app = express();
const port = 3000;
const hostname = "127.0.0.1"; // Localhost

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/tarefas", tarefasRoute);

app.listen(port, hostname, () => {
  console.log(`Servidor iniciado em ${hostname}:${port}`);
});
