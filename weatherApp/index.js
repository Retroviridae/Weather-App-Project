const forecastWeek = document.querySelector(".forecast-week")
const forecastCardTemplate = document.querySelector("#forecast_card_template")
const forecastMouseover = document.querySelector("#forecast_mouseover")
const form = document.querySelector('#form_location')

let searchedCities = [];

//get list of previous searches from database
fetch("http://localhost:3000/previousSearches")
    .then(resp => resp.json())
    .then(previousSearches => {
        searchedCities = [...previousSearches, ...searchedCities]; //in case search is made before fetch resolves, append at end
        renderSearches(searchedCities);
    })

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const city = e.target.querySelector('#city')
    const oldCards = document.querySelectorAll('.forecast-card')
    oldCards.forEach(
        (e)=>{e.remove()
    })
    getWeather(city.value)

    //add newly searched city to database
    fetch("http://localhost:3000/previousSearches", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "search": city.value
        })
    })
        .then(resp => resp.json())
        .then(addedSearch => {
            searchedCities = [...searchedCities, addedSearch];
            renderSearches(searchedCities);
        });
})

function renderSearches(searchedItemsList) {
    const searchedDOMList = document.querySelector("#past_searches");
    searchedDOMList.innerHTML = ""; //remove old list of searches

    searchedItemsList.forEach((searchedItem) => {
        newSearchElement = document.createElement("li");
        newSearchElement.textContent = searchedItem.search;
        searchedDOMList.append(newSearchElement);
    })
}

function getWeather (city){
    fetch(`https://weatherdbi.herokuapp.com/data/weather/${city}`)
    .then(resp => resp.json())
    .then(data => referenceData(data))
    const header = document.querySelector('#Header')
    const capCity = city.charAt(0).toUpperCase() + city.slice(1)

    header.textContent = capCity + " Forecast"
}

function referenceData(data){
    const upcomingArr = data.next_days
    upcomingArr.forEach((e)=>{
        makeNewCard(e)
    }) 
}

function makeNewCard(weatherDayObject) {
    const newForecastCard = forecastCardTemplate.cloneNode(deep=true);
    newForecastCard.id = "";
    newForecastCard.querySelector(".card-dayofweek").textContent = weatherDayObject.day;
    newForecastCard.querySelector(".card-low").textContent = "Min Temp F:" + weatherDayObject.min_temp.f;
    newForecastCard.querySelector(".card-high").textContent = "Max Temp F:" + weatherDayObject.max_temp.f;
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
        forecastMouseover.querySelector(".mouseover-celsius").textContent ="Min C:" + weatherDayObject.min_temp.c + "," + "Max C:" + weatherDayObject.max_temp.c;
    })

}

getWeather('denver');
