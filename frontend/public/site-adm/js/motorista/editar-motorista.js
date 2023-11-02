document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/motorista/buscar/${urlId}`);
      const motorista = response.data;
    
      document.querySelector("#id_motorista").value = motorista.id_motorista;
      document.querySelector("#nome").value = motorista.nome;
      document.querySelector("#cpf").value = motorista.cpf;
      document.querySelector("#telefone").value = motorista.telefone;
      document.querySelector("#email").value = motorista.email;
      document.querySelector("#foto").textContent = motorista.foto;
      document.querySelector("#observacoes").value = motorista.observacoes;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
          const id = document.querySelector("#id_motorista").value;
          const nome = document.querySelector("#nome").value;
          const cpf = document.querySelector("#cpf").value;
          const telefone = document.querySelector("#telefone").value;
          const email = document.querySelector("#email").value;
          const foto = document.querySelector("#foto").value;
          const observacoes = document.querySelector("#observacoes").value;
  
          const data = { id, nome, cpf, telefone, email, foto, observacoes };
  
          try {
            const response = await axios.put(`http://localhost:3000/api/motorista/atualizar/${urlId}`, data);
  
            storeFlashMessage("success", "Edição realizada com sucesso");
          
            const id = response.data.id;        
            window.location.href = `http://localhost:3001/motoristas`;         
          } catch (error) {
            triggerFlashMessage("danger", error.message);
          }
      }
  
      form.classList.add("was-validated");
    });
  });
  