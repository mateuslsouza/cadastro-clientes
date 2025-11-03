import express from "express";
import clientes from "./clientesRoutes.js";
import endereco from "./enderecoRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Cadastrando seu cliente");
  });

  app.use(express.json(), clientes, endereco);
};

export default routes;
