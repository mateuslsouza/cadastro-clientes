import cliente from "../models/cliente.js";
import { endereco } from "../models/endereco.js";

class ClienteController{
    static async listarClientes(req, res){
        try{
            const listaClientes = await cliente.find({});
            res.status(200).json(listaClientes)
        }catch(erro){
            res.status(500).json({message:`${erro.message} -  falha na requisição`})
        };
    };
    static async listarClientesPorId(req, res){
        try{
            const id = req.params.id;
            const clienteEncontrado = await cliente.findById(id);
            res.status(200).json(clienteEncontrado);
        }catch(erro){
            res.status(500).json({message:`${erro.message} -  falha na requisição do cliente`});
        };
    };

    static async cadastrarCliente(req, res){
        const novoCliente = req.body;
        try{
            const enderecoEncontrado = await endereco.findById(novoCliente.endereco);
            const clienteCompleto = {...novoCliente, endereco: { ...enderecoEncontrado._doc }};
            const clienteCriado = await cliente.create(clienteCompleto);
            res.status(201).json({ message: "criado com sucesso", cliente: clienteCriado});
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro`});
        };
    };
    static async atualizarCliente(req, res){
        try{
            const id = req.params.id;
            await cliente.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "cliente atualizado"});
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha ao atualizar cliente`});
        };
    };

    static async excluirCliente(req, res){
        try{
            const id = req.params.id;
            await cliente.findByIdAndDelete(id);
            res.status(200).json({ message: "cliente excluido com sucesso"});
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha ao excluir cliente`});
        }
    };

    static async listarClientesPorEndereco(req, res){
        const endereco = req.query.endereco;
        try{
            const clientePorEndereco = await cliente.find({ nome: endereco });
            res.status(200).json(clientePorEndereco);
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha na busca`});
        }
    }
};

export default ClienteController;