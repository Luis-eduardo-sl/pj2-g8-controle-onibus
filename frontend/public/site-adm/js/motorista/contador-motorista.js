document.addEventListener("DOMContentLoaded", async (event) => {
  
    setInterval(atualizarNumeroMotoristas, 1000);
  
    async function atualizarNumeroMotoristas() {
      await atualizarContador("http://localhost:3000/api/motorista/countMotoristas", "count-motorista");
    }
  
    async function atualizarContador(url, id) {
      try {
        const response = await axios.get(url);
        const motorista = response.data;
  
        let spanElement = document.querySelector(`#${id}`);
        spanElement.textContent = motorista.count;
  
        // Atualize a animação para o novo valor
        // countLinha.update(linha.count);
      } catch (error) {
        console.error(`Erro ao buscar os dados para ${id}:`, error);
      }
    }
  });
  