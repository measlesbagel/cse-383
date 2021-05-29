var urlStart = "https://api.clearllc.com/api/v2/math/";
var apiKey = "?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818";

function calculate() {
  var operator = document.getElementById("operator").value;
  var n1 = "&n1=" + document.getElementById("n1").value;
  var n2 = "&n2=" + document.getElementById("n2").value;
  a=$.ajax({
		url: urlStart + operator + apiKey + n1 + n2,
		method: "GET"
	}).done(function(data) {
		$("#result").html("");
    var result = "";

		try {
			result = data.result;
		} catch {
			result = "";
		}

			$("#result").append("<h3 class=\"text-white font-weight-bold\">Result: " + result + "</h3>\"");
	}).fail(function(error) {
		$("#results").html("<h3 class=\"text-warning\">Something Went Wrong...</h3>");
	});
};
