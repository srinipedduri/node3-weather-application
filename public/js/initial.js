const btn = document.getElementById("btn");

const weatherInfoEl = document.getElementById("weather-info");
const locInpEl = document.querySelector("form input");

console.log(weatherInfoEl);

const showError = (data) => {
  weatherInfoEl.innerHTML = `<p>${data.error}</p>`;
};

const showWeather = (data) => {
  weatherInfoEl.innerHTML = `
    <p>Temparature : ${data.temperature}, Forecast : ${data.forecast[0]}</p>
    <p>Place Name : ${data.place.name}</p>
    <p>Region : ${data.place.region}</p>
    <p>Country : ${data.place.country}</p>
    `;
};

const btnClickHandler = (evt) => {
  evt.preventDefault();
  weatherInfoEl.innerHTML = "";

  const location = locInpEl.value;

  fetch(encodeURI("/weather?location=" + location))
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        showError(data);
      } else {
        showWeather(data);
      }
    });
};

btn.addEventListener("click", btnClickHandler);
// btn.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   console.log("submit clicked");
// });
