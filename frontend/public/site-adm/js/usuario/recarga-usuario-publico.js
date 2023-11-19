document.addEventListener("DOMContentLoaded", async () => {
  displayFlashMessage();

  const form = document.querySelector("#form-recarga");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const cpf = document.querySelector("#cpfRecarga").value;
      const saldoElement = document.querySelector("#saldo");
      const saldo = saldoElement.value;

      // Verifique se o valor de saldo é um número válido
      if (isNaN(parseFloat(saldo))) {
        console.error("O valor de saldo não é um número válido.");
        return;
      }

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
        triggerFlashMessage("danger", error.response.data.error || "Erro ao tentar realizar recarga");
        console.error(error.message);
      }
    }

    form.classList.add("was-validated");
  });
});
