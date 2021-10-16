let now = new Date();
let today = document.querySelector("#day");
let time = document.querySelector("#time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();

today.innerHTML = `${day}`;
time.innerHTML = `${hour}:${minutes}`;

function displayCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-input");

  // alert(searchCityInput.value);
  let newCity = searchCityInput.value;
  let h3 = document.querySelector("h3");

  h3.innerHTML = `${newCity}`;

  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let city = searchCityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  function showTemp(response) {
    //console.log(response.data);
    let temperatureC = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#currentTemperature");
    tempElement.innerHTML = `${temperatureC}°C`;

    let temperatureF = Math.round(temperatureC * 1.8 + 32);
    let tempElementF = document.querySelector("#currentTemperatureF");
    tempElementF.innerHTML = `${temperatureF}°F`;
  }

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", displayCity);
