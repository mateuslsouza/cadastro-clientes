import express from "express";
import conectaNaDatabase from "./config/dbconnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaNaDatabase();

conexao.on("error", console.log.bind(console, "Erro de conexão"));
conexao.once("open", () => {
  console.log("conexao com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;

// mongodb+srv://mlimasouza03:<password>@cluster0.iyrtj3o.mongodb.net/?retryWrites=true&w=majority
//user: mlimasouza03
//password: mateus03
