import { getCityName } from './api/geoapify.js';
import { getWeather } from './api/tomorrow.js';
import { getGeolocation } from './util/geolocation.js';
import { checkIfDay } from './util/date.js';
import { iconMap } from './util/iconMap.js';

window.onload = () => {
    main();
};

const main = async () => {
    const { latitude, longitude } = await getGeolocation();
    const cityName = await getCityName(latitude, longitude);
    const weather = await getWeather(latitude, longitude);

    setCity(cityName);
    setTemperature(weather.temperature);
    setWeatherCondition(weather.weatherCode, latitude, longitude);
};

const setCity = (city) => {
    const cityElement = document.getElementById('city');
    cityElement.textContent = city;
};

const setTemperature = (temperature) => {
    const tempElement = document.getElementById('temperature');
    const roundedTemp = Math.round(temperature);
    tempElement.textContent = `${roundedTemp}°`;
};

const setWeatherCondition = async (weatherCode, latitude, longitude) => {
    const iconInfo = iconMap[weatherCode];
    if (!iconInfo) return;

    const { description, iconDay, iconNight } = iconInfo;
    const icon = (await checkIfDay(latitude, longitude)) ? iconDay : iconNight;

    const iconElement = document.getElementById('icon');
    iconElement.src = `/icons/${icon}`;
    iconElement.alt = description;

    const conditionElement = document.getElementById('condition');
    conditionElement.textContent = description;
};
