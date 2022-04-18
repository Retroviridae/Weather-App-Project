// Austin:  Lat: -97.78262, Long: 30.30086
// fetch('https://geocode.xyz/austin,tx?json=1')


const longForm = document.querySelector('#longitude')
const latForm = document.querySelector('#latitude')
const realForm = document.querySelector('#form_location')
const body = document.querySelector('#mainBody')


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
getWeather('-97.7','30.3')

// fetch('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civil&output=json')
// .then(resp => resp.json())
// .then(data => console.log(data))