document.addEventListener("DOMContentLoaded", () => {
    displayFlashMessage();
  
    const form = document.querySelector("#form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const texto = document.querySelector("#texto").value;
        const nome = document.querySelector("#nome").value;
        const email = document.querySelector("#email").value;
  
        const data = { texto, nome, email };
  
        try {
          const response = await axios.post("http://localhost:3000/api/comentario/cadastrar", data);
        
          storeFlashMessage("success", "Comentario realizado com sucesso");
  
          const id = response.data.id;
         window.location.href = `http://localhost:3001/site/sobre`;
        } catch (error) {
        triggerFlashMessage("danger", error.message);
        }
      }
      
      form.classList.add("was-validated");
    });
  });
  