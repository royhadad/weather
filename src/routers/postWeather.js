const express = require('express')
const Search = require('../models/search')
const router = new express.Router()

router.post('/weather', async (req, res) => {
    try {
        req.query.search
        if (!req.query.search || typeof req.query.search !== 'string') {
            return res.status(400).send();
        }
        search = lowerCase(search);

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${OPEN_WEATHER_MAP_API_KEY}`);
        if (res.status !== 200) {
            throw new Error('not found');
        }
        let data = await res.json()
        data = {
            place: `${data.name}, ${data.sys.country}`,
            description: data.weather[0].description
        };
        res.status(200).send(data);
    } catch (e) {
        res.status(404).send();
    }
})

module.exports = router;