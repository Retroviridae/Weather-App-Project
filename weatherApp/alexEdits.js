function getWeather (){
    fetch(`https://weatherdbi.herokuapp.com/data/weather/austin`)
    .then(resp => resp.json())
    .then(data => referenceData(data))
}
function referenceData(data){
    // TODO: Use data.next_days.forEach() to make this better
    console.log(data)
    const upcomingArr = data.next_days
    // upcomingArr.forEach((e)=>{
    //     makeNewCard(e)
    // }) 
}
function makeNewCard(weatherDayObject) {
    console.log(weatherDayObject)
    //Example weatherDayObject:
    // console.log(weatherDayObject)
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
    
    // const newForecastCard = forecastCardTemplate.cloneNode(deep=true);
    // //set new card's data to data from weatherDayObject
    // newForecastCard.id = "";
    // newForecastCard.querySelector(".card-dayofweek").textContent = weatherDayObject.day;
    // newForecastCard.querySelector(".card-low").textContent = weatherDayObject.min_temp.f;
    // newForecastCard.querySelector(".card-high").textContent = weatherDayObject.max_temp.f;
    // newForecastCard.querySelector(".card-comment").textContent = weatherDayObject.comment;
    // forecastWeek.append(newForecastCard);

}


    
    // data.currentConditions Has the basic data along with humidity, precipitation chance, wind speed, and dayof the week/time of day
        // .comment describes the day
        // .icon URL is the picture representing the day
        // .max_Temp is an object with celcius and farenheit
        //  .max_Temp.c  = max temp in C; .max_Temp.f = max temp in F
        // same for .min_Temp
        // .humidity = humidity percentage
        // .precip = precip precentage
        // .wind is an object with wind speed in km and miles
        // .wind.km or .wind.mile
        // .dayhour = day of the week and the time of the day
    // data.next_days[0] = This is the object describing of current day. 
        // .comment describes the day
        // .max_Temp is an object with celcius and farenheit
        // .max_Temp.c  = max temp in C; .max_Temp.f = max temp in F
        // same for .min_Temp
        // .icon URL is the picture representing the day
    // data.next_days[1]-data.next_days[7] has the same data for the upcoming days  
getWeather()