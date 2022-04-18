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
    fetch(`https://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civil&output=json`)
    .then(resp => resp.json())
    .then(data => makeCards(data))
}


function makeCards (weatherObj){

    const weatherArray = weatherObj.dataseries

    console.log(weatherArray)
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


// fetch('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civil&output=json')
// .then(resp => resp.json())
// .then(data => console.log(data))