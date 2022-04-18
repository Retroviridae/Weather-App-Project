
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
// console.log(longForm)
// console.log(latForm)
// console.log(realForm)
realForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    locationInput(e.target)
})
function locationInput(target){
    // console.log(target)
    console.log(longForm.value)
    console.log(latForm.value)
    console.log(typeof(longForm.value))
    console.log(typeof(latForm.value))
    // const longInt = parseFloat(longForm.value)
    // const latInt = parseFloat(latForm.value)
    // console.log(longInt)
    // console.log(latInt)
    // console.log(typeof(longInt))
    // console.log(typeof(latInt))
    // getInfo(longForm.value,latForm.value)


    // console.log(longInt)
    // console.log(typeof(longInt))
    // getInfo(longInt,latInt)
}
function getInfo (long,lat){
    fetch(`https://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civil&output=json`)
    .then(resp => resp.json())
    .then(data => console.log(data))
}
// getInfo('-97.8','30.3')
// -97.743
// 30.267
// getInfo(-97.743,30.267)
// fetch('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civil&output=json')
// .then(resp => resp.json())
// .then(data => console.log(data))