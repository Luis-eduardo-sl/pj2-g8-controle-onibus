document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
    let usuario ;

    try {
      const response = await axios.get(`http://localhost:3000/api/usuario/buscar/${urlId}`);
       usuario = response.data;
    
      document.querySelector("#id").textContent = usuario.id_usuario;
      document.querySelector("#nome").textContent = usuario.nome;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {

          try {
            const saldo = document.querySelector("#saldo").value;
            const novoSaldo = Number(usuario.saldo) + Number(saldo);
            
            const data = { saldo: novoSaldo };

            const response = await axios.patch(`http://localhost:3000/api/usuario/recarregar/${urlId}`, data);
  
            storeFlashMessage("success", "Recarga realizada com sucesso");
          
            const id = response.data.id;        
            window.location.href = `http://localhost:3001/usuarios`;         
          } catch (error) {
            triggerFlashMessage("danger", error.message);
          }
      }
  
      form.classList.add("was-validated");
    });
  });
  