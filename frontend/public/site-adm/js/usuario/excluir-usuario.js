document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/usuario/buscar/${urlId}`);
      const usuario = response.data;
    
      document.querySelector("#id").value = usuario.id;
      document.querySelector("#nome").value = usuario.nome;
      document.querySelector("#telefone").value = usuario.telefone;
      document.querySelector("#email").value = usuario.email;
      document.querySelector("#cpf").value = usuario.cpf;
      document.querySelector("#senha").value = usuario.senha;
      document.querySelector("#observacoes").value = usuario.observacoes;
      document.querySelector("#saldo").value = usuario.saldo;
      document.querySelector("#tipo").value = usuario.tipo;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.delete(`http://localhost:3000/api/usuario/excluir/${urlId}`);
  
        storeFlashMessage("success", "Exclusão realizada com sucesso");
        window.location.href = "http://localhost:3001/usuarios";    
      } catch (error) {
        triggerFlashMessage("danger", error.message);
      }
    });
  });