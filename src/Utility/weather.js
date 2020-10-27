const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7998b89fa42afe36c1f8daca10443d1e&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cannot connect to Weather Services!", error);
    } else if (body.success == false) {
      callback("Unable to find a location!", body.error);
    } else {
      callback(undefined, {
        temp: "Temperature is " +body.current.temperature+' degrees out',
        feelslike: 'It feels like '+body.current.feelslike + ' degrees',
        weatherDescription: "It's "+body.current.weather_descriptions[0],
        location: body.location.name,
      });
    }
  });
};

module.exports = forecast;
