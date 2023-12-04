document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/motorista/buscar/${urlId}`);
      const motorista = response.data;
    console.log(
      motorista
    );
      document.querySelector("#id_motorista").value = motorista.id_motorista;
      document.querySelector("#nome").value = motorista.nome;
      document.querySelector("#cpf").value = motorista.cpf;
      document.querySelector("#telefone").value = motorista.telefone;
      document.querySelector("#email").value = motorista.email;
      
      const fotoPreview = document.querySelector("#foto-preview");
      fotoPreview.innerHTML = `<img src="http://localhost:3000/${motorista.foto}" alt="${motorista.nome}" width="70">`;


      console.log(motorista.foto);
      document.querySelector("#observacoes").value = motorista.observacoes;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const formData = new FormData(form);

        
  
          try {
            const response = await axios.put(`http://localhost:3000/api/motorista/atualizar/${urlId}`, formData,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
  
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
  