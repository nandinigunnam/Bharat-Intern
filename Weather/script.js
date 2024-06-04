const apiKey = 'e06b08fb6c72f91e413587105eae3a24'; // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key

const fetchBtn = document.getElementById('fetch-btn');
const cityInput = document.getElementById('city-input');
const weatherContainer = document.getElementById('weather-container');

fetchBtn.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName.trim() !== '') {
        fetchWeather(cityName);
    } else {
        alert('Please enter a city name.');
    }
});

async function fetchWeather(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        renderWeather(data, cityName);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        renderError(cityName);
    }
}

function renderWeather(data, cityName) {
    const card = document.createElement('div');
    card.classList.add('card');
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    card.innerHTML = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
    `;
    weatherContainer.innerHTML = '';
    weatherContainer.appendChild(card);
}

function renderError(cityName) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h2>${cityName}</h2>
        <p>Failed to fetch weather data. Please try again.</p>
    `;
    weatherContainer.innerHTML = '';
    weatherContainer.appendChild(card);
}
