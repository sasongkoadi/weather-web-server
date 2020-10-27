const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2F6cmlrdWRvIiwiYSI6ImNrZHZzOWhmbjBrcGcyeG9naHd1bHVibzYifQ.ei1IVoOXNRBu8F9okw2a5w&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cannot connect to location services!", error.code);
    } else if (body.message == "Not Found") {
      callback("Insert a valid location!", body.message);
    } else if (body.features.length === 0) {
      callback("Insert a valid location!", body.query);
    } else {
      callback(undefined, {
        place_name: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
