var database = require("../database/config");

function inserindoTentativa(fkQuiz, fkUsuario, qtd_acertos) {
  var instrucao = `insert into tentativa (fkQuiz, fkUsuario, qtd_acertos) values(${fkQuiz},${fkUsuario}, ${qtd_acertos});`;
  return database.executar(instrucao);
}

function mostrarTentativa(){
  var instrucao = `
  select distinct tentativa.fkUsuario,max(qtd_acertos) maximo, usuario.nome 
  from Tentativa join Usuario on Usuario.idUsuario = Tentativa.fkUsuario
  group by tentativa.fkUsuario order by maximo desc;`;
  return database.executar(instrucao);
}

module.exports = {
  inserindoTentativa,
  mostrarTentativa
};
