import {API_KEY} from "./APIKEY.js";
const searchBar = document.getElementById('search_bar');
const search = document.getElementById('search');
const weatherImageBox = document.getElementById('weather_image_box');
const containerBody = document.getElementById('container_body');
const temperature = document.getElementById('temperature');
const Location = document.getElementById('Location');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind_speed');
const loading = document.getElementById('loading');
const weatherDescription = document.getElementById('weather_description');
let searchedValue;
let results;

const fetchWeatherData =async(query)=>{
    if(query === undefined || query === ' '){
        return ;   
    }else{
        const response = await fetch(` https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`);
        return response;
    }
}

const displayLoadingHandler = (data)=>{
   loading.style.display= 'flex';
   loading.innerHTML = `<h1>${data}</h1>`
}

const removeloadingHandler = ()=>{
    loading.style.display= 'none';
}

function fetchDataHandler(query,errorMessage){
    if(query === undefined || query === ' '){
     return ;   
    }else{
        displayLoadingHandler('Loading...');
        fetchWeatherData(query)
        .then((res)=>  res.json()) 
        .then((data)=> { 
        results = data;
        renderWeather();
        removeloadingHandler();
      }).catch((err)=>{
        displayLoadingHandler(errorMessage);
        console.log(err);
      });
    }
}

fetchDataHandler('india','Somthing went wrong! Please check your internet connection and try again');

searchBar.addEventListener('input',(e)=>{
    searchedValue = e.target.value;
});

search.addEventListener('click', ()=>{
    fetchDataHandler(searchedValue,`${searchedValue}  not found!`);
});

document.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
     fetchDataHandler(searchedValue,`${searchedValue}  not found!`);
    }
})


const renderWeather =()=>{

    temperature.innerText = `${results.current.temp_c}°c`;
    weatherDescription.innerText = `${results.current.condition.text}`;
    Location.innerText = `${results.location.name}, ${results.location.region}, ${results.location.country}`;
    humidity.innerText = `${results.current.humidity}`;
    windSpeed.innerText =`${results.current.wind_kph}km/h`;

    if(results.current.condition.text === 'Sunny'){
        weatherImageBox.src = `img/clear.png`;
        containerBody.style.backgroundColor= '#08AEEA';
        containerBody.style.backgroundImage= 'linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)';
    }

    if(results.current.condition.text === 'Rain'){
        weatherImageBox.src = `img/rain.png`;
        containerBody.style.backgroundColor= '#a8b6fa';
        containerBody.style.backgroundImage= 'linear-gradient(354deg, #a8b6fa 0%, #c3bff7 45%)';
    }

    if(results.current.condition.text  === "Light snow"  || results.current.condition.text === 'Light snow showers'){
        weatherImageBox.src = `img/snow.png`;
        containerBody.style.backgroundColor= '#8bdcec';
        containerBody.style.backgroundImage= 'linear-gradient(135deg, #8bdcec 0%, #95bde2 100%)';
    }

    if(results.current.condition.text === 'Haze' || results.current.condition.text === 'Overcast' ){
        weatherImageBox.src = `img/haze.png`;
        containerBody.style.backgroundColor= '#b3afd9';
        containerBody.style.backgroundImage=  'linear-gradient(0deg, #b3afd9 0%, #97a6e1 100%)';
    }

    if(results.current.condition.text === 'Mist'||results.current.condition.text === 'Fog' ){
        weatherImageBox.src = `img/mist.png`
        containerBody.style.backgroundColor= '#b3afd9';
        containerBody.style.backgroundImage= 'linear-gradient(0deg, #b3afd9 0%, #97D9E1 100%)';    
    }

    if(results.current.condition.text === 'Partly cloudy'||results.current.condition.text === 'Cloudy'){
        weatherImageBox.src = `img/clouds.png`
        containerBody.style.backgroundColor='#8BC6EC';
        containerBody.style.backgroundImage= 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)';
    }

    if(results.current.condition.text === 'Patchy rain possible' || results.current.condition.text === "Patchy light drizzle" || results.current.condition.text === "Light rain"|| results.current.condition.text === "Light drizzle"){
        weatherImageBox.src = `img/drizzle.png`;
        containerBody.style.backgroundColor ='#0093E9';
        containerBody.style.backgroundImage= 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)';
    }

    if(results.current.condition.text === 'Clear'){
        weatherImageBox.src = `img/clear_sky_night.png`
        containerBody.style.background= 'rgb(2,0,36)';
        containerBody.style.background= 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';
    }

    if(results.current.condition.text === 'Rainy' || results.current.condition.text === 'Cloudburst'){
        weatherImageBox.src = `img/rainy.jpg`;
        containerBody.style.background='rgb(2,0,36)';
        containerBody.style.background='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 71%)';
    }

    if(results.current.condition.text === 'Patchy light rain with thunder'){
        weatherImageBox.src = `img/rain_with_thunder.png`;
        containerBody.style.background='#1a4eef';
        containerBody.style.background='linear-gradient(23deg, #1a4eef 0%, #d5e295 100%)';
    }
}
