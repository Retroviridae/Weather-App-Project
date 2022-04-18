function getWeather (){
    fetch(`https://weatherdbi.herokuapp.com/data/weather/austin`)
    .then(resp => resp.json())
    .then(data => referenceData(data))
}
function referenceData(data){
    console.log(data.currentConditions)
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
}
getWeather()