// Seleção de elementos HTML usando classes
var botaoIniciarJogo = document.querySelector(".start-quiz");
var botaoProximaQuestao = document.querySelector(".next-question");
var containerPerguntas = document.querySelector(".questions-container");
var textoPergunta = document.querySelector(".question");
var containerRespostas = document.querySelector(".answers-container");
var respostas = document.querySelectorAll(".answer");

// Iniciar as variáveis
var indiceQuestaoAtual = 0;
var totalCorreto = 0;
var resultados = []; // Vetor para armazenar os resultados

// Adiciona ouvintes de eventos aos botões
botaoIniciarJogo.addEventListener("click", iniciarJogo);
botaoProximaQuestao.addEventListener("click", exibirProximaQuestao);

// Função para iniciar o quiz
function iniciarJogo() {
  botaoIniciarJogo.classList.add("hide");
  containerPerguntas.classList.remove("hide");
  exibirProximaQuestao();
}

// Função para exibir a próxima pergunta
function exibirProximaQuestao() {
  // Reseta o estado antes de exibir a próxima pergunta
  resetarEstado();

  // Verifica se todas as perguntas foram respondidas
  if (questions.length === indiceQuestaoAtual) {
    return finalizarJogo();
  }

  // Exibe a pergunta atual e suas opções de resposta
  textoPergunta.textContent = questions[indiceQuestaoAtual].question;
  questions[indiceQuestaoAtual].answers.forEach((answer) => {
    var novaResposta = document.createElement("button");
    novaResposta.classList.add("button", "answer");
    novaResposta.textContent = answer.text;
    if (answer.correct) {
      novaResposta.dataset.correct = answer.correct;
    }
    containerRespostas.appendChild(novaResposta);

    novaResposta.addEventListener("click", selecionarResposta);
  });
}

// Reseta o estado para a próxima pergunta
function resetarEstado() {
  while (containerRespostas.firstChild) {
    containerRespostas.removeChild(containerRespostas.firstChild);
  }

  document.body.removeAttribute("class");
  botaoProximaQuestao.classList.add("hide");
}

// Função para processar a seleção de uma resposta
function selecionarResposta(event) {
  var respostaClicada = event.target;
  var resultado = {};

  if (respostaClicada.dataset.correct) {
    totalCorreto++;
    resultado.correct = true;
    respostaClicada.classList.add("correct");
  } else {
    resultado.correct = false;
    respostaClicada.classList.add("incorrect");
  }

  resultado.question = questions[indiceQuestaoAtual].question;
  resultados.push(resultado);

  // Desabilita todas as respostas
  document.querySelectorAll(".answer").forEach((button) => {
    button.disabled = true;
  });

  // Exibir o botão de próxima pergunta
  botaoProximaQuestao.classList.remove("hide");
  indiceQuestaoAtual++;
}

// Função para finalizar o jogo e exibir a pontuação
function finalizarJogo() {
  var totalPerguntas = questions.length;

  var mensagem = "";

  // Determina a mensagem com base no desempenho do jogador
  if (totalCorreto <= 13) {
    mensagem = "Pode melhorar :(";
  } else if (totalCorreto <= 17) {
    mensagem = "Bom :)";
  } else if (totalCorreto <= 19) {
    mensagem = "Maravilha, acertou quase todas!";
  } else {
    mensagem = "Parabéns, você acertou tudo!";
  }

  // Atualiza o conteúdo do contêiner de perguntas com a mensagem final e o botão para refazer o teste
  containerPerguntas.innerHTML = `
    <p class="final-message">
      Você acertou ${totalCorreto} de ${totalPerguntas} questões! <br> <br>
      <span>Resultado: ${mensagem}</span>
    </p>`;

  // Exibe os resultados
  resultados.forEach((resultado, index) => {
    var textoResultado = resultado.correct ? "Acertou" : "Errou";
    var cor = resultado.correct ? "darkgreen" : "red";
    containerPerguntas.innerHTML += `
      <p style="color: ${cor};">Pergunta ${index + 1}: ${
      resultado.question
    } - ${textoResultado}</p>
    `;
  });
  dashboard();

  var ID_USUARIO = sessionStorage.getItem("ID_USUARIO");

  fetch("/tentativa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      fkQuiz: 1,
      fkUsuario: ID_USUARIO,
      qtd_acertos: totalCorreto,
    }),
  });
}

fetch("/tentativa", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
}).then(function (resposta) {
  resposta.json().then(function (json) {
    console.log(json.length);

    for (var contador = 0; contador < json.length; contador++) {
      mostrar.innerHTML += `<Br>  ${contador + 1} ${json[contador].nome}  ${json[contador].maximo} <div class="div-com-linha"> <Br>
`;
    }
  });
});

// Array de perguntas e respostas

var questions = [
  {
    question: `Quem foi lançado na cova dos leões?`,
    answers: [
      { text: "Paulo", correct: false },
      { text: "Daniel", correct: true },
      { text: "Davi", correct: false },
      { text: "Mesaque", correct: false },
    ],
  },
  {
    question: `Quantos eram os discípulos de Jesus?`,
    answers: [
      { text: "11", correct: false },
      { text: "12", correct: true },
      { text: "13", correct: false },
      { text: "14", correct: false },
    ],
  },
  {
    question: `Qual é o primeiro livro da Bíblia?`,
    answers: [
      { text: "Gênesis", correct: true },
      { text: "Salmos", correct: false },
      { text: "Mateus", correct: false },
      { text: "Nenhuma das alternativas", correct: false },
    ],
  },
  {
    question: "Qual a cidade em que Jesus nasceu?",
    answers: [
      { text: "Nazaré", correct: false },
      { text: "Jerusalém", correct: false },
      { text: "Damasco", correct: false },
      { text: "Belém", correct: true },
    ],
  },
  {
    question: "Quais os nomes dos autores dos Evangelhos na Bíblia?",
    answers: [
      { text: "Marcos, Timóteu, Paulo e João", correct: false },
      { text: "Mateus, Marcos, Lucas e João", correct: true },
      { text: "Mateus, Pedro, Lucas, João e Tiago", correct: false },
      { text: "Mateus, 1 Reis, Apocalipse e João", correct: false },
    ],
  },
  {
    question: "Qual o nome do último livro da Bíblia?",
    answers: [
      { text: "João", correct: false },
      { text: "Apocalipse", correct: true },
      { text: "Malaquias", correct: false },
      { text: "Provérbios", correct: false },
    ],
  },
  {
    question: "Que profeta foi engolido por um grande peixe?",
    answers: [
      { text: "Jó", correct: false },
      { text: "Salomão", correct: false },
      { text: "Lucas", correct: false },
      { text: "Jonas", correct: true },
    ],
  },
  {
    question: "Quem foi o primeiro rei de Israel?",
    answers: [
      { text: "Davi", correct: false },
      { text: "Golias", correct: false },
      { text: "Abraão", correct: false },
      { text: "Saul", correct: true },
    ],
  },
  {
    question: "Quantas pragas foram enviadas ao Egito?",
    answers: [
      { text: "9", correct: false },
      { text: "10", correct: true },
      { text: "11", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "Qual instrumento Davi gostava de tocar?",
    answers: [
      { text: "Tambor", correct: false },
      { text: "Harpa", correct: true },
      { text: "Violão", correct: false },
      { text: "Nenhuma das alternativas", correct: false },
    ],
  },
  {
    question: "Quem foi o discípulo que traiu Jesus?",
    answers: [
      { text: "Pedro", correct: false },
      { text: "João", correct: false },
      { text: "Judas", correct: true },
      { text: "Tiago", correct: false },
    ],
  },
  {
    question: "Quem construiu a arca?",
    answers: [
      { text: "Moisés", correct: false },
      { text: "Noé", correct: true },
      { text: "Abraão", correct: false },
      { text: "Josué", correct: false },
    ],
  },
  {
    question: "Quem foi o pai de Jesus na terra?",
    answers: [
      { text: "José", correct: true },
      { text: "João", correct: false },
      { text: "Pedro", correct: false },
      { text: "Paulo", correct: false },
    ],
  },
  {
    question: "Quem foi o rei mais sábio de Israel?",
    answers: [
      { text: "Saul", correct: false },
      { text: "Davi", correct: false },
      { text: "Salomão", correct: true },
      { text: "Roboão", correct: false },
    ],
  },
  {
    question:
      "Quem foi o profeta que Deus usou para libertar os israelitas do Egito?",
    answers: [
      { text: "Moisés", correct: true },
      { text: "Josué", correct: false },
      { text: "Samuel", correct: false },
      { text: "Elias", correct: false },
    ],
  },
  {
    question: "Quem foi o primeiro homem criado por Deus?",
    answers: [
      { text: "Caim", correct: false },
      { text: "Abel", correct: false },
      { text: "Adão", correct: true },
      { text: "Noé", correct: false },
    ],
  },
  {
    question: "Quem foi a primeira mulher criada por Deus?",
    answers: [
      { text: "Maria", correct: false },
      { text: "Eva", correct: true },
      { text: "Sara", correct: false },
      { text: "Rute", correct: false },
    ],
  },
  {
    question: "Quem foi o rei que derrotou Golias?",
    answers: [
      { text: "Saul", correct: false },
      { text: "Davi", correct: true },
      { text: "Salomão", correct: false },
      { text: "Josué", correct: false },
    ],
  },
  {
    question: "Quem foi o profeta que foi levado ao céu em um carro de fogo?",
    answers: [
      { text: "Elias", correct: true },
      { text: "Eliseu", correct: false },
      { text: "Isaías", correct: false },
      { text: "Jeremias", correct: false },
    ],
  },
  {
    question:
      "Quem foi o profeta que interpretou o sonho do rei Nabucodonosor?",
    answers: [
      { text: "Daniel", correct: true },
      { text: "Ezequiel", correct: false },
      { text: "Oséias", correct: false },
      { text: "Joel", correct: false },
    ],
  },
];

function comecar() {
  limpargeral(".brown-div");
}

function facil() {
  limpargeral(".div_facil");
}

function devocional() {
  limpargeral(".devocional_div");
}

function curiosidades() {
  limpargeral(".div_curiosidades");
}

function vercuriosidadelivros() {
  limpargeral(".div_livroantigo");
}

function verjesuschorou() {
  limpargeral(".div_jesuschorou");
}

function verautores() {
  limpargeral(".div_autores");
}

function vermandamentos() {
  limpargeral(".div_mandamentos");
}

function dashboard() {
  document.querySelector(".div_dashboard").style.display = "block";
  myChart.data.datasets[0].data[0] = totalCorreto;
  myChart.data.datasets[0].data[1] = questions.length - totalCorreto;
  myChart.update();
}

function limpargeral(tela) {
  document.querySelector(".brown-div").style.display = "none";
  document.querySelector(".div_facil").style.display = "none";
  document.querySelector(".devocional_div").style.display = "none";
  document.querySelector(".div_curiosidades").style.display = "none";
  document.querySelector(".div_livroantigo").style.display = "none";
  document.querySelector(".div_jesuschorou").style.display = "none";
  document.querySelector(".div_autores").style.display = "none";
  document.querySelector(".div_mandamentos").style.display = "none";
  document.querySelector(tela).style.display = "block";
}

// Declarando o vetor e a função fora da função devocional
const meuVetor = [
  "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o SENHOR; pensamentos de paz, e não de mal, para vos dar o fim que esperais. - Jeremias 29:11",
  "Tudo posso naquele que me fortalece. - Filipenses 4:13",
  "O SENHOR é o meu pastor; nada me faltará. - Salmo 23:1",
  "O amor é paciente, é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbece. - 1 Coríntios 13:4",
  "Honra a teu pai e a tua mãe, para que se prolonguem os teus dias na terra que o SENHOR, teu Deus, te dá. - Êxodo 20:12",
  "Bem-aventurados os mansos, porque herdarão a terra. - Mateus 5:5",
  "Mas buscai primeiro o seu reino e a sua justiça, e todas estas coisas vos serão acrescentadas. - Mateus 6:33",
  "Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento. - Provérbios 3:5",
  "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia. - Salmo 46:1",
  "O SENHOR te abençoe e te guarde; o SENHOR faça resplandecer o seu rosto sobre ti e te conceda graça. - Números 6:24-25",
  "Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim. - João 14:6",
  "Aquele que não ama não conhece a Deus; porque Deus é amor. - 1 João 4:8",
  "Toda Escritura é divinamente inspirada e proveitosa para ensinar, para repreender, para corrigir, para instruir em justiça. - 2 Timóteo 3:16",
  "Porque Deus não nos deu o espírito de covardia, mas de poder, de amor e de moderação. - 2 Timóteo 1:7",
  "O SENHOR é o meu rochedo, e o meu lugar forte, e o meu libertador; o meu Deus, a minha fortaleza, em quem confio. - Salmo 18:2",
  "O que for fiel no pouco, também é fiel no muito; o que é injusto no pouco, também é injusto no muito. - Lucas 16:10",
  "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei. - Mateus 11:28",
  "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa e com ele cearei, e ele, comigo. - Apocalipse 3:20",
  "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. - João 1:1",
  "O SENHOR reina; regozije-se a terra; alegrem-se as muitas ilhas. - Salmo 97:1",
  "Bem-aventurado o homem que não anda segundo o conselho dos ímpios, não se detém no caminho dos pecadores, nem se assenta na roda dos escarnecedores. - Salmo 1:1",
  "O SENHOR é a minha luz e a minha salvação; a quem temerei? O SENHOR é a força da minha vida; de quem me recearei? - Salmo 27:1",
  "O coração alegre aformoseia o rosto, mas pela dor do coração o espírito se abate. - Provérbios 15:13",
  "O meu mandamento é este: Que vos ameis uns aos outros, assim como eu vos amei. - João 15:12",
  "Santificai-vos, pois, e sede santos, pois eu sou o SENHOR, vosso Deus. - Levítico 20:7",
  "O SENHOR te abençoe e te guarde; o SENHOR faça resplandecer o seu rosto sobre ti e te conceda graça. - Números 6:24",
  "Bem-aventurados os que choram, porque eles serão consolados. - Mateus 5:4",
  "Portanto, agora, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor. - 1 Coríntios 13:13",
  "Porque aos seus anjos dará ordens a teu respeito, para que te guardem em todos os teus caminhos. - Salmo 91:11",
  "E o SENHOR irá à sua frente; sim, o Deus de Israel será a sua retaguarda. - Isaías 52:12",
  "O SENHOR é bom, um refúgio em tempos de angústia. Ele conhece os que nele confiam. - Naum 1:7",
  "Ensina-nos a contar os nossos dias, de tal maneira que alcancemos corações sábios. - Salmo 90:12",
  "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a minha destra vitoriosa. - Isaías 41:10",
  "Fica quieto diante do SENHOR e espera com paciência por ele; não te irrites por causa da pessoa que prospera em seu caminho, por causa do homem que executa astutos intentos. - Salmo 37:7",
  "O SENHOR é a minha força e o meu cântico; ele me salvou. - Êxodo 15:2",
  "Alegrem-se sempre no Senhor; outra vez digo, alegrem-se! - Filipenses 4:4",
  "O SENHOR é misericordioso e compassivo, longânimo e assaz benigno. - Salmo 103:8",
  "Os que confiam no SENHOR são como o monte Sião, que não se abala, mas permanece para sempre. - Salmo 125:1",
  "Porque eu sei que o meu Redentor vive e por fim se levantará sobre a terra. - Jó 19:25",
  "O SENHOR é a minha luz e a minha salvação; a quem temerei? O SENHOR é a força da minha vida; de quem me recearei? - Salmo 27:1",
];

function obterValorAleatorio(vetor) {
  var indiceAleatorio = Math.floor(Math.random() * vetor.length);
  return vetor[indiceAleatorio];
}

function exibirDevocional() {
  // Obtive o valor aleatório
  var valorAleatorio = obterValorAleatorio(meuVetor);

  // Exibi dentro da div
  document.getElementById(
    "exibir"
  ).innerHTML = `<span style="color: white">${valorAleatorio}</span>`;
}

/* mychart velho testamento */
const data = {
  labels: ["Acertos", "Erros"],
  datasets: [
    {
      label: "",
      data: [,],
      backgroundColor: ["rgb(0,255,0)", "rgb(255,0,0)"],
      hoverOffset: 4,
    },
  ],
};

const config = {
  type: "doughnut",
  data: data,
};

const myChart = new Chart(document.getElementById("myChart"), config);
