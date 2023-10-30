document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/motorista/buscar/${urlId}`);
      const motorista = response.data;
    
      document.querySelector("#id").textContent = motorista.id_motorista;
      document.querySelector("#nome").textContent = motorista.nome;
      document.querySelector("#cpf").textContent = motorista.cpf;
      document.querySelector("#telefone").textContent = motorista.telefone;
      document.querySelector("#email").textContent = motorista.email;
      document.querySelector("#foto").textContent = motorista.foto;
      document.querySelector("#observacoes").textContent = motorista.observacoes;
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