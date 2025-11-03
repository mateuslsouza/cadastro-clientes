import mongoose from "mongoose";

const enderecoSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    logaduro: { type: String, required: [true, "O logaduro é Obrigatorio"] },
    numero: {
      type: Number,
      required: [true, "O numero da residencia é obrigatorio"],
    },
    complemento: { type: String },
    bairro: {
      type: String,
      required: [
        true,
        "O bairro onde esta localizado a residencia é obrigatorio",
      ],
    },
    cidade: {
      type: String,
      required: [true, "A cidade onde a residencia reside é obrigatoria"],
    },
    estado: {
      type: String,
      required: [true, "O estado onde a residencia reside é obrigatorio"],
    },
    cep: { type: String, required: [true, "O cep é obrigatorio"] },
  },
  { versionKey: false }
);

const endereco = mongoose.model("enderecos", enderecoSchema);

export { endereco, enderecoSchema };
