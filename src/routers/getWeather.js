const express = require('express')
const fetch = require('node-fetch');
const { lowerCase } = require('lower-case');
const Search = require('../models/search')
const router = new express.Router()
const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

router.get('/weather', async (req, res) => {
    try {
        if (!req.query.search || typeof req.query.search !== 'string') {
            return res.status(400).send();
        }
        const search = lowerCase(req.query.search);

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${OPEN_WEATHER_MAP_API_KEY}`);
        if (response.status !== 200) {
            throw new Error('not found');
        }
        let data = await response.json()
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