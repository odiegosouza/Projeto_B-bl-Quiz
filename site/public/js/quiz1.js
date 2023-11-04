var myQuestions = [
	{
		question: "Quem traiu Jesus?",
		answers: {
			a: 'Pedro',
			b: 'Judas',
			c: 'Isaque',
			d: 'Moisés'
		},
		correctAnswer: 'b'
	},
	{
		question: "Quem negou Jesus 3 vezes?",
		answers: {
			a: 'Jacó',
			b: 'Lucas',
			c: 'Pedro',
			d: 'Thiago'
		},
		correctAnswer: 'c'
	},
	{
		question: "Qual o nome do rapazinho que venceu o gigante Golias?",
		answers: {
			a: 'Davi',
			b: 'Samuel',
			c: 'Levi',
			d: 'Adão'
		},
		correctAnswer: 'a'
	},
  {
		question: "Quantos eram os discípulos de Jesus?",
		answers: {
			a: '4',
			b: '12',
			c: '16',
			d: '40'
		},
		correctAnswer: 'b'
	},
  {
		question: "Qual é o primeiro livro da Bíblia?",
		answers: {
			a: 'Isaías',
			b: 'Mateus',
			c: 'Salmos',
			d: 'Gênesis'
		},
		correctAnswer: 'd'
	},
  {
		question: "Qual é o último livro da Bíblia?",
		answers: {
			a: 'Malaquias',
			b: 'Apocalipse',
			c: 'Provérbios',
			d: 'Lucas'
		},
		correctAnswer: 'b'
	},
  {
		question: "Que profeta foi engolido por um grande peixe?",
		answers: {
			a: 'Jó',
			b: 'José',
			c: 'Jonas',
			d: 'Joel'
		},
		correctAnswer: 'c'
	},
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
		// precisaremos de um lugar para armazenar a saída e as opções de resposta
		var output = [];
		var answers; // poderia ter dado outro nome, alem do mais, eu mesmo me confundi :/

		// para cada questão
		for(var i=0; i<questions.length; i++){
			
			// mas, primeiro resetamos a lista de questões
			answers = [];

			// e aqui faremos para cada resposta na questão.
			for(letter in questions[i].answers){

				// Aqui será escrito para html para usar o Radio.
				answers.push(
					'<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
					//	+ letter + ') ' vou deixar a letra comentada, porque achei melhor assim
						+ questions[i].answers[letter]
					+ '</label>'
				);
			}

			// add this question and its answers to the output
			output.push(
				'<div class="question">' + questions[i].question + '</div>'
				+ '<div class="answers">' + answers.join('') + '</div>'
			);
		}

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
	}


	function showResults(questions, quizContainer, resultsContainer){
			
		
		var answerContainers = quizContainer.querySelectorAll('.answers');
		
		
		var userAnswer = '';
		var numCorrect = 0;
		
		
		for(var i=0; i<questions.length; i++){

			// agora ele vai virar a letra que esta marcada.
			userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
			
			
			
			if(userAnswer===questions[i].correctAnswer){
				
				numCorrect++;
				
				
				answerContainers[i].style.color = 'green';
			}
			
			else{
				
				answerContainers[i].style.color = 'red';
			}
		}

			
			resultsContainer.innerHTML = numCorrect + ' de ' + questions.length;
		}

	// show questions right away
	showQuestions(questions, quizContainer);

	// on submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}
