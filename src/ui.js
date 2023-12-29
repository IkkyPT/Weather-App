import { format} from 'date-fns';
import videoSource from './images/ocean.mp4';
import weather from './weather';

const loadPageUI = (() => {
    function initialLoad(){
        loadBg();
        loadEvent();
    }

    function loadEvent() {
        const searchForm = document.getElementById('searchForm');

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            search();
        })

    }

    function loadBg(){
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

        dataHumidity.textContent = `${object.humidity}`;
        dataGust.textContent = `${object.gust.gust_kph}`;
        dataWind.textContent = `${object.wind.wind_kph}`;
    }

    function search(){
        const userSearch = document.getElementById('search');
        const userSearchValue = userSearch.value;

        weather.getWeather(userSearchValue);
    }

    return {
        initialLoad,
        search,
        weatherLoad,
    }
})()

export default loadPageUI;