const forecastWeek = document.querySelector(".forecast-week")
const forecastCardTemplate = document.querySelector("#forecast_card_template")
const forecastMouseover = document.querySelector("#forecast_mouseover")
const form = document.querySelector('#form_location')
const btn = document.querySelector('#get-location')

let searchedCities = [];

//get list of previous searches from database
fetch("http://localhost:3000/previousSearches")
    .then(resp => resp.json())
    .then(previousSearches => {
        searchedCities = [...previousSearches, ...searchedCities]; //in case search is made before fetch resolves, append at end
        renderSearches(searchedCities);
    })
btn.addEventListener('click',(e)=>{
    getCity(e.target)
})
function getCity (){
    fetch('https://ip-fast.com/api/ip/?format=json&location=True')
    .then(resp => resp.json())
    .then(data => getWeather(data.city))
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const city = e.target.querySelector('#city')

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
    const fiveRecentSearches = searchedItemsList.slice(-5)

    fiveRecentSearches.forEach((searchedItem) => {
        newSearchElement = document.createElement("li");
        newSearchElement.textContent = searchedItem.search.charAt(0).toUpperCase() + searchedItem.search.slice(1);
        searchedDOMList.append(newSearchElement);

        //clicking on item searches for it again
        newSearchElement.addEventListener("click", (event) => {
            getWeather(event.target.textContent);
        })
    })
}

function getWeather (city){
    //remove old cards
    const oldCards = document.querySelectorAll('.forecast-card')
    oldCards.forEach(
        (e)=>{e.remove()
    })
    
    fetch(`https://weatherdbi.herokuapp.com/data/weather/${city}`)
    .then(resp => resp.json())
    .then(data => referenceData(data))
    const header = document.querySelector('#Header')
    const capCity = city.charAt(0).toUpperCase() + city.slice(1)

    header.textContent = capCity + " Forecast"


}

function referenceData(data){
    // console.log(data.currentConditions)
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
    const tempDiv = document.querySelectorAll('#temperature-div')
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
        if (newForecastCard.querySelector(".card-low").textContent == "Min Temp F:" + weatherDayObject.min_temp.f){
            forecastMouseover.querySelector(".mouseover-celsius").textContent = "Min C:" + weatherDayObject.min_temp.c + "," + "Max C:" + weatherDayObject.max_temp.c;
        }else if (newForecastCard.querySelector(".card-low").textContent == "Min Temp C:" + weatherDayObject.min_temp.c){
            forecastMouseover.querySelector(".mouseover-celsius").textContent = "Min F:" + weatherDayObject.min_temp.f + "," + "Max F:" + weatherDayObject.max_temp.f;
        }
    })
    newForecastCard.addEventListener("click", () => {
        //switch between f and c
        if (newForecastCard.querySelector(".card-low").textContent == "Min Temp F:" + weatherDayObject.min_temp.f){
            newForecastCard.querySelector(".card-low").textContent = "Min Temp C:" + weatherDayObject.min_temp.c
            newForecastCard.querySelector(".card-high").textContent ="Max Temp C:" + weatherDayObject.max_temp.c
        }
        else if (newForecastCard.querySelector(".card-low").textContent == "Min Temp C:" + weatherDayObject.min_temp.c){
            newForecastCard.querySelector(".card-low").textContent = "Min Temp F:" + weatherDayObject.min_temp.f
            newForecastCard.querySelector(".card-high").textContent ="Max Temp F:" + weatherDayObject.max_temp.f
        }
    })

}

getWeather('denver');
