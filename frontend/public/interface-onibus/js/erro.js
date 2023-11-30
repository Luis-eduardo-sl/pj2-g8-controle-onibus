document.addEventListener("DOMContentLoaded", async () => {
    try {
        const cartao_id = localStorage.getItem("cartao_id");
        
        const response = await axios.get(`http://localhost:3000/api/usuario/buscar/cartao/${cartao_id}`);
        const usuario = response.data;
        
        const erro = localStorage.getItem("erro");
        document.querySelector("#mensagem-erro").textContent = erro;
         localStorage.removeItem("erro");

        document.querySelector("#saldo").textContent = `Saldo Atual: R$ ${Number(usuario.saldo).toFixed(2)}`;

        document.querySelector("#tela-erro").style.display = "block";

        // Adicione um setTimeout para garantir que a mensagem de erro seja exibida antes do redirecionamento
        setTimeout(() => {
            localStorage.removeItem("cartao_id");
            window.location.href = "http://localhost:3001/sistema";
        }, 5000);

    } catch (error) {
        const erro = localStorage.getItem("erro");
        document.querySelector("#mensagem-erro").textContent = erro;
         localStorage.removeItem("erro");

         document.querySelector("#tela-erro").style.display = "block";

         setTimeout(() => {
             localStorage.removeItem("cartao_id");
             window.location.href = "http://localhost:3001/sistema";
         }, 5000);
        
    }
});
