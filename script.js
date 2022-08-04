const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirmation");

form.addEventListener('submit', (e) => {
    e.preventDefault(); // previne o comportamento padrão

    checkInputs();
});

function checkInputs() {
    const usernameValue = username.value; // pegando os valores 
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    if (usernameValue === '') {
        setErrorFor(username, "O nome de usuário é obrigatório.");
    } else {
        setSuccessFor(username);
    }

    if(emailValue === '') {
        setErrorFor(email, 'O email é obrigatório.')
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, 'Por favor, insira um email válido.')
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'A senha é obrigatória.')
    } else if (passwordValue.length < 7) {
        setErrorFor(password, 'A senha precisa ter no mínimo 7 caracteres.')
    } else {
        setSuccessFor(password);
    }

    if (passwordConfirmationValue === '') {
        setErrorFor(passwordConfirmation, 'A confirmação de senha é obrigatória.')
    } else if (passwordConfirmationValue != passwordValue) {
        setErrorFor(passwordConfirmation, 'As senha não conferem.')
    } else {
        setSuccessFor(passwordConfirmation);
    }

    const formControls = form.querySelectorAll('.form-control') // [ ...formControls ] tranformar em um array padrão JS

    const formIsValid =  [ ...formControls ].every(formControl => {
        return (formControl.className === 'form-control success');
    });

    if (formIsValid) {
        console.log('O formulário está 100% válido!');
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement; // Vai retornar a div que é pai do input "form-control"
    const small = formControl.querySelector('small');

    // Adicionar a mensagem de erro
    small.innerText = message;

    // Adicionar a classe de erro 
    formControl.className = 'form-control error';
}


function setSuccessFor(input) {
    const formControl = input.parentElement; // Vai retornar a div que é pai do input

    // Adicionar a classe de sucesso
    formControl.className = 'form-control success';
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
}