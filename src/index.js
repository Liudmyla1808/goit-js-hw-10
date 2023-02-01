import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const search = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

search.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));
function onSearchCountry(e) { 
    let inputDate = e.target.value.trim();
    if (inputDate === '') {
      Notiflix.Notify.warning('Entry name country!');
      clear();
      return;
     } 
    
      fetchCountries(inputDate)
        .then(renderCountryList)
        .catch(onError)
   
  }
  function renderCountryList(countries) { 
    list.innerHTML = countries.reduce((previousValue, { name: { official }, flags: { svg } }) => {return previousValue +  `<li>
   <img src="${svg}" alt="flag" width = 100px>
   <p><b>${official}</b></p>
 </li>`}, '')
   
   if (countries.length === 1) { 
      info.innerHTML = countries.reduce((previousValue, { capital, population, languages }) => {
       return previousValue +  
       `<p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>`
        }, '')
   }
 
   if (countries.length > 10) {
     clear();
     Notiflix.Notify.info('"Too many matches found. Please enter a more specific name."');
   }
   
 }
 
 function onError(error) { 
  console.error(error);
  Notiflix.Notify.failure("Oops, there is no country with that name");
  clear();
  return error;
}
  
function clear() { 
   list.innerHTML = '';
   info.innerHTML = '';
}
