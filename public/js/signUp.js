import { createHtmlElement, customAppendChild } from '../utils/dom.js';

export const createSignUpPage = () => {
  const app = document.querySelector('.app');

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
    'Create Your Account'
  );
  const subtitle = createHtmlElement(
    'p',
    ['text-gray-500', 'mt-1', 'text-sm'],
    'i will edit soon'
  );

  customAppendChild(headerDiv, siteTitle, pageTitle, subtitle);

  const cardDiv = createHtmlElement('div', [
    'bg-white',
    'rounded-2xl',
    'shadow-xl',
    'p-8',
    'max-w-md',
    'w-full',
    'mx-4',
  ]);

  const registerForm = createHtmlElement('form', ['space-y-6'], '');

  const usernameDiv = createHtmlElement('div');
  const labelUsername = createHtmlElement(
    'label',
    ['block', 'text-gray-700', 'font-medium', 'mb-2'],
    'Username'
  );
  const inputUsername = createHtmlElement('input', [
    'w-full',
    'px-4',
    'py-2.5',
    'border',
    'border-gray-300',
    'rounded-lg',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'transition',
  ]);
  inputUsername.type = 'text';
  inputUsername.name = 'username';
  inputUsername.placeholder = 'Enter your username';

  const emailDiv = createHtmlElement('div');
  const labelEmail = createHtmlElement(
    'label',
    ['block', 'text-gray-700', 'font-medium', 'mb-2'],
    'Email'
  );
  const inputEmail = createHtmlElement('input', [
    'w-full',
    'px-4',
    'py-2.5',
    'border',
    'border-gray-300',
    'rounded-lg',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'transition',
  ]);
  inputEmail.type = 'email';
  inputEmail.name = 'email';
  inputEmail.placeholder = 'Enter your email';

  const passDiv = createHtmlElement('div');
  const labelPass = createHtmlElement(
    'label',
    ['block', 'text-gray-700', 'font-medium', 'mb-2'],
    'Password'
  );
  const inputPass = createHtmlElement('input', [
    'w-full',
    'px-4',
    'py-2.5',
    'border',
    'border-gray-300',
    'rounded-lg',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'transition',
  ]);
  inputPass.type = 'password';
  inputPass.name = 'password';
  inputPass.placeholder = 'Enter your password';

  const confirmDiv = createHtmlElement('div');
  const labelConfirm = createHtmlElement(
    'label',
    ['block', 'text-gray-700', 'font-medium', 'mb-2'],
    'Confirm Password'
  );
  const inputConfirm = createHtmlElement('input', [
    'w-full',
    'px-4',
    'py-2.5',
    'border',
    'border-gray-300',
    'rounded-lg',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'transition',
  ]);
  inputConfirm.type = 'password';
  inputConfirm.name = 'confirmPassword';
  inputConfirm.placeholder = 'Re-enter your password';

  const registerBtn = createHtmlElement(
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
    'Sign Up'
  );
  const errorMsg = createHtmlElement(
    'p',
    ['text-red-600', 'text-sm','hidden', 'text-left'],
    'Please fill in all fields'
  );

  const loginLink = createHtmlElement(
    'p',
    ['text-center', 'text-sm', 'text-gray-600', 'mt-4'],
    'Already have an account? '
  );
  const loginAnchor = createHtmlElement(
    'a',
    ['text-blue-500', 'font-medium', 'hover:underline'],
    'Log in'
  );
  loginLink.appendChild(loginAnchor);

  customAppendChild(usernameDiv, labelUsername, inputUsername);
  customAppendChild(emailDiv, labelEmail, inputEmail);
  customAppendChild(passDiv, labelPass, inputPass);
  customAppendChild(confirmDiv, labelConfirm, inputConfirm);

  customAppendChild(
    registerForm,
    usernameDiv,
    emailDiv,
    passDiv,
    confirmDiv,
    registerBtn,
    errorMsg,
    loginLink
  );

  customAppendChild(cardDiv, registerForm);
  customAppendChild(mainContent, headerDiv, cardDiv);
  customAppendChild(app, mainContent);
};

createSignUpPage();
