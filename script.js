const weatherBlock = document.querySelector('.weather');

async function loadWeather(location) {
    weatherBlock.innerHTML = `
    <div class="weather__loading">
        <img src="img/romashka.gif" width="100" height="100" alt="Loading...">
    </div>`;
    const currentLocation = location;
    const server = `https://api.openweathermap.org/data/2.5/weather?q=${location}&exclude=current&units=metric&lang=ua&APPID=ebaf71970584da979a4173632dd20573`;
    const response = await fetch(server, {method: 'GET'});
    const responseAnswer = await response.json();
    if (response.ok) {
        getWeather(responseAnswer);
    }
    else {
        weatherBlock.innerHTML=responseAnswer.message;
    }
}
function getWeather(data){
    const city = data.name;
    const country = data.sys.country;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const wind = data.wind.speed;
    const tempFact = Math.round(data.main.temp);
    const tempFeels = Math.round(data.main.feels_like);
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const fullSunrise = new Date(data.sys.sunrise*1000);
    const fullSunset = new Date(data.sys.sunset*1000);
    const sunrise = fullSunrise.toLocaleTimeString();
    const sunset = fullSunset.toLocaleTimeString();

    let day = new Date();
    const template = `
         <div class="weather__top">
             <div class="weather__left">
                <div class="weather__city ">${city || 'City'}, ${country || 'XX'}</div>
                <div class="weather__phenomenon ">
                    <div class="weather__phenomenon-icon">
                        <img class="weather__icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description || 'icon'}">
                    </div>
                    <div class="weather__phenomenon-description">${description || 'description'}</div>
                </div>
                <div class="weather__wind  ">вітер ${wind || '0.00'} м/с</div>
                <div class="weather__date">${day.toLocaleDateString() || 'xx.xx.xxxx'}</div>
                </div>
                <div class="weather__right">
                <div class="weather__temp ">
                    <div class="weather__temp-fact">${tempFact || '00'} &degC</div>
                    <div class="weather__temp-feeling">відчувається як ${tempFeels || '00'} &degC</div>
                </div>
                <div class="weather__pressure ">${pressure || '0000'} мм.рт.ст</div>
                <div class="weather__humidity ">${humidity || '00'} %</div>
                <div class="weather__sunrise">сх. ${sunrise || 'xx:xx'}</div>
                <div class="weather__sunset">зах. ${sunset || 'xx:xx'}</div>
                <div class="weather__time">${day.toLocaleTimeString() || '00:00:00'}</div>
            </div>
        </div>
        <div class="weather__down">
            <div class="weather__location">
                <select class="weather__selectLocation" name="location" onchange="reloadWeather()">
                    <option class="weather__locationName" hidden value="Kyiv,UA">${city || 'City'}, ${country || 'XX'}</option>
                    <option class="weather__locationName" value="Kyiv,UA">Kyiv,UA</option>
                    <option class="weather__locationName" value="Kovel,UA">Kovel,UA</option>
                    <option class="weather__locationName" value="Khmelnytskyi,UA">Khmelnytskyi,UA</option>
					<option class="weather__locationName" value="Kiten,BG">Kiten,BG</option>
					<option class="weather__locationName" value="Punta Cana,DO">Punta Cana,DO</option>
                </select>
            </div>
        </div>
`;
    weatherBlock.innerHTML = template;

}
if(weatherBlock){loadWeather('Kyiv,UA')}

function time(){
    let days = new Date();
    const timeBlock = document.querySelector('.weather__time');
    timeBlock.innerHTML= days.toLocaleTimeString()
}
setInterval(()=> {
    time()
}, 1000);

function reloadWeather(){
    const location = document.querySelector('.weather__selectLocation').value;
    console.log(location);
    loadWeather(location);
}