const createUserButtonElement = document.querySelector('button[type=submit]');

const allInputsElements = document.querySelectorAll('input');

let formData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: false,
};
createUserButtonElement.addEventListener('click', (event) => {
  event.preventDefault();
  if (formData.passwordConfirm) {
    createUser();
  } else {
    alert('deu ruim');
  }
});
// 12345678
for (let input of allInputsElements) {
  input.addEventListener('keyup', (event) => {
    if (input.checkValidity()) {
      input.classList.remove('invalid');
      formData[input.id] = input.value;
    } else {
      input.classList.add('invalid');
      formData[input.id] = '';
    }
    if (input.id == 'passwordConfirm') {
      if (input.value === formData.password && input.checkValidity()) {
        formData[input.id] = true;
      } else {
        input.classList.add('invalid');
        formData[input.id] = false;
      }
    }

    console.log(formData);
  });
}

var requestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// Variavel que irá conter o nosso objeto de configuração da requisição
var requestPostConfiguration = {
  method: 'POST',
  headers: requestHeaders,
};
function createUser() {
  requestPostConfiguration.body = JSON.stringify(formData);

  // O Fetch é responsável por fazer uma requisição para um back-end
  // O parametro do fetch serve justamente para especificarmos aonde ele irá fazer a requisição
  fetch(
    'https://ctd-todo-api.herokuapp.com/v1/users',
    requestPostConfiguration,
  ).then((response) => {
    response.json().then((info) => {
      if (response.ok == true) {
        alert('Parabens! Usuário criado com sucesso.');
        // Simulate a mouse click:
        window.location.href = './../index.html';
      } else {
        if (info === 'El usuario ya se encuentra registrado') {
          alert('O e-mail digitado ja esta cadastrado');
        }
      }
    });
  });
  // window.location.href = './../index.html';
}
