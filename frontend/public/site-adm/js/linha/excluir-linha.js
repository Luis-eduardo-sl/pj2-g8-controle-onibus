document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/linhas/buscar/${urlId}`);
      const linha = response.data;
    
      document.querySelector("#id").textContent = linha.id;
      document.querySelector("#nome").textContent = linha.nome;
      document.querySelector("#inicio").textContent = linha.inicio;
      document.querySelector("#termino").textContent = linha.termino;
      document.querySelector("#rota").textContent = linha.rota;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.delete(`http://localhost:3000/api/linhas/excluir/${urlId}`);
  
        storeFlashMessage("success", "Exclusão realizada com sucesso");
        window.location.href = "http://localhost:3001/linhas";    
      } catch (error) {
        triggerFlashMessage("danger", error.message);
      }
    });
  });