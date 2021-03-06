import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
const debounce = require('lodash.debounce');
import fetchCountries from './js/fetchCountries.js';
import countryTpl from './templates/country.hbs';
import listCountriesTpl from './templates/list-counties.hbs';

const refs = {
  countriesContainer: document.querySelector('.js-country-container'),
  searchInput: document.querySelector('.js-search-input'),
};

const makeTpl = (tpl, countriesArr) => {
  const countryMarkup = tpl(countriesArr);
  refs.countriesContainer.insertAdjacentHTML('afterbegin', countryMarkup);
};

const clearPage = () => {
  refs.countriesContainer.innerHTML = '';
};

const notice = message => {
  error({
    text: message,
    maxTextHeight: null,
    delay: 2000,
  });
};

const handlerSerch = event => {
  clearPage();
  const query = event.target.value.trim();
  if (query === '') return;
  fetchCountries(query)
    .then(countries => {
      clearPage();
      if (countries.length > 10) {
        notice('Too many matches found. Please enter a more specific query!');
        return;
      }
      if (countries.length > 1) {
        makeTpl(listCountriesTpl, countries);
        return;
      }

      const country = countries[0];
      makeTpl(countryTpl, country);
    })
    .catch(err => {
      clearPage();
      notice('There is no such country. Please try again!');
    });
};

refs.searchInput.addEventListener('input', debounce(handlerSerch, 500));
