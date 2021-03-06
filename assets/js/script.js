// getting current date
let currentDayEl = document.getElementById("currentday")
const time = moment().format('L');
 let currentHour = time;

// declairing variables for html elements
var searchbtn = document.querySelector('.search-btn')
var citydiv = document.getElementById('city-div')
var statsdiv = document.getElementById('stats-div')
var carddiv = document.getElementById('card-div-id');
var citycontainer = document.getElementById('city-list-id');

  // empty array to put my cities in and eventually store in local storage  
citylist = [];

var searchFormInput = document.getElementById('form-inputt').value;
console.log(searchFormInput)

// Retreiving the open weather API url and using json() to parse it

var getApi = function(searchFormInput) {
   if(searchFormInput === "") {
    alert('You need to put in a city')
}
else{
        var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+searchFormInput+'&units=imperial&appid=f3f6873cc9976931776edb6b53e29545';
  
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
// storing lon and lat data from first api in these variables
        var Lon = data.coord.lon;
        var Lat = data.coord.lat;

// stops elements from appending to container continuously when the search button is clicked by first emptying whatever is in there and generating new data
$('#stats-div').empty();
// create a new div, set the textcontext to data.name and append to statsdiv
var cityName = document.createElement('h2');

cityName.textContent = data.name + ` (${currentHour}) `;
statsdiv.append(cityName);


// create a new div, set the textcontext to data.main.temp and append to statsdiv
var tempValue = document.createElement('h5');
tempValue.textContent = 'Temperature: '+data.main.temp+'F';
statsdiv.append(tempValue);

// create a new div, set the textcontext to data.name and append to statsdiv
var humValue = document.createElement('h5');
humValue.textContent = 'Humidity: '+data.main.humidity+'%';
statsdiv.append(humValue);

// create a new div, set the textcontext to data.name and append to statsdiv
var windValue = document.createElement('h5');
windValue.textContent = 'Wind Speed: '+data.wind.speed+'mph';
statsdiv.append(windValue);


// getting the UV index data with a different endpoint and passing the lon and lat obtained from the first api call as a variable
var url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+Lat+'&'+'lon='+Lon+'&exclude=hourly,daily&appid=f3f6873cc9976931776edb6b53e29545';
fetch(url)
.then(function(res) {
    return res.json();
})
.then(function(dat)
{
// create a new div, set the textcontext to data.name and append to statsdiv
var uvValue = document.createElement('div');
var uvbtn = document.createElement('button');
uvbtn.textContent = dat.current.uvi;

// uvValue.className = "uvValue";
if (dat.current.uvi < 3) {
   uvbtn.className = "uvValue"
}
else if (dat.current.uvi > 3 && dat.current.uvi < 6) {
    uvbtn.className = "uvValue2"}
else {
    uvbtn.className = "uvbtn";
}
uvValue.textContent = 'UV Index: ';
statsdiv.appendChild(uvValue);
uvValue.append(uvbtn);
    })


// Five day Forecast data

var url_link = 'https://api.openweathermap.org/data/2.5/forecast?q='+data.name+'&appid=f3f6873cc9976931776edb6b53e29545';
fetch(url_link)
.then(function(resp) {
    return resp.json();
})
.then(function(forecastdata)
{
    $('#card-div-id').empty();
    // creating an array of days I want to loop over because the api give trhe forecast in 3 hour increments so using a regular for loop will return the wrong data
var day = [0, 8, 16, 24, 32];
day.forEach(function(i) {
    // create a new div, set the textcontext to data.name and append to card-div
    var forecastInfo = document.createElement('card');
    forecastInfo.className = "newcard";
    forecastInfo.textContent = forecastdata.list[i].dt_txt;
    carddiv.appendChild(forecastInfo);

    // creating the weather icon element and appending it to the forecast container
    var icon = forecastdata.list[i].weather[0].icon;
    // console.log(icon);
    var img = document.createElement("img");
    img.src =  `http://openweathermap.org/img/wn/${icon}@2x.png`
    forecastInfo.append(img);

    // creating the temperature element and appending it to the forecast container
    var tempVal = document.createElement('p');
    tempVal.className = "newcard";
    tempVal.textContent = 'Temp: '+forecastdata.list[i].main.temp+'K';
    forecastInfo.appendChild(tempVal);

    // creating the wind speed element and appending it to the forecast container
    var windVal = document.createElement('p');
    windVal.className = "newcard";
    windVal.textContent = 'Wind: '+forecastdata.list[i].wind.speed+' mph';
    forecastInfo.appendChild(windVal);

    // creating the humidity element and appending it to the forecast container
    var humVal = document.createElement('p');
    humVal.className = "newcard";
    humVal.textContent = 'Humidity: '+forecastdata.list[i].main.humidity+'%';
    forecastInfo.appendChild(humVal);
        });
    });
});
} 

}


function searchHistory (searchFormInputt) {
    var searchFormInputt = document.getElementById('form-inputt').value;
    console.log(searchFormInputt)
if (searchFormInputt) { 
    if (citylist.indexOf(searchFormInputt) === -1) {
citylist.push(searchFormInputt)
}   
}
else { 
    removeIndex = citylist.indexOf(searchFormInputt);
    citylist.splice(removeIndex, 1)
}
saveData();
}

// search history persistence - setting the data
var saveData = function() {
    
    var searchFormInputt = document.getElementById('form-inputt').value;
    if(searchFormInputt === "") {
        return
    }
    else {
                var city = document.getElementById('city-list-id');
var btnEl = document.createElement('button');
btnEl.className = 'newlistbtn';
btnEl.setAttribute("id", "newlistbtn-id")
btnEl.textContent = searchFormInputt;
btnEl.setAttribute("name", searchFormInputt)
city.prepend(btnEl);
console.log(btnEl.textContent);
btnEl.addEventListener('click', getApi(btnEl.textContent));
    localStorage.setItem('city', JSON.stringify(citylist));  

    }

}


var loadSavedData = function() {
// search history persistence - getting the data

    var city = JSON.parse(localStorage.getItem('city'));
    if((city === []) || (city === null)) {
        return;
    }
    else {

        for(var i = 0; i < city.length; i++) {
        var cityName = document.getElementById('city-list-id')
        var newlist = document.createElement('button');
        newlist.className = 'newlistbtn';
        newlist.setAttribute("id", "newlistbtn-id")
        newlist.textContent = city[i];
        cityName.prepend(newlist);
        newlist.addEventListener('click',getApi(city));
    }
    }
}

citycontainer.addEventListener('click',function(e) {
    getApi(e.target.textContent);
});

loadSavedData();
searchbtn.addEventListener('submit', getApi);
searchbtn.addEventListener('click', searchHistory);
