import "./styles.css";

let currentTime = new Date();
console.log(currentTime);

let currentDay = currentTime.getDay();
console.log(currentDay);

let clockHours = currentTime.getHours();
if (clockHours < 10) {
  clockHours = `0${clockHours}`;
}

let clockTime = currentTime.getMinutes();
if (clockTime < 10) {
  clockTime = `0${clockTime}`;
}

console.log(clockHours);
console.log(clockTime);

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let weekday = week[currentTime.getDay()];
console.log(weekday);

let form = document.querySelector("#city-search");
let place = document.querySelector("#input");
console.log(place.value);

function dayTime(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  h2.innerHTML = `The weather on ${weekday} ${clockHours}:${clockTime} in`;
}
console.log(dayTime);
form.addEventListener("submit", dayTime);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch").value;
  search(city);
}
console.log(search);

function newCity(event) {
  event.preventDefault();
  let h2 = document.querySelector("#citySearch");
  h2.innerHTML = form.input.value;

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let city = form.input.value;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(newTemp);
}
let newform = document.querySelector("form");
newform.addEventListener("submit", newCity);

function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(newTemp);
}

function newTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#tempSearch");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentTemp.innerHTML = `${temperature} °C`;
  document.querySelector("#citySearch").innerHTML = response.data.name;
}

navigator.geolocation.getCurrentPosition(searchPosition);

let navButton = document.querySelector("button");
navButton.addEventListener("click", newTemp);
