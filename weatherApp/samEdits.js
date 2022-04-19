

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
    forecastWeek.append(newForecastCard);


}