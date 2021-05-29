var updateURL = "https://api.clearllc.com/api/v2/";
var updateMethod = "setTemp";
var apiKey = "?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818";
var userID = "&userid=caglema"

function updateSensor() {
  var location = "&location=" + document.getElementById("location").value;
  var sensor = "&sensor=" + document.getElementById("sensor").value;
  var value = "&value=" + document.getElementById("value").value;
  a=$.ajax({
		url: updateURL + updateMethod + apiKey + userID + location + sensor + value,
		method: "GET"
	}).done(function(data) {
    console.log(data);
    var status = "";
    var message = "";
    $("#result").html("");

    if(data.status == 0) {
      $("#result").append(
        "<div class=\"alert alert-success alert-dismissible\">" +
        "  <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>" +
        "  <strong>Success! Status: " + data.status + "</strong>" +
        "  <p>" + data.message + "</p>" +
        "</div>"
      )
    } else {
      status = data.status;
      message = data.statusText;

      if(status === undefined || message === undefined) {
        status = "Undefined";
        message = data.errorMessage;
      }

      $("#result").append(
        "<div class=\"alert alert-danger alert-dismissible\">" +
        "  <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>" +
        "  <strong>Failed! Status: " + status + "</strong>" +
        "  <p>" + message + "</p>" +
        "</div>"
      )
    }

	}).fail(function(error) {
		console.log(error);
	});
};
