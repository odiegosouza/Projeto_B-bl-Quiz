
function entrar() {
  // Obtendo referência ao elemento HTML com a classe "sucess"
  var aviso = document.querySelector(".sucess");

  // Obtendo os valores dos campos de email e senha do formulário
  var emailVar = in_email.value;
  var senhaVar = in_senha.value;

  // Exibindo os valores dos campos no console
  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  if (emailVar == "" || senhaVar == "") {
    cardErro.style.display = "block"
    mensagem_erro.innerHTML = "Campo Email e Senha vazios!";
    finalizarAguardar();
    return false;
}
else {
    setInterval(sumirMensagem, 5000)
}
  // Enviando uma requisição POST para o servidor com os dados de login
  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!");

      // Verificando se a resposta da requisição foi bem-sucedida (status 200 OK)
      if (resposta.ok) {
        // Convertendo a resposta para JSON
        resposta.json().then((json) => {
          // Armazenando algumas informações no sessionStorage do navegador
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.id;
          
          // Alterando a aparência do elemento com a classe "sucess"
          aviso.style.zIndex = "999";
          setTimeout(() => {
            aviso.style.opacity = "1";
          }, 400);

          // Redirecionando para "telaUsuario.html" após 5 segundos
          setTimeout(function () {
            window.location = "telaUsuario.html";
          }, 5000);
        });
      } else {
        // Se a resposta não foi bem-sucedida, exibindo um alerta com o texto da resposta
        resposta.text().then((texto) => {
          console.error(texto);
          alert(texto);
        });
      }
    })
    .catch(function (erro) {
      // Capturando e tratando possíveis erros durante a requisição
      console.log(erro);
    });

  // Impedindo o envio do formulário (recarregar a página)
  return false;
}

