window.onload = () => {
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  const cities = [];
  const searchBox = document.getElementById('search-box');
  const results = document.getElementById('results');

 function removeResults() {
    if (results.hasChildNodes()) {
      console.log(`results.hasChildNodes() is ${results.hasChildNodes()}`);
      results.removeChild(results.firstChild);
    }
  }

  function displayFreshResults(data, event) { 
    const queries = document.createElement('div');
    results.appendChild(queries);

    data.forEach((datum) => {
      const inputVal = event.target.value;
      const capitalized = inputVal.replace(inputVal[0], inputVal[0].toUpperCase());
      const chunk = datum.city.slice(0, event.target.value.length);
 
      if (chunk.includes(capitalized)) {
        console.log(`The search term is ${chunk}`);
        const div = document.createElement('div');
        div.innerText = datum.city;
        queries.appendChild(div);
      }
    });
  }

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
};
