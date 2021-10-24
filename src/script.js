function formateDate(timestamp) {
  // calculating date
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

// city & temp

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
    let temperatureF = Math.round(temperatureC * 1.8 + 32);
    let tempElementF = document.querySelector("#currentTemperatureF");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");

    tempElement.innerHTML = `${temperatureC}°C`;
    tempElementF.innerHTML = `${temperatureF}°F`;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formateDate(response.data.dt * 1000);
    //console.log(response.data.dt);
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", displayCity);
