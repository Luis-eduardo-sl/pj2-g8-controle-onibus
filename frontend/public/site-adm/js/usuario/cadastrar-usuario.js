document.addEventListener("DOMContentLoaded", () => {
    displayFlashMessage();
  
    const form = document.querySelector("#form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const nome = document.querySelector("#nome").value;
        const cpf = document.querySelector("#cpf").value;
        const telefone = document.querySelector("#telefone").value;
        const email = document.querySelector("#email").value;
        const senha = document.querySelector("#senha").value;
        const tipo = document.querySelector("#tipo").value;
        const cartao_id = document.querySelector("#cartao_id").value;
        const observacoes = document.querySelector("#observacoes").value;
        const cliente_id = await verifyToken();

        const data = { nome, cpf, telefone, email, senha , tipo, cartao_id , observacoes, cliente_id };
  
        try {
          const response = await axios.post("http://localhost:3000/api/usuario/cadastrar", data);
        
          storeFlashMessage("success", "Cadastro realizado sucesso");
  
          const id = response.data.id;
          window.location.href = `http://localhost:3001/usuarios`;
        } catch (error) {
          triggerFlashMessage("danger", error.message);
        }
      }
      
      form.classList.add("was-validated");
    });
  });