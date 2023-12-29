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

    function weatherLoad(data){

    }

    function search(){
        const userSearch = document.getElementById('search');
        const userSearchValue = userSearch.value;

        weather.getWeather(userSearchValue);
    }

    return {
        initialLoad,
        search,
    }
})()

export default loadPageUI;