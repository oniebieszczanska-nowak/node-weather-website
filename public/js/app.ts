// Interface for weather API response
interface WeatherResponse {
    error?: string;
    address?: string;
    forecast?: string;
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const weatherMessage = document.querySelector('#weather-message')

const fetchWeather = (address: string) => {
    fetch(`http://localhost:3000/weather?address=${address}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json() as Promise<WeatherResponse>;
        })
        .then((data: WeatherResponse) => {
            if (data.error) {
                if (errorMessage) errorMessage.innerHTML = data.error;
                if (weatherMessage) weatherMessage.innerHTML = '';
            } else {
                if (weatherMessage) weatherMessage.innerHTML = `Forecast for: ${data.address}: ${data.forecast}`;
                if (errorMessage) errorMessage.innerHTML = '';
            }
        })
        .catch((error) => {
            if (errorMessage) errorMessage.innerHTML = error;
            if (weatherMessage) weatherMessage.innerHTML = '';
        });
}
weatherForm?.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search?.value;
    if (location) fetchWeather(location);
    weatherForm.reset();
})