const axios = require('axios');

const API_KEY = 'd4c55138bbca34363a7498b9f44c7c5d';
const weatherController = {};

weatherController.getWeather = (req, res, next) => {
  const { latLong } = res.locals.modalInfo
  console.log('modal latLong:', latLong)

  let lat = latLong.split(':')[1].slice(0, 8);
  let lon = latLong.split(':')[2];

  lat = Math.round((Number(lat) + Number.EPSILON) * 100) / 100
  lon = Math.round((Number(lon) + Number.EPSILON) * 100) / 100

  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  )
    .then((data) => {
      const modalInfo = { ...res.locals.modalInfo, weather: data.data };
      res.locals.modalInfo = modalInfo;
      console.log(res.locals.modalInfo);
      return next();
    })
    .catch((err) => next(err))
};

module.exports = weatherController;
