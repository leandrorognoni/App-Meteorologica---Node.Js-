var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Cargando...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                if(data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description     
                } else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                locationElement.textContent = data.cityName;
                //-273.5 para que figure en celsius en vez de fahrenheit, Math.trunc para truncar numero
                tempElement.textContent = Math.trunc((data.temperature - 273.5)) + String.fromCharCode(176) + " C";
             //   weatherCondition.textContent = data.description.toUpperCase();
              weatherCondition.textContent = verificarClima(data.description);
            }
        }) 
    });
})



function verificarClima(string){
   
    let cadenaVerificada = string;
    let aDevolver = "";
    let nublado = "clouds";
    let lluvioso = "rain";
    let niebla = "fog"
    let despejado = "clear"
  
    posicion = cadenaVerificada.indexOf(nublado);
    if(posicion !== -1){
        aDevolver = "PARCIALMENTE NUBLADO"
    }
  
    posicion = cadenaVerificada.indexOf(lluvioso);
    if(posicion !== -1){
        aDevolver = "LLUVIOSO"
    }

    posicion = cadenaVerificada.indexOf(despejado);
    if(posicion !== -1){
        aDevolver = "CIELO DESPEJADO"
    }

    posicion = cadenaVerificada.indexOf(niebla);
    if(posicion !== -1){
        aDevolver = "NIEBLA"
    }

    // si no se encuentra queda como esta 
   if(aDevolver === ""){
       aDevolver = cadenaVerificada;
   }

    return aDevolver;
}