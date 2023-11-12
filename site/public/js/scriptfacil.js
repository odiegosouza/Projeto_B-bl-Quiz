// Seleção de elementos HTML usando classes
var $startGameButton = document.querySelector(".start-quiz");
var $nextQuestionButton = document.querySelector(".next-question");
var $questionsContainer = document.querySelector(".questions-container");
var $questionText = document.querySelector(".question");
var $answersContainer = document.querySelector(".answers-container");
var $answers = document.querySelectorAll(".answer");

// iniciar as variaveis
var currentQuestionIndex = 0;
var totalCorrect = 0;

// Adiciona ouvintes de eventos aos botões $
$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

// Função para iniciar o quiz
function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  displayNextQuestion();
}

// Função para exibir a próxima pergunta
function displayNextQuestion() {
  // Reseta o estado antes de exibir a próxima pergunta
  resetState();

  // Verifica se todas as perguntas foram respondidas
  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  // Exibe a pergunta atual e suas opções de resposta
  $questionText.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].answers.forEach((answer) => {
    var newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text;
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

// Reseta o estado para a próxima pergunta
function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  $nextQuestionButton.classList.add("hide");
}

// Função para processar a seleção de uma resposta
function selectAnswer(event) {
  var answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
  }

  // Desabilita todas as respostas e destaca a resposta correta/incorreta
  document.querySelectorAll(".answer").forEach((button) => {
    button.disabled = true;

    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  // Exibir o botão de próxima pergunta
  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

// Função para finalizar o jogo e exibir a pontuação
function finishGame() {
  var totalQuestions = questions.length;
  var performance = Math.floor((totalCorrect * 10) / totalQuestions);

  var message = "";

  // Determinar a mensagem com base no desempenho do jogador
  if (performance <= 5) {
    message = "Pode melhorar :(";
  } else if (performance <= 7) {
    message = "Bom :)";
  } else if (performance <= 9) {
    message = "Maravilha, acertou quase todas!";
  } else {
    message = "Parabéns, você acertou tudo!";
  }

  // Atualizar o conteúdo do contêiner de perguntas com a mensagem final e o botão para refazer o teste
  $questionsContainer.innerHTML = `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões! <br> <br>
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button">Voltar</button>
  `;
}

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
];
