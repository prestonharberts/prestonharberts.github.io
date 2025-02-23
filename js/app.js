// Start GLobal Variables
// End Global Variables

const currTemp = document.getElementById("hCurrTemp")
const currHum = document.getElementById("hCurrHum")
const currIcon = document.getElementById("pCurrIcon")


document.querySelector('#btnLocation').addEventListener('click', function () {
  // adapted from https://www.w3schools.com/html/html5_geolocation.asp
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather)
  }
  // TODO add fallback if location is denied
})

if (localStorage.getItem('Latitude') && localStorage.getItem('Longitude')) {
  navigator.geolocation.getCurrentPosition(getWeather)
}

async function getWeather(position) {
  localStorage.setItem('Latitude', position.coords.latitude)
  localStorage.setItem('Longitude', position.coords.longitude)
  const latitude = localStorage.getItem('Latitude')
  const longitude = localStorage.getItem('Longitude')
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
      console.log(objData)
      currTemp.innerHTML = objData.current.temperature_2m + objData.current_units.temperature_2m
      currHum.innerHTML = objData.current.relative_humidity_2m + objData.current_units.relative_humidity_2m
      // currIcon.innerHTML = "Current Weather: " + objData.current_weather.weathercode
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