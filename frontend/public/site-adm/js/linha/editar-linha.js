document.addEventListener("DOMContentLoaded", async (event) => {
  displayFlashMessage();
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/api/linhas/buscar/${urlId}`
    );
    const linha = response.data;

    document.querySelector("#id_linha").value = linha.id_linha;
    document.querySelector("#nome").value = linha.nome;
    document.querySelector("#inicio").value = linha.inicio.substring(11, 16);
    document.querySelector("#termino").value = linha.termino.substring(11, 16);
    document.querySelector("#rota").value = linha.rota;
    document.querySelector("#freq_semanal").value = linha.freq_semanal; // Adicione esta linha
  } catch (error) {
    triggerFlashMessage("danger", error.message);
  }

  const form = document.querySelector("#form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const id = document.querySelector("#id_linha").value;
      const nome = document.querySelector("#nome").value;
      const inicio = document.querySelector("#inicio").value;
      const termino = document.querySelector("#termino").value;
      const rota = document.querySelector("#rota").value;
      const freq_semanal = document.querySelector("#freq_semanal").value; // Adicione esta linha

      const data = { id, nome, inicio, termino, rota, freq_semanal }; // Adicione freq_semanal

      try {
        const response = await axios.put(
          `http://localhost:3000/api/linhas/editar/${urlId}`,
          data
        );

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
