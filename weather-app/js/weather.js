let vals = $('#json-results');
let lon, lat, sunrise, sunset;
const urlAPI = 'https://fcc-weather-api.glitch.me/api/current?'
const date = new Date();
let celciusTemp;

$(document).ready(function () {
    let pos = getPosition();
    pos.then(function (data) {
            lon = "lon=" + data.coords.longitude;
            lat = "lat=" + data.coords.latitude;
            getWeather(lon, lat);
        })
        .catch(function (error) {
            console.log(error);
            $.getJSON('https://cors-anywhere.herokuapp.com/http://freegeoip.net/json/', function (data) {
                lon = "lon=" + data.longitude;
                lat = "lat=" + data.latitude;
                // console.log(data);
                getWeather(lon, lat, 'alternative');
            });
        })

    $(".degrees").on("click", function () {
        if ($('.degrees').text() === String.fromCharCode(8451)) {
            let temp = (celciusTemp * 1.8) + 32;
            $('.temperature').text(temp.toFixed(2));
            $('.degrees').text(String.fromCharCode(8457));
        } else {
            $('.temperature').text(celciusTemp);
            $('.degrees').text(String.fromCharCode(8451));
        }
    });
});

let getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

let getWeather = function (lon, lat) {
    let altLocation = false;
    if (arguments.length > 2) {
        altLocation = true;
    }
    $.ajax({
        url: urlAPI + lon + '&' + lat,
        success: function (res) {
            $(".loader").css("display", "none");
            // console.log(JSON.stringify(res, null, 4));
            celciusTemp = res.main.temp;
            if (altLocation) {
                $('.alt-location').text("[This city's Weather is based on your IP Address]")
            }
            $('.city').text(res.name);
            $('.temperature').text(celciusTemp);
            $('.temp-icon').text(res.weather[0].description);
            console.log(res.weather[0].id)
            getWeatherIcon(res.weather[0].id);
        },
        error: function (error) {
            $(".display-weather").append("<h1>Data could not be retrieved, " + error + "</h1>");
        }
    });
}

/*  @params
 *  weather = type int, id for JSON data
 *  daytime = object, contains times, sunrise, sunset
 *  function sets icon class to display
 */
function getWeatherIcon(weather) {
    let lng = lon.replace('on', 'ng');
    let setIcon = 'wi wi-';
    $.getJSON("https://api.sunrise-sunset.org/json?" + lat + "&" + lng + "&date=today&formatted=0", function (data) {
        // console.log(JSON.stringify(data, null, 2));
        sunrise = new Date(data.results.sunrise);
        sunset = new Date(data.results.sunset);
        if (date.getTime() > sunrise.getTime() && date.getTime() < sunset.getTime()) {
            setIcon += 'day-';
        } else {
            setIcon += 'night-';
        }

    }).then(function(data) {
        if (weather >= 200 && weather < 300) {
            // thunderstorm
            setIcon += 'thunderstorm';
            $("body").css({
                "background": "url(\"images/thunderstorm.jpg\") no-repeat center center fixed",
                "background-size": "cover",
                "min-height": "100%"
            });
        } else if (weather >= 300 && weather < 400) {
            // light drizzle/sprinkle
            setIcon += 'sprinkle';
            $("body").css({
                "background": "url(\"images/sprinkle.jpg\") no-repeat center center fixed",
                "background-size": "cover",
                "min-height": "100%"
            });
        } else if (weather >= 500 && weather < 600) {
            // rain
            setIcon += 'rain';
            $("body").css({
                "background": "url(\"images/rain.jpg\") no-repeat center center fixed",
                "background-size": "cover",
                "min-height": "100%"
            });
        } else if (weather >= 600 && weather < 700) {
            // snow
            setIcon += 'snow';
            $("body").css({
                "background": "url(\"images/snow.jpg\") no-repeat center center fixed",
                "background-size": "cover",
                "min-height": "100%"
            });
        } else if (weather >= 700 && weather < 800) {
            // atmosphere, affecting vision
            setIcon += 'fog';
            $("body").css({
                "background": "url(\"images/fog.jpg\") no-repeat center center fixed",
                "background-size": "cover",
                "min-height": "100%"
            });
        } else if (weather === 800) {
            // clear weather
            setIcon = setIcon.includes('day') ? 'wi wi-day-sunny' : 'wi wi-night-clear';
            let setImage = setIcon.includes('day') ? 
                    "url(\"images/sunny.png\") no-repeat center center fixed" : 
                    "url(\"images/clear-night.png\") no-repeat center center fixed";
            $("body").css({
                "background": setImage,
                "background-size": "cover",
                "min-height": "100%"
            });
        } else if (weather >= 801 && weather <= 804) {
            // cloudy
            setIcon += 'cloudy';
            $("body").css({
                "background": "url(\"images/cloudy.jpg\") no-repeat center center fixed",
                "background-size": "cover",
                "min-height": "100%"
            });
        } else if (weather >= 900 && weather <= 962) {
            // windy
            setIcon = 'wi wi-strong-wind';
            $("body").css({
                "background-image": "url(\"images/windy.jpg\") no-repeat center center fixed",
                "background-size": "cover",
                "min-height": "100%"
            });
        } else {
            setIcon = setIcon.includes('day') ? 'wi wi-day-sunny' : 'wi wi-night-clear';
            let setImage = setIcon.includes('day') ? 
                    "url(\"images/sunny.png\") no-repeat center center fixed" : 
                    "url(\"images/clear-night.png\") no-repeat center center fixed";
            $("body").css({
                "background-image": setImage,
                "background-size": "cover",
                "min-height": "100%"
            });
        }
        $('#weather-icon').addClass(setIcon);
    })
}