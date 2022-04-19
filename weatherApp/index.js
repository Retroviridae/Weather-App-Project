const forecastWeek = document.querySelector(".forecast-week")
const forecastCardTemplate = document.querySelector("#forecast_card_template")
const form = document.querySelector('#form_location')
// console.log(form)

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(e.target)
    const city = document.querySelector('#city')
    console.log(city)
    console.log(city.value)
    getWeather(city.value)
})

function getWeather (city='dallas'){
    fetch(`https://weatherdbi.herokuapp.com/data/weather/${city}`)
    .then(resp => resp.json())
    .then(data => referenceData(data))
}
function referenceData(data){
    // TODO: Use data.next_days.forEach() to make this better
    const upcomingArr = data.next_days
    upcomingArr.forEach((e)=>{
        makeNewCard(e)
    }) 
}

function makeNewCard(weatherDayObject) {
    //Example weatherDayObject:
    
    // weatherDayObject = {
    //     day: "Monday",
    //     comment: "Partly cloudy",
    //     iconURL: "https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png",
    //     max_temp: {
    //         c: 17,
    //         f: 63
    //     },
    //     min_temp: {
    //         c: 7,
    //         f: 44
    //     }
    // }
    
    const newForecastCard = forecastCardTemplate.cloneNode(deep=true);
    //set new card's data to data from weatherDayObject
    newForecastCard.id = "";
    newForecastCard.querySelector(".card-dayofweek").textContent = weatherDayObject.day;
    newForecastCard.querySelector(".card-low").textContent = weatherDayObject.min_temp.f;
    newForecastCard.querySelector(".card-high").textContent = weatherDayObject.max_temp.f;
    newForecastCard.querySelector(".card-comment").textContent = weatherDayObject.comment;
    forecastWeek.append(newForecastCard);

}

// getWeather();
