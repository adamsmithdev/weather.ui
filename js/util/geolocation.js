const getGeolocation = async () => {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            );
        } else {
            const error = 'Geolocation is not available in this browser.';
            console.error(error);
            reject(new Error(error));
        }
    });
};

export { getGeolocation };
