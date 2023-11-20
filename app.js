const searchBar = document.getElementById('search_bar');
const search = document.getElementById('search');
const weatherImageBox = document.getElementById('weather_image_box');
const containerBody = document.getElementById('container_body');
const temperature = document.getElementById('temperature');
const Location = document.getElementById('Location');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind_speed');
const loading = document.getElementById('loading');

let searchedValue;
const API_KEY ='4998910207f2cac2bc6095f463b717b8';
let results;

const fetchWeatherData =async(query)=>{
    const response = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${query}`);
    return response;
}

const displayLoadingHandler = (data)=>{
   loading.style.display= 'flex';
   loading.innerHTML = `<h1>${data}</h1>`
}
const removeloadingHandler = ()=>{
    loading.style.display= 'none';
}
function fetchDataHandler(query,errorMessage){
    displayLoadingHandler('Loading...');
    fetchWeatherData(query)
   .then((res)=>  res.json()) 
   .then((data)=> { 
    results = data;
    renderWeather();
    removeloadingHandler();
  }).catch((err)=>{
    displayLoadingHandler(errorMessage)
    console.log(err);
  });
}

fetchDataHandler('india','Somthing went wrong! Please check your internet connection and try again');

searchBar.addEventListener('input',(e)=>{
    searchedValue = e.target.value;
});

search.addEventListener('click', ()=>{
    fetchDataHandler(searchedValue,`${searchedValue}  not found!`);
});



const renderWeather =()=>{

// weatherContainer.innerHTML = `<div class="weather_image">
//     <img src="img/clear.png" alt="weather" id="weather_image_box">
//     <h1 id="temperature">${results.current.temperature}°c</h1>
//     <h2 id="Location">${results.location.name}</h2>
// </div>
// <div class="weather_details">
//     <div class="humidity">
//         <div class="humidity_details">
//             <img src="img/humidity.png" alt="humidity">
//             <h2 id="humidity">${results.current.humidity}</h2>
//         </div>
//         <h3>Humidity</h3>
//     </div>
//     <div class="wind_speed">
//         <div class="wind_detailts">
//             <img src="img/wind.png" alt="wind speed">
//             <h2 id="wind_speed">${results.current.wind_speed}km/h</h2>
//         </div>
//         <h3>Wind Speed</h3>
//     </div>
// </div>
// </div>`

    temperature.innerText = `${results.current.temperature}°c`;
    Location.innerText = `${results.location.name}`;
    humidity.innerText = `${results.current.humidity}`;
    windSpeed.innerText =`${results.current.wind_speed}km/h`;

    if(results.current.weather_descriptions[0] === 'Sunny'){
        weatherImageBox.src = `img/clear.png`;
        containerBody.style.backgroundColor= '#08AEEA';
        containerBody.style.backgroundImage= 'linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)';
    }

    if(results.current.temperature  < -0  || results.current.weather_descriptions[0] === 'Snow'){
        weatherImageBox.src = `img/snow.png`;
        containerBody.style.backgroundColor= '#8bdcec';
        containerBody.style.backgroundImage= 'linear-gradient(135deg, #8bdcec 0%, #95bde2 100%)';
    }

    if(results.current.weather_descriptions[0] === 'Haze' || results.current.weather_descriptions[0] === 'Overcast' ){
        weatherImageBox.src = `img/haze.png`;
        containerBody.style.backgroundColor= '#b3afd9';
        containerBody.style.backgroundImage=  'linear-gradient(0deg, #b3afd9 0%, #97a6e1 100%)';
    }

    if(results.current.weather_descriptions[0] === 'Mist' ){
        weatherImageBox.src = `img/mist.png`
        containerBody.style.backgroundColor= '#b3afd9';
        containerBody.style.backgroundImage= 'linear-gradient(0deg, #b3afd9 0%, #97D9E1 100%)';    
    }

    if(results.current.weather_descriptions[0] === 'Partly cloudy'||results.current.weather_descriptions[0] === 'Cloudy'){
        weatherImageBox.src = `img/clouds.png`
        containerBody.style.backgroundColor='#8BC6EC';
        containerBody.style.backgroundImage= 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)';
    }

    if(results.current.weather_descriptions[0] === 'Patchy rain possible' || results.current.weather_descriptions[0] === "Patchy light drizzle"){
        weatherImageBox.src = `img/drizzle.png`;
        containerBody.style.backgroundColor ='#0093E9';
        containerBody.style.backgroundImage= 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)';
    }

    if(results.current.weather_descriptions[0] === 'Clear'){
        weatherImageBox.src = `img/clear_sky_night.png`
        containerBody.style.background= 'rgb(2,0,36)';
        containerBody.style.background= 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';
    }

    if(results.current.weather_descriptions[0] === 'Rainy' || results.current.weather_descriptions[0] === 'Cloudburst'){
        weatherImageBox.src = `img/rainy.jpg`;
        containerBody.style.background='rgb(2,0,36)';
        containerBody.style.background='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 71%)';
    }
}
