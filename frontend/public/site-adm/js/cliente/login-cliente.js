document.addEventListener('DOMContentLoaded', () => {
    displayFlashMessage();
    console.log('oi');

    const form = document.querySelector('#form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        if (form.checkValidity()) {
            try {
                const formData = new FormData(form);
                const data = {
                    email: formData.get('email'),
                    senha: formData.get('senha')
                };
console.log(data);
                const response = await axios.post('http://localhost:3000/api/cliente/login', data);

                // Cookies.set('jwt', response.data.token, { expires: 1, path: '/' });
                // Cookies.set('flash', JSON.stringify({ type: 'success', message: 'Login realizado com sucesso!' }), { expires: 1, path: '/' });
                console.log("Login realizado com sucesso.");

                window.location.href = '/';
            } catch (error) {
                // Cookies.set('flash', JSON.stringify({ type: 'danger', message: error.response.data.mensagem }), { expires: 1, path: '/' });
                console.error('Ocorreu um erro ao realizar o login: ', error);

                displayFlashMessage();
            }
        }

        form.classList.add('was-validated')
    }, false)
});