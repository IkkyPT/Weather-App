const weather = (() => {
    const weatherAPI = "cdda7586614e486ea00235544232712";
  
    async function getWeather(location) {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${location}`, { mode: "cors" },);
        const weatherData = await response.json();
        processData(weatherData);
      } catch (error) {
        console.log(error);
      }
    }
  
    function processData(weatherData) {
      const data = {
        condition: [
          weatherData.current.condition.text,
          weatherData.current.condition.icon,
        ],
        feelslike: {
          feelslike_c: weatherData.current.feelslike_c,
          feelslike_f: weatherData.current.feelslike_f,
        },
        gust: {
          gust_kph: weatherData.current.gust_kph,
          gust_mph: weatherData.current.gust_mph,
        },
        temp: {
          temp_c: weatherData.current.temp_c,
          temp_f: weatherData.current.temp_f,
        },
        wind: {
          wind_kph: weatherData.current.wind_kph,
          wind_mph: weatherData.current.wind_mph,
        },
        humidity: weatherData.current.humidity,
        country: weatherData.location.country,
        localtime: weatherData.location.localtime,
        name: weatherData.location.name,
        region: weatherData.location.region,
      };
  
      console.log(data);
    }

    return {
        getWeather,
        processData,
    }

  })();

export default weather;