import { getSunsetInfo } from '../api/sunriseSunset.js';

const checkIfDay = async (latitude, longitude) => {
    const { sunrise, sunset } = await getSunsetInfo(latitude, longitude);
    const sunriseDate = new Date(convertUTCToLocal(sunrise));
    const sunsetDate = new Date(convertUTCToLocal(sunset));
    const currentTime = new Date();

    const isDay = !!(currentTime >= sunriseDate && currentTime < sunsetDate);

    return isDay;
};

const convertUTCToLocal = (utcTime) => {
    const utcTimeDate = new Date(utcTime);
    const timeZoneOffsetMinutes = new Date().getTimezoneOffset();
    const localTime = new Date(
        utcTimeDate.getTime() + timeZoneOffsetMinutes * 60000
    );

    return localTime.toISOString();
};

export { checkIfDay };
