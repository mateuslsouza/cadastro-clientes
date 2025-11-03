import mongoose from "mongoose";
import { enderecoSchema } from "./endereco.js";

const clienteSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    cnpj: { type: Number, required: [true, "O cnpj do cliente é obrigatorio"] },
    razaosocial: { type: String },
    nome: {
      type: String,
      required: [true, "O nome do cliente é obrigatorio"],
    },
    telefone: {
      type: Number,
      required: [true, "O numero do cliente é obrigatorio"],
    },
    endereco: enderecoSchema,
  },
  { versionKey: false }
);

const cliente = mongoose.model("clientes", clienteSchema);

export default cliente;
