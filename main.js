const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const searchBox = document.getElementById('search-box');
const results = document.getElementById('results');
const queries = Array.from(document.querySelectorAll('#results div'));

function removeResults(list) {
    console.log(`list is ${list}`);
    list.forEach((item) => {
      item.style.display = 'none';
    });
}

function displayFreshResults(data, event) {
  // removeQueries(queries);
  data.forEach((datum) => {
    let portion = datum.city.slice(0, event.target.value.length);
    if (portion.includes(event.target.value)) {
        console.log(portion);
        const div = document.createElement('div');
        div.innerText = datum.city;
        results.appendChild(div);
    }
 });
      

if (!('fetch' in window)) {
  console.log('Fetch API not found, try including the polyfill');
}

fetch(endpoint)
    .then(res => res.json())
    .then((data) => {
      data.forEach(city => cities.push(city));
      // console.log(cities);
      searchBox.addEventListener('input', (e) => {
        removeResults();
        displayFreshResults(cities, e);
      });
    })
    .catch(error => console.log(error));

// toUpperCase()