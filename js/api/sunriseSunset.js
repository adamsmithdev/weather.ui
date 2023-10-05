import { serviceConfig } from './_serviceConfig.js';

const { sunriseSunset } = serviceConfig;
const { baseUrl } = sunriseSunset;

const getSunsetInfo = async (latitude, longitude) => {
    const params = new URLSearchParams();
    params.append('lat', latitude);
    params.append('lng', longitude);
    params.append('formatted', 0);

    try {
        const response = await fetch(`${baseUrl}/json?${params}`);
        const data = await response.json();
        const sunsetInfo = {
            sunrise: data?.results?.sunrise,
            sunset: data?.results?.sunset,
        };
        return sunsetInfo || {};
    } catch (error) {
        console.error(error);
    }
};

export { getSunsetInfo };
