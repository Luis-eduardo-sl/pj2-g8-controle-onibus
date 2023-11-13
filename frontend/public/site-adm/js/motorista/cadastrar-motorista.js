document.addEventListener("DOMContentLoaded", () => {
    displayFlashMessage();
  
    const form = document.querySelector("#form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        // const headers = {"Content-Type": "multipart/form-data"};
        const formData = new FormData(form);

        // const nome = document.querySelector("#nome").value;
        // const cpf = document.querySelector("#cpf").value;
        // const telefone = document.querySelector("#telefone").value;
        // const email = document.querySelector("#email").value;
        // const foto = document.querySelector("#foto").value;
        // const observacoes = document.querySelector("#observacoes").value;
  
        // const data = { nome, cpf, telefone, email, foto , observacoes };
  
        try {
          const response = await axios.post("http://localhost:3000/api/motorista/cadastrar", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          } );
        
          storeFlashMessage("success", "Cadastro realizado sucesso");
  
          const id = response.data.id;
          window.location.href = `http://localhost:3001/motoristas`;
        } catch (error) {
          triggerFlashMessage("danger", error.message);
        }
      }
      
      form.classList.add("was-validated");
    });
  });