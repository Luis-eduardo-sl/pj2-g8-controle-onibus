document.addEventListener("DOMContentLoaded", async () => {
    displayFlashMessage();
  
    const form = document.querySelector("#form-recarga");
  
    const saldoElement = document.querySelector("#saldo");
  
    if (saldoElement) {
      const saldo = saldoElement.value;
      // Restante do código...
    } else {
      console.error("Elemento #saldo não encontrado.");
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const cpf = document.querySelector("#cpfRecarga").value;
  
        // Agora você pode usar a variável 'saldo' que foi definida acima
        // ...
  
        const data = {
          cpf,
          saldo
        };
  
        try {
          const response = await axios.patch(
            `http://localhost:3000/api/usuario/recarregar/${cpf}`,
            data
          );
  
          if (response) {
            storeFlashMessage("success", "Recarga realizada com sucesso");
            // Pode adicionar aqui redirecionamento ou outra ação após o cadastro
          }
        } catch (error) {
          window.location.href = `http://localhost:3001/site/recarga`;
  
          triggerFlashMessage("danger", error.response.data.msg || "Erro na recarga");
          console.error(error.message);
        }
      }
  
      form.classList.add("was-validated");
    });
  });
  