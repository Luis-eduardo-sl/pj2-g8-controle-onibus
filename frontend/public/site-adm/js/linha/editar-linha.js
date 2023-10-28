document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/linhas/buscar/${urlId}`);
      const linha = response.data;
    
      document.querySelector("#id").value = linha.id;
      document.querySelector("#nome").value = linha.nome;
      document.querySelector("#inicio").value = linha.inicio;
      document.querySelector("#termino").value = linha.termino;
      document.querySelector("#rota").value = linha.rota;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#linhaOnibusForm");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
          const id = document.querySelector("#id").value;
          const nome = document.querySelector("#nome").value;
          const inicio = document.querySelector("#inicio").value;
          const termino = document.querySelector("#termino").value;
          const rota = document.querySelector("#rota").value;
  
          const data = { id, nome, inicio, termino, rota };
  
          try {
            const response = await axios.put(`http://localhost:3000/api/linhas/editar/${data.id}`, data);
  
            storeFlashMessage("success", "Edição realizada com sucesso");
          
            const id = response.data.id;        
            window.location.href = `http://localhost:3001/linhas`;         
          } catch (error) {
            triggerFlashMessage("danger", error.message);
          }
      }
  
      form.classList.add("was-validated");
    });
  });
  