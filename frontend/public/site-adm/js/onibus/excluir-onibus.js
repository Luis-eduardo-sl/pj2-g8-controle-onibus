document.addEventListener("DOMContentLoaded", async (event) => {
  displayFlashMessage();

  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/api/onibus/buscar/${urlId}`);
    const onibus = response.data;

    document.querySelector("#id").textContent = onibus.id_onibus;
    document.querySelector("#placa").textContent = onibus.placa;
    document.querySelector("#modelo").textContent = onibus.modelo; // Adicione esta linha
    document.querySelector("#capacidade").textContent = onibus.capacidade; // Adicione esta linha
    document.querySelector("#observacoes").textContent = onibus.observacoes; // Adicione esta linha
  } catch (error) {
    triggerFlashMessage("danger", error.message);
  }

  const form = document.querySelector("#form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:3000/api/onibus/excluir/${urlId}`);

      storeFlashMessage("success", "Exclusão realizada com sucesso");
      window.location.href = "http://localhost:3001/onibus";
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  });
});
