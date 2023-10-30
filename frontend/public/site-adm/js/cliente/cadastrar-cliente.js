document.addEventListener("DOMContentLoaded", () => {
    displayFlashMessage();
  
    const form = document.querySelector("#form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const nome = document.querySelector("#nome").value;
        const email = document.querySelector("#email").value;
        const senha = document.querySelector("#senha").value;
  
  
        const data = { nome, email, senha };
  
        try {
          const response = await axios.post("http://localhost:3000/api/cliente/cadastrar", data);
        
          storeFlashMessage("success", "Cadastro realizado sucesso");
  
          const id = response.data.id;
          window.location.href = `http://localhost:3001/registro`;
        } catch (error) {
          triggerFlashMessage("danger", error.message);
        }
      }
      
      form.classList.add("was-validated");
    });
  });