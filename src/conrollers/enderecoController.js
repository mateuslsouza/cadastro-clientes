import  {endereco}  from "../models/endereco.js";

class EnderecoController{
    static async listarEndereco(req, res){
        try{
            const listaEndereco = await endereco.find({});
            res.status(200).json(listaEndereco)
        }catch(erro){
            res.status(500).json({message:`${erro.message} -  falha na requisição`})
        };
    };
    static async listarEnderecoPorId(req, res){
        try{
            const id = req.params.id;
            const enderecoEncontrado = await endereco.findById(id);
            res.status(200).json(enderecoEncontrado);
        }catch(erro){
            res.status(500).json({message:`${erro.message} -  falha na requisição do endereço`});
        };
    };

    static async cadastrarEndereco(req, res){
        try{
            const novoEndereco = await endereco.create(req.body);
            res.status(201).json({ message: "criado com sucesso", cliente: novoEndereco});
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar endereço`});
        };
    };
    static async atualizarEndereco(req, res){
        try{
            const id = req.params.id;
            await endereco.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "endereço atualizado"});
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha ao atualizar endereço`});
        };
    };

    static async excluirEndereco(req, res){
        try{
            const id = req.params.id;
            await endereco.findByIdAndDelete(id);
            res.status(200).json({ message: "endereço excluido com sucesso"});
        }catch(erro){
            res.status(500).json({ message: `${erro.message} - falha ao excluir endereço`});
        }
    }
};

export default EnderecoController;