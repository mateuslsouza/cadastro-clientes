import NaoEncontrado from "../erros/NaoEncontrado.js";
import { cliente } from "../models/index.js";
import { endereco } from "../models/endereco.js";

class ClienteController {
  static listarClientes = async (req, res, next) => {
    try {
      const listaClientes = await cliente.find({});
      res.status(200).json(listaClientes);
    } catch (erro) {
      next(erro);
    }
  };
  static listarClientesPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const clienteEncontrado = await cliente.findById(id);

      if (clienteEncontrado !== null) {
        res.status(200).json(clienteEncontrado);
      } else {
        next(new NaoEncontrado("id do autor nao localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarCliente = async (req, res, next) => {
    const novoCliente = req.body;
    try {
      const enderecoEncontrado = await endereco.findById(novoCliente.endereco);
      const clienteCompleto = {
        ...novoCliente,
        endereco: { ...enderecoEncontrado._doc },
      };
      const clienteCriado = await cliente.create(clienteCompleto);
      res
        .status(201)
        .json({ message: "criado com sucesso", cliente: clienteCriado });
    } catch (erro) {
      next(erro);
    }
  };
  static atualizarCliente = async (req, res, next) => {
    try {
      const id = req.params.id;
      const clienteResultado = await cliente.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (clienteResultado !== null) {
        res.status(200).json({ message: "cliente atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("ID do cliente nao localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirCliente = async (req, res, next) => {
    try {
      const id = req.params.id;
      const clienteResultado = await cliente.findByIdAndDelete(id);
      if (clienteResultado !== null) {
        res.status(200).json({ message: "cliente excluido com sucesso" });
      } else {
        next(new NaoEncontrado("ID do cliente não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarClientesPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const clienteResultado = await cliente.find(busca).populate("endereco");
        res.status(200).json(clienteResultado);
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { nomeCliente } = parametros;

  let busca = {};

  if (nomeCliente) {
    const clientes = await cliente.findOne({ nome: nomeCliente });

    if (clientes !== null) {
      busca.cliente = clientes._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default ClienteController;
