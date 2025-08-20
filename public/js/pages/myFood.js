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

  const filterWrapper = createHtmlElement('div', ['relative', 'ml-4']);

  const filterSelect = createHtmlElement('select', [
    'appearance-none',
    'p-2',
    'pl-3',
    'pr-8',
    'bg-white',
    'border',
    'border-gray-200',
    'rounded-lg',
    'text-gray-700',
    'font-medium',
    'shadow-sm',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-400',
    'cursor-pointer',
  ]);
  filterSelect.id = 'foodFilter';
  const filterLabel = createHtmlElement('label', ['sr-only'], 'Filter foods');
  filterLabel.setAttribute('for', 'foodFilter');

  ['All', 'My Favorites'].forEach((optionText) => {
    const option = createHtmlElement('option', [], optionText);
    option.value = optionText;
    filterSelect.appendChild(option);
  });

  titleBar.appendChild(filterSelect);

  customAppendChild(filterWrapper, filterLabel, filterSelect);

  customAppendChild(titleBar, devTitle, searchInput, filterSelect);
  const grid = createHtmlElement('div', [
    'grid',
    'grid-cols-1',
    'sm:grid-cols-2',
    'lg:grid-cols-4',
    'gap-12',
  ]);
  let favoriteFoods = new Set(
    JSON.parse(localStorage.getItem('favoriteFoods') || '[]')
  );

  const savedFilter = localStorage.getItem('foodFilter') || 'All';
  filterSelect.value = savedFilter;

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
      const card = createHtmlElement('div', [
        'bg-white',
        'rounded-xl',
        'shadow-md',
        'overflow-hidden',
        'hover:shadow-lg',
        'transition',
        'duration-300',
        'relative',
      ]);

      const img = createHtmlElement('img', ['w-full', 'h-40', 'object-cover']);
      img.src = food.image_url;

      const heart = createHtmlElement(
        'span',
        [
          'absolute',
          'bottom-2',
          'right-2',
          'cursor-pointer',
          'text-2xxl',
          favoriteFoods.has(food.id) ? 'text-red-500' : 'text-gray-400',
        ],
        favoriteFoods.has(food.id) ? '❤️' : '🤍',
        {
          click: () => {
            if (favoriteFoods.has(food.id)) {
              favoriteFoods.delete(food.id);
            } else {
              favoriteFoods.add(food.id);
            }
            localStorage.setItem(
              'favoriteFoods',
              JSON.stringify([...favoriteFoods])
            );
            applyFilter(filterSelect.value);
          },
        }
      );
      const body = createHtmlElement('div', ['p-4']);
      const name = createHtmlElement(
        'h3',
        ['text-lg', 'font-semibold', 'mb-2'],
        food.name
      );
      const desc = createHtmlElement(
        'p',
        ['text-sm', 'text-gray-600'],
        food.description
      );
      const cal = createHtmlElement(
        'p',
        ['text-sm', 'text-gray-600'],
        ` ${food.calories} Calories`
      );

      customAppendChild(body, name, desc, cal);
      customAppendChild(card, img, heart, body);
      customAppendChild(grid, card);
    });
  };

  const applyFilter = (filterValue) => {
    localStorage.setItem('foodFilter', filterValue);
    grid.innerHTML = '';
    if (filterValue === 'All') {
      if (allFoods.length === 0) {
        const msg = createHtmlElement(
          'span',
          ['text-gray-500', 'col-span-full', 'text-center'],
          'No foods found!'
        );
        customAppendChild(grid, msg);
        return;
      }
      renderCards(allFoods);
    } else {
      const favFoods = allFoods.filter((f) => favoriteFoods.has(f.id));
      if (favFoods.length === 0) {
        const msg = createHtmlElement(
          'span',
          ['text-gray-500', 'col-span-full', 'text-center'],
          'You don’t have favorites yet ❤️'
        );
        customAppendChild(grid, msg);
        return;
      }
      renderCards(favFoods);
    }
  };

  filterSelect.addEventListener('change', (e) => {
    applyFilter(e.target.value);
  });
  fetch('/api/foods/myfoods')
    .then((res) => res.json())
    .then((data) => {
      if (!data.foods) throw new Error('No foods found');
      allFoods = data.foods;
      applyFilter(savedFilter);
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
