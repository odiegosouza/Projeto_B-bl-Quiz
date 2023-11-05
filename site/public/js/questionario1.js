// exibindo o primeiro bloco de perguntas
document.getElementsByClassName('container')[0].style.display = "block";

// DEFININDO A FUNÇÃO PRÓXIMO
function next(id) {
    document.getElementsByClassName('container')[id-1].style.display = "none";
    document.getElementsByClassName('container')[id].style.display = "block";
}
// obtendo o resultado final
function result() {
    var score = 0;
    if (document.getElementById('correct1').checked) {
        score++;
    }
    if (document.getElementById('correct2').checked) {
        score++;
    }
    if (document.getElementById('correct3').checked) {
        score++;
    }
    alert("Sua pontuação é: "+ score);
}
