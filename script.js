function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  changeCity(cityInput.value);
}

function changeCity(city) {
  let apiKey = "6f3448c5bececa337o296fb422t09c35";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayWeather);
}

function displayWeather(response) {
  let icon = document.querySelector("#icons");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temp-emoji" />`;

  let temperature = document.querySelector("#temp-value");
  let updatedTemp = response.data.temperature.current;
  temperature.innerHTML = Math.round(updatedTemp);

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.city;

  let rightNow = document.querySelector("#dayntime");
  let date = new Date(response.data.time * 1000);
  rightNow.innerHTML = formatDate(date);

  let weatherCondition = document.querySelector("#condition");
  weatherCondition.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;
}

function formatDate(date) {
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
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="forecast-week">
                  <div class="forecast-day">${day}</div>
                  <div class="forecast-icon">⛅</div>
                  <div class="forecast-temperatures">
                    <div class="forecast-temp"><strong>16° </strong></div>
                    <div class="forecast-temp">/ 8°</div>
                  </div>
                </div>
                `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);

changeCity("London");
displayForecast();
