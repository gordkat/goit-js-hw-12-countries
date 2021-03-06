const BASE_URL = 'https://restcountries.eu/rest/v2';
const fetchCountries = searchQuery => {
  return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};
export default fetchCountries;
