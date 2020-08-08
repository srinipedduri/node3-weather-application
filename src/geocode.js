const httpRequest = require("postman-request");

// center is [longitude,latitude]

const getLocation = (location, processResult) => {
  const urlMapBox = encodeURI(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic3Jpbml2YXNwZWRkdXJpIiwiYSI6ImNrZGl6Y2l3ZjA5dDAyeXF4dGxqN3M2bngifQ.hKKaxEq9nu0MefrslUXjoQ&limit=1`
  );
  httpRequest.get(urlMapBox, { json: true }, (error, res) => {
    const resultObj = {};
    if (error) {
      resultObj.error = error;
    } else {
      if (res.body.features && res.body.features.length !== 0) {
        resultObj.center = res.body.features[0].center;
      } else {
        resultObj.error = res.body.message || "location finder error";
      }
    }

    processResult(resultObj);
  });
};

const getWeatherInfo = (coordinates, processResult) => {
  const resultObj = {};
  const [longitude, latitude] = coordinates;
  const urlMapBox = encodeURI(
    `http://api.weatherstack.com/current?access_key=b560f6989ba3af4a870f0b79b8c8ea99&query=${latitude},${longitude}`
  );

  httpRequest.get(urlMapBox, { json: true }, (error, res) => {
    if (error) {
      resultObj.error = error;
    } else {
      if (!res.body.error) {
        resultObj.currentWeather = res.body.current;
        resultObj.location = res.body.location;
      } else {
        resultObj.error = res.body.error;
      }
    }
    processResult(resultObj);
  });
};

const getWeather = (location, processResult) => {
  getLocation(location, (mapBoxResult) => {
    if (mapBoxResult.error) {
      processResult(mapBoxResult);
    } else {
      getWeatherInfo(mapBoxResult.center, (weatherStackResult) => {
        processResult(weatherStackResult);
      });
    }
  });
};

// getWeather("Los Angeles", (result) => {
//   // console.log("the end ", result);
//   if (result.error) {
//     console.log(result.error);
//   } else {
//     console.log("temperature : " + result.currentWeather.temperature);
//     console.log("weather : " + result.currentWeather.weather_descriptions);
//   }
// });

module.exports = getWeather;
