document.addEventListener("DOMContentLoaded", async (event) => {
  
    setInterval(atualizarNumeroLinhas, 1000);
  
    async function atualizarNumeroLinhas() {
      await atualizarContador("http://localhost:3000/api/linhas/countLinhas", "count-linha");
    }
  
    async function atualizarContador(url, id) {
      try {
        const response = await axios.get(url);
        const linha = response.data;
  
        let spanElement = document.querySelector(`#${id}`);
        spanElement.textContent = linha.count;
  
        // Atualize a animação para o novo valor
        // countLinha.update(linha.count);
      } catch (error) {
        console.error(`Erro ao buscar os dados para ${id}:`, error);
      }
    }
  });
  