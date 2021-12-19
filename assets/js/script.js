var searchFormInput = document.getElementById("city-search");
console.log(searchFormInput)

var getApi = function(searchFormInput) {
    if(searchFormInput === "") {
        window.alert("Search for a city");
    } else { 
        var requestUrl = "api.openweathermap.org/data/2.5/weather?q=" +searchFormInput+ "&units=imperial&appid=1ef150e369e5b8692658a97ab2e7fef1";
        
        fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var longitude = data.coord.lon;
            var latitude = data.coord.lat;
            console.log(data)
        })
    }
}