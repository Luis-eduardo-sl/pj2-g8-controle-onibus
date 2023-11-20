document.addEventListener("DOMContentLoaded", async (event) => {
    
    setInterval(atualizarNumeros, 1000);
  
    async function atualizarNumeros() {
      await atualizarContador("http://localhost:3000/api/usuario/countUsuarios", "count-usuario");
      await atualizarContador("http://localhost:3000/api/usuario/countUsuariosComum", "count-usuario-comum");
      await atualizarContador("http://localhost:3000/api/usuario/countUsuariosEstudante", "count-usuario-estudante");
      await atualizarContador("http://localhost:3000/api/usuario/countUsuariosIdoso", "count-usuario-idoso");
      await atualizarContador("http://localhost:3000/api/usuario/countUsuariosDeficiente", "count-usuario-deficiente");
    }
  
    async function atualizarContador(url, id) {
      try {
        const response = await axios.get(url);
        const usuario = response.data;
  
        let spanElement = document.querySelector(`#${id}`);
        spanElement.textContent = usuario.count;
      } catch (error) {
        console.error(`Erro ao buscar os dados para ${id}:`, error);
        throw error; 
      }
    }
  });
  