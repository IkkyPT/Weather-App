import videoSource from './images/ocean.mp4';

const loadPageUI = (() => {
    function initialLoad(){
        loadBg();
    }

    function loadBg(){
        const videoContainer = document.createElement('div');
        videoContainer.id = 'video-container';

        const videoBg = document.createElement('video');
        videoBg.src = videoSource;
        videoBg.autoplay = true;
        videoBg.muted = true;
        videoBg.loop = true;

        videoContainer.appendChild(videoBg);
        document.body.appendChild(videoContainer);
    }

    return {
        initialLoad,
    }
})()

export default loadPageUI