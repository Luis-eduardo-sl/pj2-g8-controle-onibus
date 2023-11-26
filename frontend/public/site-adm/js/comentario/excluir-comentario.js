document.addEventListener("DOMContentLoaded", async (event) => {
    // displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/comentario/buscar/${urlId}`);
      const comentario = response.data;
  
      // document.querySelector("#id").textContent = comentario.id_comentario;
      document.querySelector("#texto").textContent = comentario.texto;
      document.querySelector("#nome").textContent = comentario.nome; // Adicione esta linha
      document.querySelector("#email").textContent = comentario.email; // Adicione esta linha
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.delete(`http://localhost:3000/api/comentario/excluir/${urlId}`);
        
        window.location.href = "http://localhost:3001/comentario";
        // storeFlashMessage("success", "Exclusão realizada com sucesso");
        
      } catch (error) {
        triggerFlashMessage("danger", error.message);
      }
    });
  });
  