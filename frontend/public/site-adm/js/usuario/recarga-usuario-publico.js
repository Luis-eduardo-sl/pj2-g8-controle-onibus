document.addEventListener("DOMContentLoaded", async () => {
  displayFlashMessage();

  const form = document.querySelector("#form-recarga");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const cpf = document.querySelector("#cpfRecarga").value;
      const saldoElement = document.querySelector("#saldo");
      const saldo = saldoElement.value;

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
          `http://localhost:3000/api/usuario/recarregar/cpf/${cpf}`,
          data
        );

        storeFlashMessage("success", "Recarga realizada com sucesso");

        window.location.href = `http://localhost:3001/site/recarga`;         

        // if (response) {
        //   storeFlashMessage("success", "Recarga realizada com sucesso");
        // }
      } catch (error) {
        triggerFlashMessage("danger", error.response.data.error || "Erro ao tentar realizar recarga");
      }
    }

    form.classList.add("was-validated");
  });
});
