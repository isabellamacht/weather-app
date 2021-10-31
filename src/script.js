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
  return `${day}, ${hour}:${minutes}`;
}

// city & temp

function displayCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-input");

  let newCity = searchCityInput.value;
  let h3 = document.querySelector("h3");

  h3.innerHTML = `${newCity}`;

  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let city = searchCityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  function getForecast(coordinates) {
    //console.log(coordinates);
    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    //console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
  }

  function showTemp(response) {
    //console.log(response.data);
    let temperatureC = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#currentTemperature");
    let temperatureF = Math.round(temperatureC * 1.8 + 32);
    let tempElementF = document.querySelector("#currentTemperatureF");
    let descriptionElement = document.querySelector("#description");
    let minTempElement = document.querySelector("#minTemp");
    let maxTempElement = document.querySelector("#maxTemp");

    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let imageElement = document.querySelector("#image");

    //displayForecast();

    tempElement.innerHTML = `${temperatureC}°C`;
    tempElementF.innerHTML = `${temperatureF}°F`;
    descriptionElement.innerHTML = response.data.weather[0].main;
    minTempElement.innerHTML = Math.round(response.data.main.temp_min);
    maxTempElement.innerHTML = Math.round(response.data.main.temp_max);

    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formateDate(response.data.dt * 1000);
    imageElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    //console.log(response.data.rain);

    getForecast(response.data.coord);
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", displayCity);

// forecast
function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
                  <tbody>
                    <tr>
                      <td>${formateDay(forecastDay.dt)}</td>
                      <td> 
                        <img src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png" alt="" width="42"/> 
                      </td> 
                      <td>${Math.round(forecastDay.temp.min)}°C / ${Math.round(
          forecastDay.temp.max
        )}°C</td>
                    </tr>
                  </tbody>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
