document.addEventListener("DOMContentLoaded", async (event) => {
  displayFlashMessage();

  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/api/onibus/buscar/${urlId}`);
    const onibus = response.data;

    document.querySelector("#id_onibus").value = onibus.id_onibus;
    document.querySelector("#placa").value = onibus.placa;
    document.querySelector("#modelo").value = onibus.modelo;
    document.querySelector("#capacidade").value = onibus.capacidade;
    document.querySelector("#observacoes").value = onibus.observacoes;
  } catch (error) {
    triggerFlashMessage("danger", error.message);
  }

  const form = document.querySelector("#form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const id = document.querySelector("#id_onibus").value;
      const placa = document.querySelector("#placa").value;
      const modelo = document.querySelector("#modelo").value;
      const capacidade = document.querySelector("#capacidade").value;
      const observacoes = document.querySelector("#observacoes").value;

      const data = { id, placa, modelo, capacidade, observacoes };

      try {
        const response = await axios.put(`http://localhost:3000/api/onibus/atualizar/${data.id}`, data);

        storeFlashMessage("success", "Edição realizada com sucesso");

        const id = response.data.id;
        window.location.href = `http://localhost:3001/onibus`;
      } catch (error) {
        triggerFlashMessage("danger", error.message);
      }
    }

    form.classList.add("was-validated");
  });
});
