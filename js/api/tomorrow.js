import { serviceConfig } from './_serviceConfig.js';

const { tomorrow } = serviceConfig;
const { baseUrl, apiKey } = tomorrow;

const getWeather = async (latitude, longitude) => {
    const params = new URLSearchParams();
    params.append('apikey', apiKey);
    params.append('location', `${latitude},${longitude}`);
    params.append('fields', 'temperature,weatherCode');
    params.append('timesteps', 'current');
    params.append('units', 'imperial');

    try {
        const response = await fetch(`${baseUrl}/v4/timelines?${params}`);
        const data = await response.json();
        const values = data?.data?.timelines[0]?.intervals[0]?.values;
        const weather = {
            temperature: values?.temperature,
            weatherCode: values?.weatherCode,
        };
        return weather || {};
    } catch (error) {
        console.error(error);
    }
};

export { getWeather };
