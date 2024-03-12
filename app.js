
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelslike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");


// to get the actual country name
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], {type: "region"}).of(code);
};

// to get the date and time

const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);
    console.log(curDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        //   second: "numeric",
      };
      
      const formatter = new Intl.DateTimeFormat("en-US", options);
      return formatter.format(curDate);
      
};

let city;

citySearch.addEventListener("submit", (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    // console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
} )

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63103304ec6924b2e5ef54ffcf61930c`;
    try{
        const res = await fetch(weatherUrl);
        const data = await res.json(res);

        const { main, name, weather, wind, sys, dt} = data;

        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt); 

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />"`;

        // let temp = main.temp.toFixed(2);
        w_temperature.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176`;
        w_minTem.innerHTML = `Min: ${(main.temp_min - 273.15).toFixed(2)}&#176`;
        w_maxTem.innerHTML = `Max: ${(main.temp_max - 273.15).toFixed(2)}&#176`;

        w_feelslike.innerHTML = `${(main.feels_like - 273.15).toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hpa`;
    } catch(error) {
        console.log(error);
    }
};


document.body.addEventListener("load", getWeatherData);
