var tentativaModel = require("../models/tentativaModel");

function inserindoTentativa(req, res) {

    var fkQuiz = Number(req.body.fkQuiz);
    var fkUsuario = Number(req.body.fkUsuario);
    var qtd_acertos = Number(req.body.qtd_acertos);


  tentativaModel.inserindoTentativa(fkQuiz, fkUsuario, qtd_acertos).then( function (resultado) {
      res.status(200).json(resultado);
  })
  .catch(function(erro){
    res.status(400).send(erro);
  })
}


function mostrarTentativa (req, res){
  tentativaModel.mostrarTentativa().then( function (resultado) {
    res.status(200).json(resultado);
})
.catch(function(erro){
  res.status(400).send(erro);
})
}

module.exports = {
  inserindoTentativa,
  mostrarTentativa,
}

