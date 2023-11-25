document.addEventListener("DOMContentLoaded", () => {
    displayFlashMessage();
  
    const form = document.querySelector("#form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const nome = document.querySelector("#nome").value;
        const inicio = document.querySelector("#inicio").value;
        const termino = document.querySelector("#termino").value;
        const rota = document.querySelector("#rota").value;
  
        const data = { nome, inicio, termino, rota };
  
        try {
          const response = await axios.post("http://localhost:3000/api/linhas/cadastrar", data);
        
          storeFlashMessage("success", "Cadastro realizado sucesso");
  
          const id = response.data.id;
          window.location.href = `http://localhost:5500/frontend/site-adm/forms-linhas.html?`;
        } catch (error) {
          triggerFlashMessage("danger", error.message);
        }
      }
      
      form.classList.add("was-validated");
    });
  });