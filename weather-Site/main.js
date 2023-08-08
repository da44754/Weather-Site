const Monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",],
    Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];


//mesh shaghala  mesh 4arfa leh 
// async function getData(city="cairo") {
//     async function x(val="cairo") {
//     var response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=%20d1b632ff75214bbab18131754230808&q=${val}&days=3");
//     var res= await response.json();
//     console.log(res);
//     DaysWeather(res.current, res.location, res.forecast);
//     console.log(res.forecast);
// }
//     x(city);
// }

// collect all data from the api
function  allData(city="cairo") {
    // Create an XMLHttpRequest object
    const xhttp = new XMLHttpRequest();
    // Send a request
    xhttp.open(
        "GET",
        `https://api.weatherapi.com/v1/forecast.json?key=%20d1b632ff75214bbab18131754230808&q=${city}&days=7`
    );
    xhttp.send();
    //check that the response is correct
    xhttp.addEventListener("readystatechange", () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const response = JSON.parse(xhttp.response);
            console.log(response);
            DaysWeather(response.current, response.location, response.forecast);
            console.log(response.forecast);
        }
    });
} 

function DaysWeather(current, location, NextDay) {
    // first card
    const cartouna = document.getElementById('demo');
    cartouna.innerHTML = ` <div class="card col-lg-4">
    <div class="card-header d-inline " id="today">
        <div class="day float-start">${Days[new Date().getDay(location.localtime)]}</div>
        <div class=" date float-end">${new Date().getDate(location.localtime)} ${Monthes[new Date().getMonth(location.localtime)]}</div>
    </div>
    <div class="card-body" id="cureent">
        <div class="location">${location.region}, ${location.country}</div>
        <div class="degree d-flex flex-wrap">
            <div class="num">${current.temp_c}<sup>o</sup>C</div>
            <div class="forecast-icon">
                <img src="${current.condition.icon}" alt="" width="90">
            </div>
        </div>
        <div class="custom ">${current.condition.text}</div>
        <span class="me-3"><img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt="" width="21" height="22">${current.humidity
        }%</span>
        <span class="me-3"><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="" width="23" height="22">${current["wind_kph"]
        }km/h</span>
        <span class="me-3"><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt="" width="21" height="22">East</span></div>
    </div>`;
    //loop for second and third card 
    for (let i = 1; i <= 2; i++) {
        //check if it is the second or not to make its background different  
        if (i % 2 !== 0) {
            cartouna.innerHTML += `<div class="card card2 col-lg-4">
            <div class="card-header">
            <div class="day">${Days[new Date(NextDay.forecastday[i].date).getDay()]
                }</div>
            </div>
            <div class="card-body text-center">
            <div class="forecast-icon pt-5">
            <img src="${NextDay.forecastday[i].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">${NextDay.forecastday[i].day.maxtemp_c
                }<sup>o</sup>C</div>
            <small>${NextDay.forecastday[i].day.mintemp_c}<sup>o</sup></small>
            <div class="custom">${NextDay.forecastday[i].day.condition.text}</div>
            </div>
            </div>`}
        else {
            cartouna.innerHTML += `<div class="card col-lg-4">
            <div class="card-header">
            <div class="day">${Days[new Date(NextDay.forecastday[i].date).getDay()]
                }</div>
            </div>
            <div class="card-body text-center">
            <div class="forecast-icon pt-5">
            <img src="${NextDay.forecastday[i].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">${NextDay.forecastday[i].day.maxtemp_c
                }<sup>o</sup>C</div>
            <small>${NextDay.forecastday[i].day.mintemp_c}<sup>o</sup></small>
            <div class="custom">${NextDay.forecastday[i].day.condition.text}</div>
        </div>
    </div>`}
    }
}

// default cards
    allData("Cairo");

// search function 
const searchInput =document.getElementById("input")
searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    allData(value);
})