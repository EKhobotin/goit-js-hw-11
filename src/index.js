import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const refs = {
  selectEl: document.querySelector('.breed-select'),
  divEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

document.addEventListener('DOMContentLoaded', onDocumentLoad);

function onDocumentLoad() {
  fetchBreeds()
    .then(res => {
      refs.selectEl.classList.remove('visually-hidden');
      refs.loaderEl.classList.add('visually-hidden');
      renderCats(res);
      new SlimSelect({
        select: '#selectElement',
      });
    })
    .catch(error => {
      refs.selectEl.classList.add('visually-hidden'),
        refs.divEl.classList.add('visually-hidden'),
        refs.loaderEl.classList.add('visually-hidden'),
        refs.errorEl.classList.remove('visually-hidden');
    });
}

function getCats(cats) {
  return cats.map(({ id, name }) => {
    return `
          <option value="${id}">${name}</option>
          `;
  });
}

function renderCats(cats) {
  const markup = getCats(cats).join('');
  refs.selectEl.innerHTML = markup;
}


refs.selectEl.addEventListener('change', onSelectElChange);

function onSelectElChange(e) {
  refs.loaderEl.classList.remove('visually-hidden');
  refs.divEl.classList.add('visually-hidden');

  fetchCatByBreed(e.target.value)
    .then(res => {
      refs.loaderEl.classList.add('visually-hidden');
      refs.divEl.classList.remove('visually-hidden');

      refs.divEl.innerHTML = renderCat(res);
    })
    .catch(error => {
      refs.selectEl.classList.add('visually-hidden'),
        refs.divEl.classList.add('visually-hidden'),
        refs.loaderEl.classList.add('visually-hidden'),
        refs.errorEl.classList.remove('visually-hidden');
    });
}

function renderCat(obj) {
  const {
    url,
    breeds: {
      [0]: { description, name, temperament },
    },
  } = obj[0];
  return `
                    <div class="cat-box">
                    <img src="${url}" alt="${name}" width="300"/>
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p>${temperament}</p>
                    </div>
                    `;
}