document.addEventListener("DOMContentLoaded", async (event) => {
    // displayFlashMessage();

    const url = window.location.href;
    const urlId = url.split("/").pop();

    const form = document.querySelector("#form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const cartao_id = document.querySelector("#cartao_id").value;

    try {
        const response = await axios.get(`http://localhost:3000/api/usuario/buscar/cartao/${cartao_id}`);
        const usuario = response.data;
        localStorage.setItem("cartao_id", cartao_id);

        // document.querySelector("#id").textContent = usuario.id_usuario;
        // document.querySelector("#nome").textContent = usuario.nome;
        // document.querySelector("#saldo").textContent = `Saldo Atual: R$ ${Number(usuario.saldo).toFixed(2)}`;

        window.location.href = "http://localhost:3001/sistema/aprovado";
    } catch (error) {
        // triggerFlashMessage("danger", error.message);
        window.location.href = "http://localhost:3001/sistema/erro";
        // Exibe a mensagem de erro na tela de erro
        document.querySelector("#mensagem-erro").textContent = error.message;
        document.querySelector("#tela-erro").style.display = "block";

        // Aguarda 5 segundos e redireciona de volta à tela de aproximar
        setTimeout(() => {
            window.location.href = "http://localhost:3001/sistema/aproximar";
        }, 5000);
    }})
});
