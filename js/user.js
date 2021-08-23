const userData = JSON.parse(sessionStorage.getItem('user'));

const IdField = document.getElementById('Id');
IdField.value = userData.inscricao;

const EmailField = document.getElementById('Email');
EmailField.value = userData.email;

const NameField = document.getElementById('Name');
NameField.value = userData.nome;

const LoginField = document.getElementById('Login');
LoginField.value = userData.login;

const PassField = document.getElementById('Pass');
const UpdatedForm = document.getElementById('UpdatedForm');

const baseUrl = 'http://localhost:3000/api/v1/';

UpdatedForm.onsubmit = (e) => {
  e.preventDefault();

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  fetch(`${baseUrl}usuario/atualizar`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      inscricao: IdField.value,
      email: EmailField.value,
      login: LoginField.value,
      nome: NameField.value,
      senha: PassField.value
    })
  })
  .then(res => {
    if (res.status >= 400 && res.status < 600) {
      throw new Error("Bad res from server");
    }
    return res.json();
  })
  .then(res => setUserSessionStorage(res))
  .catch(res => console.log(res));
}

const DeleteUser = document.getElementById('DeleteUser');
DeleteUser.onclick = () => {
  fetch(`${baseUrl}usuario/deletar/${IdField.value}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (res.status >= 400 && res.status < 600) {
      throw new Error("Bad res from server");
    }
    return res.json();
  })
  .then(() => {
    sessionStorage.removeItem('user');
    window.location.reload();
  })
  .catch(res => console.log(res));

}
