document.addEventListener("DOMContentLoaded", async (event) => {
    event.preventDefault();

        try {
            // Realiza a cobrança
            const cartao_id = localStorage.getItem("cartao_id");

            await axios.patch(`http://localhost:3000/api/usuario/cobrar/${cartao_id}`);


            // Atualiza o saldo real após a cobrança
            const responseSaldo = await axios.get(`http://localhost:3000/api/usuario/buscar/cartao/${cartao_id}`);
            const usuario = responseSaldo.data;

            // Exibe a tela de boa viagem com o nome do usuário e o saldo restante
            document.querySelector("#mensagem-boa-viagem").textContent = `Boa viagem, ${usuario.nome.split(" ")[0]}!`;
            document.querySelector("#saldo-restante").textContent = `Saldo restante: R$ ${usuario.saldo.toFixed(2)}`;

            // Mostra a tela de boa viagem
            window.location.href = "http://localhost:3001/sistema/aprovado";

            storeFlashMessage("success", "Cobrança realizada com sucesso");
            document.querySelector("#saldo").textContent = `Saldo Atual: R$ ${usuario.saldo.toFixed(2)}`;

            // Aguarda 5 segundos e redireciona de volta à tela de aproximar
            setTimeout(() => {
                window.location.href = "http://localhost:3001/sistema/aproximar";
            }, 5000);
        } catch (error) {
            // Exibe a mensagem de erro na tela de erro
            document.querySelector("#mensagem-erro").textContent = error.message;
            window.location.href = "http://localhost:3001/sistema/erro";

            // Aguarda 5 segundos e redireciona de volta à tela de aproximar
            setTimeout(() => {
                window.location.href = "http://localhost:3001/sistema/aproximar";
            }, 5000);
        }
    

});
