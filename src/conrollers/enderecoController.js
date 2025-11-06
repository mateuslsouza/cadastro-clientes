import NaoEncontrado from "../erros/NaoEncontrado.js";
import { endereco } from "../models/index.js";

class EnderecoController {
  static listarEndereco = async (req, res, next) => {
    try {
      const listaEndereco = await endereco.find({});
      res.status(200).json(listaEndereco);
    } catch (erro) {
      next(erro);
    }
  };
  static listarEnderecoPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const enderecoResultado = await endereco
        .findById(id)
        .populate("cnpj", "nome")
        .exec();
      if (enderecoResultado !== null) {
        res.status(200).json(enderecoResultado);
      } else {
        next(new NaoEncontrado("ID do endereco não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarEndereco = async (req, res, next) => {
    try {
      const novoEndereco = await endereco.create(req.body);
      res
        .status(201)
        .json({ message: "criado com sucesso", cliente: novoEndereco });
    } catch (erro) {
      next(erro);
    }
  };
  static atualizarEndereco = async (req, res, next) => {
    try {
      const id = req.params.id;
      const enderecoEncontrado = await endereco.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (enderecoEncontrado !== null) {
        res.status(200).json({ message: "endereço atualizado" });
      } else {
        next(new NaoEncontrado("ID do endereco não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirEndereco = async (req, res, next) => {
    try {
      const id = req.params.id;
      const enderecoEncontrado = await endereco.findByIdAndDelete(id);
      if (enderecoEncontrado !== null) {
        res.status(200).json({ message: "endereço excluido com sucesso" });
      } else {
        next(new NaoEncontrado("ID do endereco não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default EnderecoController;
