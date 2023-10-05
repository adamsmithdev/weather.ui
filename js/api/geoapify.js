import { serviceConfig } from './_serviceConfig.js';

const { geoapify } = serviceConfig;
const { baseUrl, apiKey } = geoapify;

const getCityName = async (latitude, longitude) => {
    const params = new URLSearchParams();
    params.append('lat', latitude);
    params.append('lon', longitude);
    params.append('apiKey', apiKey);

    try {
        const response = await fetch(`${baseUrl}/v1/geocode/reverse?${params}`);
        const data = await response.json();
        return data?.features[0]?.properties?.city || '';
    } catch (error) {
        console.error(error);
    }
};

export { getCityName };
