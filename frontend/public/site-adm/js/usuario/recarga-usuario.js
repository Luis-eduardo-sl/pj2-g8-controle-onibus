document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/usuario/buscar/${urlId}`);
      const usuario = response.data;
    
      document.querySelector("#id_usuaio").value = usuario.id_usuario;
      document.querySelector("#saldo").value = usuario.saldo;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
          const id = document.querySelector("#id").value;
          const saldo = document.querySelector("#saldo").value;
  
          const data = { id, saldo };
  
          try {
            const response = await axios.put(`http://localhost:3000/api/usuario/atualizar/${urlId}`, data);
  
            storeFlashMessage("success", "Recarga realizada com sucesso");
          
            const id = response.data.id;        
            window.location.href = `http://localhost:3001/recarga`;         
          } catch (error) {
            triggerFlashMessage("danger", error.message);
          }
      }
  
      form.classList.add("was-validated");
    });
  });
  