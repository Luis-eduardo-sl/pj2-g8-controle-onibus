document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector('#form');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formulario);
        const email = formData.get('email');
        const senha = formData.get('senha');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, senha });
            const { token } = response.data;

            localStorage.setItem('token', token);

            window.location.href = '/';
        } catch (error) {
            console.log("Credenciais Inválidas.");
        }
    });
});