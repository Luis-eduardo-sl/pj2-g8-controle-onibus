document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/motorista/buscar/${urlId}`);
      const motorista = response.data;
    
      document.querySelector("#id").value = motorista.id;
      document.querySelector("#nome").value = motorista.nome;
      document.querySelector("#cpf").value = motorista.cpf;
      document.querySelector("#telefone").value = motorista.telefone;
      document.querySelector("#email").value = motorista.email;
      document.querySelector("#foto").value = motorista.foto;
      document.querySelector("#observacoes").value = motorista.observacoes;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.delete(`http://localhost:3000/api/motorista/excluir/${urlId}`);
  
        storeFlashMessage("success", "Exclusão realizada com sucesso");
        window.location.href = "http://localhost:3001/motoristas";    
      } catch (error) {
        triggerFlashMessage("danger", error.message);
      }
    });
  });