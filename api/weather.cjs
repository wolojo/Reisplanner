const { weatherApiKey, weatherApiUrl } = require('../config.cjs');

/**
 * Een Api key kun je aanvragen via https://www.weatherapi.com/
 *  
 * Een beschrijving van de api is te vinden op https://www.weatherapi.com/docs/#intro-request 
 */

const getQueryUrl = (city) => weatherApiUrl.replace('{API_KEY}', weatherApiKey).replace('{CITY}', city);

/**
 * @type {import('express'.RequestHandler)} 
 */
exports.get = async function (req, res) {
    const { location } = req.query;
    const url = getQueryUrl(location);
    try {
        const weatherDataRequest = await fetch(url);

        if (weatherDataRequest.ok) {
            const { current: weatherData } = await weatherDataRequest.json();
            res.send(weatherData);
            return;
        }

        const errorMessage = weatherDataRequest.statusText;

        res.status(weatherDataRequest.status).send({errorMessage, url})
    } catch (e) {
        res.status(500).send(e)
    }
}