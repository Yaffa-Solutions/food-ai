import {
  createHtmlElement,
  customAppendChild,
  createFormField,
  createPasswordField,
} from '../../utils/dom.js';
import {
  isRequired,
  isValidEmail,
  isValidPassword,
  isPasswordMatch,
} from '../../utils/validayion.js';

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

  const registerForm = createHtmlElement('form', ['space-y-6'], '', {
    submit: (e) => {
      e.preventDefault();
      let isValid = true;

      if (!isRequired(inputUsername.value)) {
        showError(usernameError, 'Username is required.');
        isValid = false;
      }
      if (!isRequired(inputEmail.value)) {
        showError(emailError, 'Email is required.');
        isValid = false;
      } else if (!isValidEmail(inputEmail.value)) {
        showError(emailError, 'Invalid email format.');
        isValid = false;
      }

      if (!isRequired(inputPass.value)) {
        showError(passwordError, 'Password is required.');
        isValid = false;
      } else {
        const validation = isValidPassword(inputPass.value);
        if (!validation.minLength) {
          showError(passwordError, 'Password must be at least 6 characters.');
          isValid = false;
        } else if (!validation.hasLower) {
          showError(
            passwordError,
            'Password must contain at least one lowercase letter.'
          );
          isValid = false;
        } else if (!validation.hasUpper) {
          showError(
            passwordError,
            'Password must contain at least one uppercase letter.'
          );
          isValid = false;
        } else if (!validation.hasNumber) {
          showError(
            passwordError,
            'Password must contain at least one number.'
          );
          isValid = false;
        } else if (!validation.hasSpecial) {
          showError(
            passwordError,
            'Password must contain at least one special character.'
          );
          isValid = false;
        }
      }
      if (!isRequired(inputConfirm.value)) {
        showError(confirmPasswordError, 'Confirm password is required.');
        isValid = false;
      } else if (!isPasswordMatch(inputPass.value, inputConfirm.value)) {
        showError(confirmPasswordError, 'Passwords do not match.');
        isValid = false;
      }

      if (isValid) {
        alert('Form submitted successfully!');
        registerForm.reset();
        hideError(usernameError);
        hideError(emailError);
        hideError(passwordError);
        hideError(confirmPasswordError);
      }
    },
  });
  const {
    div: usernameDiv,
    input: inputUsername,
    error: usernameError,
  } = createFormField('Username', 'text', 'username', 'Enter your username');
  const {
    div: emailDiv,
    input: inputEmail,
    error: emailError,
  } = createFormField('Email', 'email', 'email', 'Enter your email');
  const {
    div: passDiv,
    input: inputPass,
    error: passwordError,
  } = createPasswordField('Password', 'password', 'Enter your password');
  const {
    div: confirmDiv,
    input: inputConfirm,
    error: confirmPasswordError,
  } = createPasswordField(
    'Confirm Password',
    'confirmPassword',
    'Re-enter your password'
  );

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

  const loginLink = createHtmlElement(
    'p',
    ['text-center', 'text-sm', 'text-gray-600', 'mt-4'],
    'Already have an account? '
  );
  const loginAnchor = createHtmlElement(
    'a',
    ['text-blue-500', 'font-medium', 'hover:underline'],
    'Log in',
    {
      click: () => {
        document.dispatchEvent(new Event('navigateToLogin'));
      },
    }
  );
  loginLink.appendChild(loginAnchor);

  customAppendChild(
    registerForm,
    usernameDiv,
    emailDiv,
    passDiv,
    confirmDiv,
    registerBtn,
    loginLink
  );

  customAppendChild(cardDiv, registerForm);
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

  inputUsername.addEventListener('blur', () => {
    validateField(
      inputUsername,
      usernameError,
      isRequired,
      'Username is required.'
    );
  });

  inputEmail.addEventListener('blur', () => {
    if (
      !validateField(inputEmail, emailError, isRequired, 'Email is required.')
    ) {
      return;
    }
    validateField(
      inputEmail,
      emailError,
      isValidEmail,
      'Invalid email format.'
    );
  });

  inputPass.addEventListener('blur', () => {
    const value = inputPass.value;

    if (!isRequired(value)) {
      showError(passwordError, 'Password is required.');
      return;
    }
    const validation = isValidPassword(value);
    if (!validation.minLength) {
      showError(passwordError, 'Password must be at least 6 characters.');
    } else if (!validation.hasLower) {
      showError(
        passwordError,
        'Password must contain at least one lowercase letter.'
      );
    } else if (!validation.hasUpper) {
      showError(
        passwordError,
        'Password must contain at least one uppercase letter.'
      );
    } else if (!validation.hasNumber) {
      showError(passwordError, 'Password must contain at least one number.');
    } else if (!validation.hasSpecial) {
      showError(
        passwordError,
        'Password must contain at least one special character.'
      );
    } else {
      hideError(passwordError);
    }
  });

  inputConfirm.addEventListener('blur', () => {
    if (
      !validateField(
        inputConfirm,
        confirmPasswordError,
        isRequired,
        'Confirm password is required.'
      )
    ) {
      return;
    }
    if (!isPasswordMatch(inputPass.value, inputConfirm.value)) {
      showError(confirmPasswordError, 'Passwords do not match.');
    } else {
      hideError(confirmPasswordError);
    }
  });
};

