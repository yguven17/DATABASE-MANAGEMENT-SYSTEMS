async function getDiffLang(country1, country2) {
  const response = await fetch(`http://localhost:3333/getDiffLang?country1=${country1}&country2=${country2}`);
  const jsonData = await response.json();
  return jsonData.languages;
}

function displayLanguages() {
  const country1 = document.getElementById("country1").value;
  const country2 = document.getElementById("country2").value;

  getDiffLang(country1, country2).then((languages) => {
    const ul = document.getElementById("languages");

    for (let i = 0; i < languages.length; i++) {
      const li = document.createElement("li");
      li.textContent = languages[i];
      ul.appendChild(li);
    }
    
  });
}

async function getCountries(agg_type, country_name) {
  const response = await fetch(`http://localhost:3333/aggregatecountry?agg_type=${agg_type}&country_name=${country_name}`);
  const jsonData = await response.json();
  return jsonData.results;
}

function displayCountries() {
  const agg_type = document.getElementById("agg_type").value;
  const country_name = document.getElementById("country_name").value;

  getCountries(agg_type, country_name).then((response) => {
    const ul = document.getElementById("countries");

    for (let i = 0; i < languages.length; i++) {
      const li = document.createElement("li");
      li.textContent = countries[i];
      ul.appendChild(li);
    }
  });
}