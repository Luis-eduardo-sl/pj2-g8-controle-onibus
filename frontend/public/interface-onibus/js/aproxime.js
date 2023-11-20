document.addEventListener("DOMContentLoaded", async () => {
    const cartaoInput = document.querySelector("#cartao_id");

    cartaoInput.addEventListener("keypress", async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const cartao_id = cartaoInput.value.trim();

            if (cartao_id !== "") {
                try {
                    await cobrarUsuario(cartao_id);
                    // Aguarde um pouco para a cobrança ser concluída
                    // await new Promise(resolve => setTimeout(resolve, 1000));

                    // Redirecione para a tela de aproximar
                    window.location.href = "http://localhost:3001/sistema/aprovado";
                } catch (error) {
                    // Exiba a mensagem de erro
                    console.error(error);

                    // Redirecione para a tela de erro
                    window.location.href = "http://localhost:3001/sistema/erro";
                }
            }
        }
    });

    async function cobrarUsuario(cartao_id) {
        try {
            await axios.patch(`http://localhost:3000/api/usuario/cobrar/${cartao_id}`);
        } catch (error) {
            throw error;
        }
    }
});
