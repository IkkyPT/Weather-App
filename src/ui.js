import { format} from 'date-fns';
import videoSource from './images/ocean.mp4';
import weather from './weather';

const loadPageUI = (() => {

    let currentObject; // Variable to store the current weather data

    function initialLoad(){
        // Load the background video and set up event listeners
        loadBg();
        loadEvent();
    }

    function loadEvent() {
        // Set up event listeners for metric, imperial, and search form
        const searchForm = document.getElementById('searchForm');
        const metric = document.querySelector('.settings-metric');
        const imperial = document.querySelector('.settings-imperial');

        metric.addEventListener('click', () => {
            const celsius = "°C";
            const kph = "kph";
            clickUnits(celsius, kph, currentObject);
        });

        imperial.addEventListener('click', () => {
            const fahrenheit = "°F";
            const mph = "mph";
            clickUnits(fahrenheit, mph, currentObject);
        });

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            search();
        })
    }

    function loadBg(){
        // Load background video
        const pageBody = document.querySelector('.main-content');
        const videoContainer = document.createElement('div');
        videoContainer.id = 'video-container';

        const videoBg = document.createElement('video');
        videoBg.src = videoSource;
        videoBg.autoplay = true;
        videoBg.muted = true;
        videoBg.loop = true;

        videoContainer.appendChild(videoBg);
        pageBody.appendChild(videoContainer);
    }

    function weatherLoad(object){
        // Populate UI elements with weather data
        // Head section
        const dataCity = document.querySelector('.data-city');
        const dataCountry = document.querySelector('.data-country');
        const dataTime = document.querySelector('.data-time');

        dataCity.textContent = `${object.name}`;
        dataCountry.textContent = `${object.country}`;
        dataTime.textContent =  format(object.localtime, 'EEEE dd MMMM yyyy | H:mm');
        // Weather section - TOP
        const dataIcon = document.querySelector('.data-icon');
        const dataTemp = document.querySelector('.data-temp');

        dataIcon.src = `https:${object.condition[1]}`;
        dataIcon.alt = 'Weather Icon';
        dataTemp.textContent = `${Math.round(object.temp.temp_c)}°C`;
        // Weather section - BOT
        const dataFeel = document.querySelector('.data-feel');

        dataFeel.textContent = `Feels like ${Math.round(object.feelslike.feelslike_c)}°C`;
        // Details section
        const dataHumidity = document.querySelector('.data-humidity');
        const dataGust = document.querySelector('.data-gust');
        const dataWind = document.querySelector('.data-wind');

        dataHumidity.textContent = `${object.humidity}%`;
        dataGust.textContent = `${object.gust.gust_kph} kph`;
        dataWind.textContent = `${object.wind.wind_kph} kph`;

        currentObject = object; // Update the current weather data
    }

    function clickUnits(temperatureUnit, speedUnit, object) {
        // Update UI elements based on selected units (metric or imperial)
        const dataTemp = document.querySelector('.data-temp');
        const dataFeel = document.querySelector('.data-feel');
        const dataWind = document.querySelector('.data-wind');
        const dataGust = document.querySelector('.data-gust');

        // Update temperature and feels-like values
        const temperatureValue = temperatureUnit === "°C" ? object.temp.temp_c : object.temp.temp_f;
        const feelslikeValue = temperatureUnit === "°C" ? object.feelslike.feelslike_c : object.feelslike.feelslike_f;
        dataTemp.textContent = `${Math.round(temperatureValue)}${temperatureUnit}`;
        dataFeel.textContent = `Feels like ${Math.round(feelslikeValue)}${temperatureUnit}`;

        const windValue = speedUnit === "kph" ? object.wind.wind_kph : object.wind.wind_mph;
        const gustValue = speedUnit === "kph" ? object.gust.gust_kph : object.gust.gust_mph;
        dataWind.textContent = `${windValue}${speedUnit}`;
        dataGust.textContent = `${gustValue}${speedUnit}`;
    }

    function search() {
        // Handle the user search input
        const userSearch = document.getElementById('search');
        const userSearchValue = userSearch.value;

        // Check if the user input is not empty
        if (userSearchValue.trim() !== '') {
            const errorMsg = document.querySelector('.errorMsg');
            errorMsg.style.visibility = "hidden";

            // Fetch weather data
            weather.getWeather(userSearchValue);
        } else {
            loadPageUI.throwError();
        }
    }

    function throwError(){
        // Show error message for invalid location
        const errorMsg = document.querySelector('.errorMsg'); 
        
        errorMsg.style.visibility = "visible";
        errorMsg.textContent = "No location found!"  
    }

    return {
        initialLoad,
        search,
        weatherLoad,
        throwError,
    }
})()

export default loadPageUI;