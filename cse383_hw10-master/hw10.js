var searchURL="http://openlibrary.org/search.json?title=";
var coverURL="http://covers.openlibrary.org/b/isbn/";
var urlEnd="-M.jpg";

function createList() {
	var title = document.getElementById("title").value.replaceAll(" ","+");
	a=$.ajax({
		url: searchURL+title,
		method: "GET"
	}).done(function(data) {
		$("#book-list").html("");
		var len = data.docs.length;
		var isbn = "";

		for(let i=0; i<len; i++) {

			try {
				isbn = data.docs[i].isbn[0];
			} catch {
				isbn = "";
			}

			$("#book-list").append("<button type=\"button\" class=\"getCover list-group-item list-group-item-action\" isbn=\"" + isbn + "\">" + data.docs[i].title_suggest+"</button>");
		}
	}).fail(function(error) {
		$("#results").html("<h2 class=\"text-warning\">Something Went Wrong...</h2>");
	});
};

$(document).ready(function() {
$(document).on('click', 'button.getCover', function(){
	console.log("Getting Cover");
	$("#coverImage").css("visibility","visible");
	$("h2").html($(this).text());
	if($(this).attr("isbn") != ""){
		$("img").attr("src", coverURL+$(this).attr("isbn")+urlEnd);
		$("#noImage").css("visibility","hidden");
	}else{
		$("img").attr("src","");
		$("#noImage").css("visibility","visible");
	}
});

$("#form").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search-button").click();
    }
});
});
