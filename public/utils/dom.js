export const createHtmlElement = (
  tag,
  classes = [],
  content = '',
  listener = {}
) => {
  const el = document.createElement(tag);
  classes.forEach((cl) => el.classList.add(cl));
  el.textContent = content;
  Object.entries(listener).forEach(([eventname, handler]) => {
    el.addEventListener(eventname, handler);
  });
  return el;
};
export const customAppendChild = (perant, ...children) => {
  children.forEach((child) => perant.appendChild(child));
};

export const createFormField = (
  labelText,
  inputType,
  inputName,
  placeholderText
) => {
  const div = createHtmlElement('div');
  const label = createHtmlElement(
    'label',
    ['block', 'text-gray-700', 'font-medium', 'mb-2'],
    labelText
  );
  const input = createHtmlElement('input', [
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
  input.type = inputType;
  input.name = inputName;
  input.placeholder = placeholderText;

  const error = createHtmlElement(
    'p',
    ['text-red-500', 'text-xs', 'mt-1', 'hidden'],
    ''
  );

  customAppendChild(div, label, input, error);
  return { div, input, error };
};

export const createPasswordField = (labelText, inputName, placeholderText) => {
  const div = createHtmlElement('div');
  const label = createHtmlElement(
    'label',
    ['block', 'text-gray-700', 'font-medium', 'mb-2'],
    labelText
  );
  const wrapper = createHtmlElement('div', ['relative']);
  const input = createHtmlElement('input', [
    'w-full',
    'px-4',
    'py-2.5',
    'border',
    'border-gray-300',
    'rounded-lg',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-200',
    'transition',
    'pr-10',
  ]);
  input.type = 'password';
  input.name = inputName;
  input.placeholder = placeholderText;

  const eyeIcon = createHtmlElement(
    'i',
    [
      'absolute',
      'right-3',
      'top-1/2',
      '-translate-y-1/2',
      'cursor-pointer',
      'text-gray-400',
      'fa',
      'fa-eye',
    ],
    '',
    {
      click: () => {
        if (input.type === 'password') {
          input.type = 'text';
          eyeIcon.classList.remove('fa-eye');
          eyeIcon.classList.add('fa-eye-slash');
        } else {
          input.type = 'password';
          eyeIcon.classList.remove('fa-eye-slash');
          eyeIcon.classList.add('fa-eye');
        }
      },
    }
  );

  customAppendChild(wrapper, input, eyeIcon);
  const error = createHtmlElement(
    'p',
    ['text-red-500', 'text-xs', 'mt-1', 'hidden'],
    ''
  );
  customAppendChild(div, label, wrapper, error);

  return { div, input, error };
};
