import  express  from "express";
import conectaNaDatabase from "./config/dbconnect.js";
import routes from "./routes/index.js";


const conexao = await  conectaNaDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexao", erro);
});

conexao.once("open", () => {
    console.log("Conexao com o banco feita com sucesso");
});

const app = express();
routes(app);

app.delete("/clientes/:id", (req, res) => {
    const index = buscaCLiente(req.params.id);
    //o splice consegue localizar um elemento em qualquer parte do array e deletá-lo.
    clientes.splice(index, 1);
    res.status(200).send("Cliente deletado com sucesso");
});

export default app;

// mongodb+srv://mlimasouza03:<password>@cluster0.iyrtj3o.mongodb.net/?retryWrites=true&w=majority



