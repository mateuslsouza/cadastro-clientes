import mongoose from "mongoose";

const enderecoSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId},
    logaduro: { type: String, required: true},
    numero: { type: Number, required: true},
    complemento: { type: String},
    bairro: { type: String, required: true},
    cidade: { type: String, required: true},
    estado: { type: String, required: true},
    cep: { type: String, required: true},
}, { versionKey: false});

const endereco = mongoose.model("enderecos", enderecoSchema);

export {endereco, enderecoSchema };