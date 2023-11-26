document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/usuario/buscar/${urlId}`);
      const usuario = response.data;
    console.log(usuario)
      // document.querySelector("#id").textContent = usuario.id_usuario;
      document.querySelector("#nome").textContent = usuario.nome;
      document.querySelector("#telefone").textContent = usuario.telefone;
      document.querySelector("#email").textContent = usuario.email;
      document.querySelector("#cpf").textContent = usuario.cpf;
      document.querySelector("#senha").textContent = usuario.senha;
      document.querySelector("#observacoes").textContent = usuario.observacoes;
      document.querySelector("#tipo").textContent = usuario.tipo;
      document.querySelector("#cartao_id").textContent = usuario.cartao_id;
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