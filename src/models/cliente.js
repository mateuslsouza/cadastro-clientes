import mongoose from "mongoose";
import { enderecoSchema } from "./endereco.js";

const clienteSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    cpnj: {type: Number, require: true},
    razaosocial: {type: String},
    nome: {type: String, require: true},
    telefone: {type: Number, require: true},
    endereco: enderecoSchema
},   {versionKey: false});

const cliente = mongoose.model("clientes", clienteSchema);

export default cliente;