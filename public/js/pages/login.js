import {
  createHtmlElement,
  customAppendChild,
  createFormField,
  createPasswordField,
} from '../../utils/dom.js';
import { isRequired } from '../../utils/validayion.js';
export const createLoginPage = () => {
  const app = document.querySelector('.app');
  app.innerHTML = '';
  const mainContent = createHtmlElement('main', [
    'flex-grow',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'bg-gray-50',
    'py-12',
    'px-4',
  ]);

  const headerDiv = createHtmlElement('div', ['text-center', 'mb-8']);
  const siteTitle = createHtmlElement(
    'h1',
    [
      'text-4xl',
      'font-light',
      'text-blue-400',
      'tracking-wide',
      'drop-shadow-sm',
      'font-sans',
    ],
    'FoodAI'
  );
  const pageTitle = createHtmlElement(
    'h2',
    ['text-xl', 'font-semibold', 'text-gray-800', 'mt-2'],
    'Login to Your Account'
  );

  customAppendChild(headerDiv, siteTitle, pageTitle);

  const cardDiv = createHtmlElement('div', [
    'bg-white',
    'rounded-2xl',
    'shadow-xl',
    'p-8',
    'max-w-md',
    'w-full',
    'mx-4',
  ]);

  const loginForm = createHtmlElement('form', ['space-y-6'], '', {
    submit: (e) => {
      e.preventDefault();

      let isValid = true;

      if (!isRequired(inputUser.value)) {
        showError(userError, 'Email or Username is required.');
        isValid = false;
      } else {
        hideError(userError);
      }

      if (!isRequired(inputPass.value)) {
        showError(passwordError, 'Password is required.');
        isValid = false;
      } else {
        hideError(passwordError);
      }

      if (isValid) {
        fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: inputUser.value,
            password: inputPass.value,
          }),
        })
          .then((response) =>
            response
              .json()
              .then((data) => ({ status: response.status, body: data }))
          )
          .then(({ status, body }) => {
            if (status === 200 && body.token) {
              sessionStorage.setItem('token', body.token);
              sessionStorage.setItem('username', body.username);
              document.dispatchEvent(
                new CustomEvent('navigateHome', {
                  detail: { username: body.user.username },
                })
              );
            } else {
              showError(errorMsg, body.error || 'Login failed');
            }
          })
          .catch(() => {
            showError(errorMsg, 'Server error, try again later');
          });
      } else {
        errorMsg.classList.remove('hidden');
      }
    },
  });
  const {
    div: userDiv,
    input: inputUser,
    error: userError,
  } = createFormField(
    'Email or Username',
    'text',
    'user',
    'Enter your email or username'
  );
  const {
    div: passDiv,
    input: inputPass,
    error: passwordError,
  } = createPasswordField('Password', 'password', 'Enter your password');

  const loginBtn = createHtmlElement(
    'button',
    [
      'w-full',
      'bg-blue-400',
      'text-white',
      'py-3',
      'rounded-lg',
      'font-semibold',
      'hover:bg-blue-600',
      'transition',
    ],
    'Login'
  );
  const errorMsg = createHtmlElement(
    'p',
    ['text-red-500', 'text-left', 'mt-2', 'hidden', 'text-sm'],
    ''
  );

  const signupLink = createHtmlElement(
    'p',
    ['text-center', 'text-sm', 'text-gray-600', 'mt-4'],
    "Don't have an account? "
  );
  const signupAnchor = createHtmlElement(
    'a',
    ['text-blue-500', 'font-medium', 'hover:underline'],
    'Sign Up',
    {
      click: () => {
        window.location.hash = '#signup'
        // document.dispatchEvent(new Event('navigateToSignUP'));
      },
    }
  );

  customAppendChild(signupLink, signupAnchor);

  customAppendChild(
    loginForm,
    userDiv,
    passDiv,
    loginBtn,
    errorMsg,
    signupLink
  );
  customAppendChild(cardDiv, loginForm);
  customAppendChild(mainContent, headerDiv, cardDiv);
  customAppendChild(app, mainContent);

  const showError = (errorElement, message) => {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  };

  const hideError = (errorElement) => {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  };
  const validateField = (input, errorElement, validationFn, errorMessage) => {
    if (!validationFn(input.value)) {
      showError(errorElement, errorMessage);
      return false;
    }
    hideError(errorElement);
    return true;
  };

  inputUser.addEventListener('blur', () => {
    validateField(
      inputUser,
      userError,
      isRequired,
      'Username or Email is required.'
    );
  });

  inputPass.addEventListener('blur', () => {
    validateField(
      inputPass,
      passwordError,
      isRequired,
      'Password is required.'
    );
  });
};
