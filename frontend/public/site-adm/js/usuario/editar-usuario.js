document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/usuario/buscar/${urlId}`);
      const usuario = response.data;
    
      document.querySelector("#id_usuario").value = usuario.id_usuario;
      document.querySelector("#nome").value = usuario.nome;
      document.querySelector("#telefone").value = usuario.telefone;
      document.querySelector("#email").value = usuario.email;
      document.querySelector("#cpf").value = usuario.cpf;
      document.querySelector("#senha").value = usuario.senha;
      document.querySelector("#observacoes").value = usuario.observacoes;
      document.querySelector("#tipo").value = usuario.tipo;
      document.querySelector("#cartao_id").value = usuario.cartao_id;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
          const id = document.querySelector("#id_usuario").value;
          const nome = document.querySelector("#nome").value;
          const telefone = document.querySelector("#telefone").value;
          const email = document.querySelector("#email").value;
          const cpf = document.querySelector("#cpf").value;
          const senha = document.querySelector("#senha").value;
          const observacoes = document.querySelector("#observacoes").value;
          const tipo = document.querySelector("#tipo").value;
          const cartao_id = document.querySelector("#cartao_id").value;
  
          const data = { id, nome, telefone, email, cpf, senha, observacoes, tipo, cartao_id};
  
          try {
            const response = await axios.put(`http://localhost:3000/api/usuario/atualizar/${urlId}`, data);
  
            storeFlashMessage("success", "Edição realizada com sucesso");
          
            const id = response.data.id;        
            window.location.href = `http://localhost:3001/usuarios`;         
          } catch (error) {
            triggerFlashMessage("danger", error.message);
          }
      }
  
      form.classList.add("was-validated");
    });
  });
  