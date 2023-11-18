document.addEventListener("DOMContentLoaded", async () => {
    try {
        const cartao_id = localStorage.getItem("cartao_id");

        const response = await axios.get(`http://localhost:3000/api/usuario/buscar/cartao/${cartao_id}`);
        const usuario = response.data;

        document.querySelector("#id").textContent = usuario.id_usuario;
        document.querySelector("#nome").textContent = usuario.nome;
        document.querySelector("#saldo").textContent = `Saldo Atual: R$ ${Number(usuario.saldo).toFixed(2)}`;
    } catch (error) {
        // Verifica o tipo de erro
        if (error.response && error.response.status === 404) {
            // Erro 404 indica que o cartão não foi encontrado
            document.querySelector("#mensagem-erro").textContent = "Cartão não encontrado. Por favor, tente novamente.";
        } else if (error.response && error.response.status === 400) {
            // Erro 400 pode indicar um pedido inválido, como saldo insuficiente
            document.querySelector("#mensagem-erro").textContent = "Saldo insuficiente.";
        } else {
            // Outros erros não específicos
            document.querySelector("#mensagem-erro").textContent = "Não foi possível processar a transação. Tente novamente mais tarde.";
        }

        document.querySelector("#tela-erro").style.display = "block";

        // Adicione um setTimeout para garantir que a mensagem de erro seja exibida antes do redirecionamento
        setTimeout(() => {
            window.location.href = "http://localhost:3001/sistema/aproxime";
        }, 5000);
    }
});
