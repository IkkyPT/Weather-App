import loadPageUI from "./ui";

const weather = (() => {
    const weatherAPI = "cdda7586614e486ea00235544232712";
  
    async function getWeather(location) {
      // Fetch current weather data from the weatherApi
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${location}`, { mode: "cors" },);

        if(!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const weatherData = await response.json();
        processData(weatherData);
      } catch (error) {
        loadPageUI.throwError(); // Handle errors by displaying an error message
      }
    }
  
    function processData(weatherData) {
      if (!weatherData || !weatherData.current || !weatherData.location) {
        return; // Exit if the required data is missing
      }

      // Extract relevant weather information for display
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

      loadPageUI.weatherLoad(data); // Update the UI with the weather information
    }

    return {
        getWeather,
        processData,
    }

  })();

export default weather;