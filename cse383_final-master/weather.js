var coordStart = "https://api.clearllc.com/api/v2/";
var coordURL = "miamidb/_table/zipcode";
var apiKey = "?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818";
var forecastStart = "https://api.openweathermap.org/data/2.5/";
var forecastType = "onecall?";
var iconURL = "https://openweathermap.org/img/wn/";
var iconEnd = "@2x.png";
var exclude = "&exclude=hourly,minutely,current,alerts";
var units = "&units=imperial"
var appid = "&appid=b259db7a178612beeaf8de4391a223e8";
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function findCoord() {
  var zipcode = "&ids=" + document.getElementById("zipcode").value;
  a=$.ajax({
		url: coordStart + coordURL + apiKey + zipcode,
		method: "GET"
	}).done(function(data) {
    $("#location").html("");
    $("#results").html("");
    document.getElementById("location").style.display = "flex";
    document.getElementById("results").style.display = "flex";

    var latitude = "";
    var longitude = "";
    var city = "";
    var state = "";

		try {
      latitude = data.resource[0].latitude;
      longitude = data.resource[0].longitude;
      city = data.resource[0].city;
      state = data.resource[0].state;
		} catch {
			latitude = "";
      longitude = "";
      city = "";
      state = "";
		}

    $("#location").append(
      "<div class=\"col\">" +
      "  <h4 class=\"text-white text-center font-weight-bold\">" + city + ", " + state + "</h4>" +
      "</div>"
    )

    getForecast(latitude, longitude);

	}).fail(function(error) {
		console.log(error);
	});
};

function getForecast(latitude, longitude) {
  var lat = "lat=" + latitude;
  var lon = "&lon=" + longitude;
  a=$.ajax({
		url: forecastStart + forecastType + lat + lon + exclude + units + appid,
		method: "GET"
	}).done(function(data) {
    console.log(data)

    var len = data.daily.length;
    var high = "";
    var low = "";
    var picture = "";
    var picSrc = "";
    var description = "";
    var day = "";
    var utcTime = "";

    for (var i = 0; i < len; i++) {
      try {
        high = data.daily[i].temp.max;
        low = data.daily[i].temp.min;
        picture = data.daily[i].weather[0].icon;
        description = data.daily[i].weather[0].description;
        picSrc = iconURL + picture + iconEnd;

        utcTime = data.daily[i].dt + data.timezone_offset;
        day = new Date(0);
        day.setUTCSeconds(utcTime);
        day = days[day.getDay()];

  		} catch {
        high = "";
        low = "";
        picture = "";
        description = "";
        picSrc = "";
        utcTime = "";

  		}
      $("#results").append(
        "<div class=\"col-12 col-sm-3 col-md\">" +
        "  <h6 class=\"text-white text-center font-weight-bold\">" + day + "</h6>" +
        "  <img src=\"" + picSrc + "\" alt=\"weather icon\" class=\"mx-auto d-block\">" +
        "  <p class=\"text-white text-center\">" + high + " &#8457; </p>" +
        "  <p class=\"text-muted text-center\">" + low + " &#8457; </p>" +
        "  <p class=\"text-white font-weight-bold text-center\">" + description + "</p>" +
        "</div>"
      )

    }

	}).fail(function(error) {
    $("#results").html("<h2 class=\"text-warning\">Something Went Wrong...</h2>");
		console.log(error);
	});
};
