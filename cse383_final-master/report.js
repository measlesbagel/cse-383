var reportURL = "https://caglema.aws.csi.miamioh.edu/final.php";
var method = "?method=getTemp";
var imgURL = "https://cse383-caglema.s3.amazonaws.com/sensor";
var imgType = ".jpg";

function getReport() {
  var sensor = "&sensor=";
  var location = "&location=";
  var quantity = "&qty=" + document.getElementById("quantity").value;
  if(document.getElementById("sensor").value.length !== 0) {
    sensor += document.getElementById("sensor").value;
  } else {
    sensor += "0";
  }
  if(document.getElementById("location").value.length !== 0) {
    location += document.getElementById("location").value;
  } else {
    location += "+";
  }
  a=$.ajax({
		url: reportURL + method + quantity + location + sensor,
		method: "GET",
	}).done(function(data) {
    $("#result").html("");
    var len = data.result.length;
    var date = "";
    var location = "";
    var sensor = "";
    var source = "";
    var value = "";

    if(len > 0) {
      $("#result").append(
        "<div class=\"card bg-dark\">" +
        " <div class=\"card-body\">" +
        "   <table class=\"table table-dark table-hover table-responsive\">" +
        "     <thead>" +
        "       <tr>" +
        "         <th scope=\"col\">Location</th>" +
        "         <th scope=\"col\">Sensor</th>" +
        "         <th scope=\"col\">Value</th>" +
        "         <th scope=\"col\">Source</th>" +
        "         <th scope=\"col\" class=\"text-center\">Date</th>" +
        "       </tr>" +
        "     </thead>" +
        "     <tbody id=\"resultTable\" name=\"resultTable\">" +
        "     </tbody>" +
        "   </table>" +
        " </div>" +
        "</div>"
      )
      for(let i=0; i<len; i++) {
        try {
          location = data.result[i].location;
          sensor = data.result[i].sensor;
          value = data.result[i].value;
          source = data.result[i].source;
          date = data.result[i].date;
        } catch {
          date = "NULL";
          location = "NULL";
          sensor = "NULL";
          source = "NULL";
          value = "NULL";
        }

        $("#resultTable").append(
          "<tr>" +
          "  <td>" + location + "</td>" +
          "  <td class=\"text-center\">" +
          "    <a href=\"" + imgURL + sensor + imgType + "\">" +
          "     <div style=\"height:100%;width:100%\">" + sensor + "</div>" +
          "    </a>" +
          "  </td>" +
          "  <td>" + value + "</td>" +
          "  <td>" + source + "</td>" +
          "  <td>" + date + "</td>" +
          "</tr>"
        )
      }
    } else {

      }

	}).fail(function(error) {
		console.log(error);
	});
};

$(document).ready(function() {
  for(let i = 1; i < 100; i++) {
    $("#quantity").append(
      "<option value=" + i + ">" + i + "</option>"
    )
  }

});
