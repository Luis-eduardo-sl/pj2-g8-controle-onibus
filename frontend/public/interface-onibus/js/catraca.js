document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/usuario/buscar/${urlId}`);
      const usuario = response.data;
  
      document.querySelector("#id").textContent = usuario.id_usuario;
      document.querySelector("#nome").textContent = usuario.nome;
      document.querySelector("#saldo").textContent = `Saldo Atual: R$ ${Number(usuario.saldo).toFixed(2)}`;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
  
      // Exibe a mensagem de erro na tela de erro
      document.querySelector("#mensagem-erro").textContent = error.message;
      document.querySelector("#tela-erro").style.display = "block";
  
      // Aguarda 5 segundos e redireciona de volta à tela de aproximar
      setTimeout(() => {
        window.location.href = "http://localhost:3001/sistema/aproximar";
      }, 5000);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        try {
          // Realiza a cobrança
          await axios.patch(`http://localhost:3000/api/usuario/cobrar/${urlId}`);
  
          // Atualiza o saldo real após a cobrança
          const responseSaldo = await axios.get(`http://localhost:3000/api/usuario/buscar/${urlId}`);
          const usuario = responseSaldo.data;
  
          // Exibe a tela de boa viagem com o nome do usuário e o saldo restante
          document.querySelector("#mensagem-boa-viagem").textContent = `Boa viagem, ${usuario.nome.split(" ")[0]}!`;
          document.querySelector("#saldo-restante").textContent = `Saldo restante: R$ ${usuario.saldo.toFixed(2)}`;
  
          // Mostra a tela de boa viagem
          window.location.href = "http://localhost:3001/sistema/aprovado";
  
          storeFlashMessage("success", "Cobrança realizada com sucesso");
          document.querySelector("#saldo").textContent = `Saldo Atual: R$ ${usuario.saldo.toFixed(2)}`;
  
          // Aguarda 5 segundos e redireciona de volta à tela de aproximar
          setTimeout(() => {
            window.location.href = "http://localhost:3001/sistema/aproximar";
          }, 5000);
        } catch (error) {
          // Exibe a mensagem de erro na tela de erro
          document.querySelector("#mensagem-erro").textContent = error.message;
          window.location.href = "http://localhost:3001/sistema/erro";
  
          // Aguarda 5 segundos e redireciona de volta à tela de aproximar
          setTimeout(() => {
            window.location.href = "http://localhost:3001/sistema/aproximar";
          }, 5000);
        }
      }
  
      form.classList.add("was-validated");
    });
  });
  