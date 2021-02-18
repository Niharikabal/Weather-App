
  let now = new Date()
  let hour = now.getHours()
  if (hour<10){
    hour = `0${hour}`;
  }
  let minute = now.getMinutes()
  if (minute<10){
    minute=`0${minute}`
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days[now.getDay()]
 
  let time = document.querySelector("#current-time")

  time.innerHTML = (`${day} ${hour}:${minute} EST`)

  function searchCity(city){
    let apiKey = "57822825e6d539b302a053aaa93198f7"
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

     axios.get(apiUrl).then(showWeather)

  }

  function cityName(event){
    event.preventDefault()
     let city = document.querySelector("#search-input").value
    searchCity(city)
   
  }
    
  
  let form = document.querySelector("#search-form")
  form.addEventListener("submit", cityName)

  function showWeather(response){
  document.querySelector("#city").innerHTML=response.data.name
  let temp = Math.round(response.data.main.temp)
  document.querySelector("#temperature").innerHTML=(`${temp}°C`);
  let feel = Math.round(response.data.main.feels_like)
  document.querySelector("#real-feel").innerHTML = `Real feel ${feel}°C`
  if (feel < 0) {
   document.querySelector("#real-feel").innerHTML = `Real feel ${feel}°C 🥶`
  } else {
    document.querySelector("#real-feel").innerHTML = `Real feel ${feel}°C 😃`
  }
  document.querySelector("#humid").innerHTML = Math.round(response.data.main.humidity)
  document.querySelector("#windy").innerHTML = Math.round(response.data.wind.speed)
  document.querySelector("#description").innerHTML = response.data.weather[0].main

}

searchCiy("Toronto")

function searchLocation(position){
  let apiKey = "57822825e6d539b302a053aaa93198f7"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(showWeather)

}
 
function getCurrentLocation(event){
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(searchLocation)

}
let curentLocationButton = document.querySelector("#current-location-button")
currentLocationButton.addEventListener ("click", getCurrentLocation)


 

