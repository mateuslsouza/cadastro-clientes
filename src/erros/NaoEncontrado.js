import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
  constructor(mensgem = "pagina não encontrada") {
    super(mensgem, 404);
  }
}

export default NaoEncontrado;
