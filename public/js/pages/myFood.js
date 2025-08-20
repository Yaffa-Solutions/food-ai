import { createHtmlElement, customAppendChild } from '../../utils/dom.js';

export const createMyfood = () => {
  const app = document.querySelector('.app');
  app.innerHTML = '';

  const main = createHtmlElement('main', [
    'min-h-screen',
    'bg-gray-50',
    'py-10',
    'px-6',
    'mr-32',
    'ml-32',
  ]);

  let allFoods = [];
  const titleBar = createHtmlElement('div', [
    'flex',
    'items-center',
    'justify-between',
    'mb-6',
  ]);
  const devTitle = createHtmlElement('div', [
    'flex',
    'items-center',
    'justify-between',
  ]);

  const backArrow = createHtmlElement(
    'span',
    ['text-2xl', 'cursor-pointer', 'mr-2', 'hover:text-blue-500'],
    '←',
    {
      click: () => {
        window.location.hash = '#home';
      },
    }
  );
  const title = createHtmlElement(
    'h2',
    ['text-2xl', 'font-bold', 'text-gray-800'],
    '🍽️ My Foods'
  );
  const searchInput = createHtmlElement('input', [
    'w-80',
    'p-2',
    'border',
    'border-gray-300',
    'rounded-lg',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-400',
  ]);
  searchInput.type = 'text';
  searchInput.placeholder = 'Search...';
  customAppendChild(devTitle, backArrow, title);

  customAppendChild(titleBar, devTitle, searchInput);
  const grid = createHtmlElement('div', [
    'grid',
    'grid-cols-1',
    'sm:grid-cols-2',
    'lg:grid-cols-4',
    'gap-12',
  ]);

  const renderCards = (foods) => {
    grid.innerHTML = '';
    if (foods.length === 0) {
      const username = localStorage.getItem('name');
      const emptyMsg = createHtmlElement(
        'span',
        ['text-gray-500', 'text-m', 'col-span-full', 'text-center'],
        `You didn’t add any food ${username} :)`
      );
      customAppendChild(grid, emptyMsg);
      return;
    }
    foods.forEach((food) => {
      const card = createHtmlElement(
        'div',
        [
          'bg-white',
          'rounded-xl',
          'shadow-md',
          'overflow-hidden',
          'hover:shadow-lg',
          'transition',
          'duration-300',
          'cursor-pointer',
          'relative',
        ],
        '',
        {
          click: () => {
            const popup = createHtmlElement('div', [
              'fixed',
              'inset-0',
              'bg-black/50',
              'flex',
              'justify-center',
              'items-center',
              'z-50',
              'p-4',
            ]);
            const largeCard = createHtmlElement('div', [
              'bg-white',
              'rounded-2xl',
              'p-6',
              'w-full',
              'max-w-md',
              'max-h-[80vh]',
              'overflow-auto',
              'flex',
              'flex-col',
              'items-center',
              'space-y-4',
              'relative',
            ]);
            const titlePopup = createHtmlElement(
              'h3',
              ['font-bold', 'text-xl'],
              food.name
            );
            const fullDesc = createHtmlElement(
              'p',
              ['text-gray-700'],
              food.description
            );
            const calPopup = createHtmlElement(
              'p',
              ['text-gray-600'],
              `${food.calories} Calories`
            );
            const closeBtn = createHtmlElement(
              'button',
              [
                'absolute',
                'top-2',
                'right-2',
                'text-red-500',
                'font-bold',
                'text-xl',
                'hover:text-red-700',
                'transition',
              ],
              '×',
              {
                click: () => document.body.removeChild(popup),
              }
            );

            customAppendChild(
              largeCard,
              titlePopup,
              fullDesc,
              calPopup,
              closeBtn
            );
            customAppendChild(popup, largeCard);
            document.body.appendChild(popup);
          },
        }
      );

      const img = createHtmlElement('img', ['w-full', 'h-40', 'object-cover']);
      img.src = food.image_url;

      const body = createHtmlElement('div', ['p-4']);
      const name = createHtmlElement(
        'h3',
        ['text-lg', 'font-semibold', 'mb-2'],
        food.name
      );
      const words = food.description.split(' ');
      const shortDesc =
        words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');

      const desc = createHtmlElement(
        'p',
        ['text-sm', 'text-gray-600'],
        shortDesc
      );
      const cal = createHtmlElement(
        'p',
        ['text-sm', 'text-gray-600'],
        ` ${food.calories} Calories`
      );

      customAppendChild(body, name, desc, cal);
      customAppendChild(card, img, body);

      // دالة البوب أب للحذف
      const showDeletePopup = (food, card, grid) => {
        const popup = createHtmlElement('div', [
          'fixed',
          'inset-0',
          'bg-black/50',
          'flex',
          'justify-center',
          'items-center',
          'z-50',
          'p-4',
        ]);

        const confirmBox = createHtmlElement('div', [
          'bg-white',
          'p-6',
          'rounded-xl',
          'shadow-lg',
          'flex',
          'flex-col',
          'items-center',
          'space-y-4',
        ]);

        const msg = createHtmlElement(
          'p',
          ['text-gray-800', 'text-center'],
          `Delete ${food.name}?`
        );

        const buttons = createHtmlElement('div', ['flex', 'space-x-4']);

        const okBtn = createHtmlElement(
          'button',
          [
            'bg-red-500',
            'text-white',
            'px-4',
            'py-2',
            'rounded-lg',
            'hover:bg-red-600',
            'transition',
          ],
          'OK',
          {
            click: () => {
              fetch(`/api/foods/delete/${food.id}`, {
                method: 'DELETE',
                credentials: 'include',
              })
                .then((res) => res.json())
                .then((data) => {
                  if (!data.error) {
                    grid.removeChild(card);
                  } else {
                    alert(data.error);
                  }
                })
                .catch((err) => console.error(err))
                .finally(() => document.body.removeChild(popup));
            },
          }
        );

        const cancelBtn = createHtmlElement(
          'button',
          [
            'bg-gray-300',
            'text-gray-700',
            'px-4',
            'py-2',
            'rounded-lg',
            'hover:bg-gray-400',
            'transition',
          ],
          'Cancel',
          {
            click: () => document.body.removeChild(popup),
          }
        );

        customAppendChild(buttons, okBtn, cancelBtn);
        customAppendChild(confirmBox, msg, buttons);
        customAppendChild(popup, confirmBox);
        document.body.appendChild(popup);
      };

      const deleteBtn = createHtmlElement(
        'button',
        [
          'absolute',
          'top-2',
          'right-2',
          'bg-white/70',
          'hover:bg-red-500',
          'text-red-500',
          'hover:text-white',
          'rounded-full',
          'w-5',
          'h-5',
          'flex',
          'items-center',
          'justify-center',
          'transition',
          'shadow-md',
        ],
        '×',
        {
          click: (e) => {
            e.stopPropagation();
           showDeletePopup(food, card, grid);
          },
        }
      );

      customAppendChild(card, deleteBtn);

      customAppendChild(grid, card);
    });
  };

  fetch('/api/foods/myfoods')
    .then((res) => res.json())
    .then((data) => {
      if (!data.foods) throw new Error('No foods found');
      allFoods = data.foods;
      renderCards(allFoods);
    })
    .catch((err) => console.error(err));

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredFoods = allFoods.filter((food) => {
      const foodName = food.name;
      return foodName.toLowerCase().includes(searchTerm);
    });
    renderCards(filteredFoods);
  });

  customAppendChild(main, titleBar, grid);
  customAppendChild(app, main);
};
