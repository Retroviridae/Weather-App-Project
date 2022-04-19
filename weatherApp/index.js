// Austin:  Lat: -97.78262, Long: 30.30086
// fetch('https://geocode.xyz/austin,tx?json=1')


const longForm = document.querySelector('#longitude')
const latForm = document.querySelector('#latitude')
const realForm = document.querySelector('#form_location')
const body = document.querySelector('#mainBody')

const forecastWeek = document.querySelector(".forecast-week")
const forecastCardTemplate = document.querySelector("#forecast_card_template")
const forecastMouseover = document.querySelector("#forecast_mouseover")


realForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    getWeather(longForm.value,latForm.value)
})

function getWeather (long,lat){
    fetch(`https://weatherdbi.herokuapp.com/data/weather/austin`)
    .then(resp => resp.json())
    .then(data => makeCards(data))
}


function makeCards (weatherObj){
    console.log(weatherObj)
    const weatherArray = weatherObj.dataseries
    // const filterArray = weatherArray.filter(obj => obj.timepoint <= 21)
    const dayOneArray = weatherArray.slice(0,7)
    const dayTwoArray = weatherArray.slice(7,14)
    

    // console.log(weatherArray)
    // console.log(filterArray)
    console.log(dayOneArray)
    console.log(dayTwoArray)

    weatherArray.forEach((weatherTimePoint) => {
        const card = document.createElement('card')
        for (key in weatherTimePoint){
            const ul = document.createElement('ul')
            ul.textContent = `${key}: ${weatherTimePoint[key]}`
            card.appendChild(ul)
        }
        body.appendChild(card)
    })
}

function makeNewCard(weatherDayObject) {
    //Example weatherDayObject:
    
    weatherDayObject = {
        day: "Monday",
        comment: "Partly cloudy",
        iconURL: "https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png",
        max_temp: {
            c: 17,
            f: 63
        },
        min_temp: {
            c: 7,
            f: 44
        }
    }
    
    const newForecastCard = forecastCardTemplate.cloneNode(deep=true);
    //set new card's data to data from weatherDayObject
    newForecastCard.id = "";
    newForecastCard.querySelector(".card-dayofweek").textContent = weatherDayObject.day;
    newForecastCard.querySelector(".card-low").textContent = weatherDayObject.min_temp.f;
    newForecastCard.querySelector(".card-high").textContent = weatherDayObject.max_temp.f;
    newForecastCard.querySelector(".card-comment").textContent = weatherDayObject.comment;
    newForecastCard.querySelector("img").src = weatherDayObject.iconURL;
    forecastWeek.append(newForecastCard);
  
    //add hover event listener to card
    newForecastCard.addEventListener("mouseenter", () => {
        forecastMouseover.style.display = "block";
    })

    newForecastCard.addEventListener("mouseleave", () => {
        forecastMouseover.style.display = "none";
    })

    newForecastCard.addEventListener("mouseover", (event) => {
        //move mouseover div to mouse
        forecastMouseover.style.left = (event.clientX) + "px";
        forecastMouseover.style.top = (event.clientY) + "px";

    })

}




// fetch('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civil&output=json')
// .then(resp => resp.json())
// .then(data => console.log(data))