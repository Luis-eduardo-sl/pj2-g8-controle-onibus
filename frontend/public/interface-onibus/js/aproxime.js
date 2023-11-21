document.addEventListener("DOMContentLoaded", async () => {
    const cartaoInput = document.querySelector("#cartao_id");

    cartaoInput.addEventListener("keypress", async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const cartao_id = cartaoInput.value.trim();

            if (isValidCartaoId(cartao_id)) {
                try {
                    await cobrarUsuario(cartao_id);

                    // Redirecione para a tela de aprovado
                    window.location.href = "http://localhost:3001/sistema/aprovado";
                } catch (error) {
                    // Exiba a mensagem de erro
                    console.error(error);

                    // Redirecione para a tela de erro
                    window.location.href = "http://localhost:3001/sistema/erro";
                }
            } else {
                // Redirecione para a tela de erro se o cartao_id for inválido
                console.error("ID do cartão inválido.");
                window.location.href = "http://localhost:3001/sistema/erro";
            }
        }
    });

    async function cobrarUsuario(cartao_id) {
        try {
            await axios.patch(`http://localhost:3000/api/usuario/cobrar/${cartao_id}`);
            localStorage.setItem("cartao_id", cartao_id);
        } catch (error) {
            console.error(error);

            // Remova o cartao_id do localStorage em caso de erro
            localStorage.removeItem("cartao_id");

            throw error; // Propague o erro para que a mensagem de erro seja exibida
        }
    }

    function isValidCartaoId(cartao_id) {
        return cartao_id !== "";
    }
});
