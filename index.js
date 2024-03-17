// API_KEY = ac1d3a2c91c6775a8e53b92b7fc6ebca
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric
// https://api.openweathermap.org/data/2.5/weather?q=Ulsan&appid=ac1d3a2c91c6775a8e53b92b7fc6ebca&units=metric
// https://api.openweathermap.org/data/2.5/weather?q=moscow&appid=ac1d3a2c91c6775a8e53b92b7fc6ebca&units=metric

const API_KEY = "ac1d3a2c91c6775a8e53b92b7fc6ebca"
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')
const card = document.querySelector('.card')

async function checkWeather(city) {
  const response = await fetch(API_URL + city + `&appid=${API_KEY}`)

  if(response.status == 404) {
    document.querySelector('.error').style.display = 'block'
    document.querySelector('.weather').style.display = 'none'
  }

  else {
    let data = await response.json()
    console.log(`City name: ${data.name}`)
    console.log(`Weather: ${data.weather[0].main}`)
    console.log(`Temperature: ${data.main.temp}°C`)
    console.log(`Humidity: ${data.main.humidity}%`)
    console.log(`Wind speed: ${data.wind.speed} km/h`)
    
    document.querySelector(".city").innerHTML = data.name
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C'
    document.querySelector('.humidity').innerHTML = Math.round(data.main.humidity) + '%'
    document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + 'km/h'
  
    // Displaying appropriate images
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = 'images/clouds.png'
    }
    else if (data.weather[0].main == "Clear") {
      weatherIcon.src = 'images/clear.png'
    }
    else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = 'images/drizzle.png'
    }
    else if (data.weather[0].main == "Mist") {
      weatherIcon.src = 'images/mist.png'
    }
    else if (data.weather[0].main == "Rain") {
      weatherIcon.src = 'images/rain.png'
    }
    else if (data.weather[0].main == "Snow") {
      weatherIcon.src = 'images/snow.png'
    }
  
    // Changing background colors corresponding to temperature
    if (Math.round(data.main.temp) < 0) {
      card.style.background = 
      `linear-gradient(135deg, #ADA996, #F2F2F2, #DBDBDB, #EAEAEA)`
      card.style.color = `#222`
    }
    if (0 <= Math.round(data.main.temp) && Math.round(data.main.temp) < 10) {
      card.style.background = 
      `linear-gradient(135deg, #00B4DB, #0083B0)`
      card.style.color = `#FFF`
    }
    if (10 <= Math.round(data.main.temp) && Math.round(data.main.temp) < 20) {
      card.style.background = 
      `linear-gradient(135deg, #ffb347, #ffcc33)`
      card.style.color = `#FFF`
    }
    if (20 <= Math.round(data.main.temp) && Math.round(data.main.temp) < 30) {
      card.style.background = 
      `linear-gradient(135deg, #ff9966, #ff5e62)`
      card.style.color = `#FFF`
    }
    if (Math.round(data.main.temp) > 30) {
      card.style.background = 
      `linear-gradient(135deg, #D31027, #EA384D)`
      card.style.color = `#FFF`
    }
    document.querySelector('.weather').style.display = 'block'
    document.querySelector('.error').style.display = 'none'
  }
}

// 돋보기 모양의 search button 클릭 시 checkWeather 함수 실행
searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value)
})

// 엔터키 입력시 checkWeather 함수 실행
document.addEventListener('keypress', (event) => {
  if(event.key === 'Enter') {
    checkWeather(searchBox.value)
  }
})