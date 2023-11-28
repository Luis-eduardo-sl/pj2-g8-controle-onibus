document.addEventListener("DOMContentLoaded", async () => {
    const cartaoInput = document.querySelector("#cartao_id");

    cartaoInput.addEventListener("keypress", async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const cartao_id = cartaoInput.value.trim();

            if (isValidCartaoId(cartao_id)) {
                try {
                    await cobrarUsuario(cartao_id);

                    window.location.href = "http://localhost:3001/sistema/aprovado";

                } catch (error) {

                    localStorage.setItem("cartao_id", cartao_id);
                    const errorM = localStorage.setItem("erro" ,error.response.data.error);

                    window.location.href = "http://localhost:3001/sistema/erro";
                }
            } 
        }
    });

    async function cobrarUsuario(cartao_id) {
        try {
        
        const response=    await axios.patch(`http://localhost:3000/api/usuario/cobrar/${cartao_id}`);
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
