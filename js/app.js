// ask permission for location
navigator.geolocation.getCurrentPosition(getWeather)

async function getWeather(position) {
  // localStorage.setItem('Latitude', position.coords.latitude)
  // localStorage.setItem('Longitude', position.coords.longitude)
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  // had issues with & and had to replace with  &amp; ONLY when printing to innerHTML
  // referenced https://stackoverflow.com/questions/2141799/amp-or-38-what-should-be-used-for-ampersand-if-we-are-using-utf-8-in-an
  const strBaseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
  try {
    // const objResponse = await fetch(strBaseUrl)
    const objResponse = await fetch(strBaseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!objResponse.ok) {
      throw new Error(`HTTP Error Status:${objResponse.status}`)
    }

    const objData = await objResponse.json()

    // ChatGPT helped me figure out that this if statement was incorrect
    // if (objData.length > 0) {
    if (objData) {
      // test to see if data is received
      // console.log(objData)
      const currTemp = document.getElementById("hCurrTemp")
      const currHum = document.getElementById("hCurrHum")
      currTemp.innerHTML = `<img src="./images/thermometer.svg" class="black-icon" alt="thermometer icon">`
      currTemp.innerHTML += objData.current.temperature_2m + objData.current_units.temperature_2m
      currHum.innerHTML = `<img src="./images/humidity.svg" class="black-icon" alt="humidity icon">`
      currHum.innerHTML += objData.current.relative_humidity_2m + objData.current_units.relative_humidity_2m
      // currIcon.innerHTML = "Current Weather: " + objData.current_weather.weathercode
      setIcon(objData.current.weather_code)
    } else {
      //Sweetalert for failure
      Swal.fire({
        title: 'Weather Not Found',
        icon: 'error'
      })
    }

  } catch (objError) {
    console.log('Error fetching objData', objError)
    //Create a Sweetalert for user indicating failure
  }
}

async function setIcon(weatherCode) {
  const currIcon = document.getElementById("oCurrIcon")
  // referenced https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
  const currDate = new Date()
  const currTime = currDate.getHours()
  // for testing icons
  // weatherCode = 55
  if (weatherCode == 0) {
    if (currTime > 6 && currTime < 18) {
      currIcon.setAttribute('data', './images/weather-icons/0-day.svg');
      currIcon.setAttribute('alt', 'clear day icon')
      currIcon.style["padding"] = "6px 0px 16px 0px"
    }
    else if (currTime < 6 || currTime > 18) {
      currIcon.setAttribute('data', './images/weather-icons/3-night.svg');
      currIcon.setAttribute('alt', 'clear night icon')
      currIcon.style["padding"] = "8px 0px 16px 0px"
    }
  }
  else if (weatherCode == 1) {
    if (currTime > 6 && currTime < 18) {
      currIcon.setAttribute('data', './images/weather-icons/1-day.svg');
      currIcon.setAttribute('alt', 'slightly cloudy day icon')
      currIcon.style["padding"] = "24px 0px 24px 0px"
    }
    else if (currTime < 6 || currTime > 18) {
      currIcon.setAttribute('data', './images/weather-icons/1-night.svg');
      currIcon.setAttribute('alt', 'slighly cloudy night icon')
      currIcon.style["padding"] = "22px 0px 22px 0px"
    }
    // referenced https://stackoverflow.com/questions/5191478/changing-element-style-attribute-dynamically-using-javascript
  }
  else if (weatherCode == 2) {
    if (currTime > 6 && currTime < 18) {
      currIcon.setAttribute('data', './images/weather-icons/2-day.svg');
      currIcon.setAttribute('alt', 'moderately cloudy day icon')
      currIcon.style["padding"] = "24px 0px 24px 0px"
    }
    else if (currTime < 6 || currTime > 18) {
      currIcon.setAttribute('data', './images/weather-icons/2-night.svg');
      currIcon.setAttribute('alt', 'moderately cloudy night icon')
      currIcon.style["padding"] = "22px 0px 22px 0px"
    }
  }
  else if (weatherCode == 3) {
    if (currTime > 6 && currTime < 18) {
      currIcon.setAttribute('data', './images/weather-icons/3-day.svg');
      currIcon.setAttribute('alt', 'very cloudy day icon')
      currIcon.style["padding"] = "24px 0px 24px 0px"
    }
    else if (currTime < 6 || currTime > 18) {
      currIcon.setAttribute('data', './images/weather-icons/3-night.svg');
      currIcon.setAttribute('alt', 'very cloudy night icon')
      currIcon.style["padding"] = "22px 0px 22px 0px"
    }
  }
  else if (weatherCode == 45 || weatherCode == 48) {
    currIcon.setAttribute('data', './images/weather-icons/45-48.svg');
    currIcon.setAttribute('alt', 'fog icon')
    currIcon.style["padding"] = "22px 0px 22px 0px"
  }
  else if (weatherCode == 51 || weatherCode == 56) {
    currIcon.setAttribute('data', './images/weather-icons/51-56.svg');
    currIcon.setAttribute('alt', 'slight rain icon')
    currIcon.style["padding"] = "20px 0px 38px 0px"
  }
  else if (weatherCode == 53 || weatherCode == 57 || weatherCode == 61 || weatherCode == 66 || weatherCode == 80) {
    currIcon.setAttribute('data', './images/weather-icons/53-57-61-66-80.svg');
    currIcon.setAttribute('alt', 'rain icon')
    currIcon.style["padding"] = "20px 0px 38px 0px"
  }
  else if (weatherCode == 55 || weatherCode == 63 || weatherCode == 81) {
    currIcon.setAttribute('data', './images/weather-icons/55-63-81.svg');
    currIcon.setAttribute('alt', 'moderate rain icon')
    currIcon.style["padding"] = "20px 0px 38px 0px"
  }
  else if (weatherCode == 65 || weatherCode == 67 || weatherCode == 82) {
    currIcon.setAttribute('data', './images/weather-icons/65-67-82.svg');
    currIcon.setAttribute('alt', 'severe rain icon')
    currIcon.style["padding"] = "22px 0px 42px 0px"
  }
  else if (weatherCode == 71 || weatherCode == 77) {
    currIcon.setAttribute('data', './images/weather-icons/71-77.svg');
    currIcon.setAttribute('alt', 'slight snow icon')
    currIcon.style["padding"] = "22px 0px 42px 0px"
  }
  else if (weatherCode == 73 || weatherCode == 85) {
    currIcon.setAttribute('data', './images/weather-icons/73-85.svg');
    currIcon.setAttribute('alt', 'moderate snow icon')
    currIcon.style["padding"] = "22px 0px 42px 0px"
  }
  else if (weatherCode == 75 || weatherCode == 86) {
    currIcon.setAttribute('data', './images/weather-icons/75-86.svg');
    currIcon.setAttribute('alt', 'severe snow icon')
    currIcon.style["padding"] = "22px 0px 42px 0px"
  }
  else if (weatherCode == 95 || weatherCode == 96 || weatherCode == 99) {
    currIcon.setAttribute('data', './images/weather-icons/95-96-99.svg');
    currIcon.setAttribute('alt', 'severe thunderstorm icon')
    currIcon.style["padding"] = "20px 0px 34px 2px"
  }
}
