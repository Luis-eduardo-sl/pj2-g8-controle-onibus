document.addEventListener("DOMContentLoaded", () => {
  displayFlashMessage();

  const form = document.querySelector("#form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const placa = document.querySelector("#placa").value;


      const data = { placa };

      try {
        const response = await axios.post("http://localhost:3000/api/onibus/cadastrar", data);
      
        storeFlashMessage("success", "Cadastro realizado sucesso");

        const id = response.data.id;
        window.location.href = `http://localhost:5500/frontend/site-adm/forms-onibus.html?`;
      } catch (error) {
        triggerFlashMessage("danger", error.message);
      }
    }
    
    form.classList.add("was-validated");
  });
});