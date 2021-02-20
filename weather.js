const COORDS = 'coords';
const API_KEY = "992a923cf4bb483b90db319aaf764dae";
const weather = document.querySelector(".js-weather");

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getWeather(lat, lng) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
     return response.json();
    }).then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `🌡${temp}ºC 🗺 ${place}`;
    });
}

function handleGeoSuc(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handelGeoErr() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuc, handelGeoErr);
}


function loadcoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadcoords();
}

init();