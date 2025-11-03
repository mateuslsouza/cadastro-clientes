import express from "express";
import EnderecoController from "../conrollers/enderecoController.js";

const routes = express.Router();

routes.get("/enderecos", EnderecoController.listarEndereco);
routes.get("/enderecos/:id", EnderecoController.listarEnderecoPorId);
routes.post("/enderecos", EnderecoController.cadastrarEndereco);
routes.put("/enderecos/:id", EnderecoController.atualizarEndereco);
routes.delete("/enderecos/:id", EnderecoController.excluirEndereco);

export default routes;
