console.log('Я + Чехов = 💖');

const signupForm = document.querySelector('form.signup');
const loginForm = document.querySelector('form.login');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

if (signupForm) {
  console.log('Добрый день, вас приветствует регистрация!');

  signupForm.addEventListener('submit', async (e) => {
    // prevent default & reset errors
    e.preventDefault();
    emailError.textContent = '';
    passwordError.textContent = '';

    // get the values
    const username = signupForm.username.value;
    const bio = signupForm.bio.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    // FETCH
    let response = {};
    const action = e.target.action;
    try {
      response = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, bio, email, password }),
      });
      const data = await response.json();
      console.log('>>>>> SIGNUP FORM DATA >>>>>', data);
      if (data.errors) {
        emailError.textContent = data.errors.email;
        passwordError.textContent = data.errors.password;
      }
      if (data.user) {
        location.assign('/');
      }
    }
    catch (err) {
      console.log(err);
    }
  });
}

if (loginForm) {
  console.log('Добрый день, войдите!');

  loginForm.addEventListener('submit', async (e) => {
    // prevent default & reset errors
    e.preventDefault();
    emailError.textContent = '';
    passwordError.textContent = '';

    // get the values
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    // FETCH
    let response = {};
    const action = e.target.action;
    try {
      response = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('>>>>> LOGIN FORM DATA >>>>>', data);
      if (data.errors) {
        emailError.textContent = data.errors.email;
        passwordError.textContent = data.errors.password;
      }
      if (data.user) {
        location.assign('/');
      }
    }
    catch (err) {
      console.log(err);
    }
  })
}
