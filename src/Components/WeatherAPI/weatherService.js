const API_KEY = "ef242a998cd1b12d73264528e753cdf8";

const makeIconUrl = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${API_KEY}&units=${units}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        const {
            city: { name, country },
            list
        } = data;

        const forecasts = list.map(({ main, weather, wind }) => {
            return {
                temp: main.temp,
                feels_like: main.feels_like,
                humidity: main.humidity,
                pressure: main.pressure,
                temp_max: main.temp_max,
                temp_min: main.temp_min,
                wind_speed: wind,
                weatherDescription: weather[0].description,
                makeweatherIcon: makeIconUrl(weather[0].icon),
            };
        });

        return {
            city: name,
            country: country,
            forecasts: forecasts,
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export { getFormattedWeatherData };
