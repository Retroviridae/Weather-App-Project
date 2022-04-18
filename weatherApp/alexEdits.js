function getWeather (){
    fetch(`https://weatherdbi.herokuapp.com/data/weather/austin`)
    .then(resp => resp.json())
    .then(data => callBack(data))
}
function callBack(data){
    console.log(data)
}
getWeather()