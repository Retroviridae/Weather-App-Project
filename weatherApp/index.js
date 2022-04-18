// working with clone. TESTING!!!
// // STRETCH GOAL: Fetching long and lat from location name
// Austin:  Lat: -97.78262, Long: 30.30086
// fetch('https://geocode.xyz/austin,tx?json=1')
// .then(resp => resp.json())
// .then(json => logCoordinates(json))

// function logCoordinates(json){
//     console.log(json)
//     console.log(json.latt)
//     console.log(json.longt)
// }

const longForm = document.querySelector('#longitude')
const latForm = document.querySelector('#latitude')
const realForm = document.querySelector('#form_location')
const body = document.querySelector('#mainBody')
// console.log(body)
// console.log(longForm)
// console.log(latForm)
// console.log(realForm)
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
    // console.log(weatherObj)
    // console.log(weatherObj.dataseries)
    const weatherArr = weatherObj.dataseries
    // console.log(weatherArr)
    // console.log(weatherObj.dataseries[0])
    // console.log(weatherObj.dataseries[0].rh2m)
    weatherArr.forEach((e)=>{
        cardMake(e)
    })
    function cardMake (e){
        const card = document.createElement('card')
        for (key in e){
            const ul = document.createElement('ul')
            ul.textContent = `${key}: ${e[key]}`
            card.appendChild(ul)
        }
        // const dataList = document.createElement('ul')
        // card.setAttribute('id','timepoint card')
        // dataList.textContent = `Relative humidity: ${weatherObj.dataseries[0].rh2m}`
        // card.appendChild(dataList)
        body.appendChild(card)
    }
}
// getWeather(-97.7,30.3)


// getWeather('-97.7','30.3')
// -97.743
// 30.267
// getInfo(-97.743,30.267)
// fetch('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civil&output=json')
// .then(resp => resp.json())
// .then(data => console.log(data))