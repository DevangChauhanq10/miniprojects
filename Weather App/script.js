document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather-button");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  // OpenWeatherMap API key
 const API_KEY = ""; // Add your OpenWeather API key here


  // Handle weather fetch on button click
  getWeatherButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });
  //
  function displayWeatherData(data) {
    const { name, main, weather } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    description.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
 function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
