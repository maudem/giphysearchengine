$(document).ready(function (){
	//----initial TV show array
	var tv = ["New Girl", "Game of Thrones", "Sesame Street"];

	//----*FUNCTION* that displays gifs----
	function showGIF() {

		var show = $(this).attr("data-info");

		//url to search for the tv show that was clicked
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+show+"api_key=dc6zaTOxFJmzC&limit=10&callback=";

		//----ajax call for pressed button---
		$.ajax({
			url: queryURL,
			method: "GET"
		//waits for all the data to come back from giphy
		}).done(function(response) {

			var results = response.data;
			//looping through results item by item
			for (var i = 0; i< results.length; i++){
				// ---crerating gif div---
				var gifDiv = $("<div class='gifDiv'>");
				//store rating info
				var ratingDiv = results[i].rating;
				//a place to display rating
				var ratingHTML = $("<p>").text("Rating: " + ratingDiv);
				//image tag
				var showImg = $("<img>");
				showImg.attr("src", results[i].images.fixed_height.url);
				//---adding rating to the html----
				gifDiv.append(ratingHTML);
				gifDiv.append(showImg);
					//---adding the whole gif to the page, newst first---
				$("#results").prepend(gifDiv);
		}//end of forloop
	}); //end of .done function
 } // end of showGIF

//---*FUNCTION* getting buttons ----
function getButton() {
	//--- delete old info to avoid repeat.prepend	$("#tv-btns").empty(); 
	//--- loop for making the tv buttons---->
	for (var i =0; i <tv.length; i++) {
		var a = $("<button>");
		//adding a class to the button
		a.addClass("gif");
		// adding data attribute (idk y that's important)
		a.attr("data-info", tv[i]);
		//text inside button
		a.text(tv[i]);
		//put the button in its place on the page
		$("#tv-btns").append(a);
	}
}

//--- *FUNCTION* event that adds a new tv show when when newShow button is clicked---

$("#getShow").on("click", function(event) {
	event.preventDefault();   //keeps button from resetting
	//stores user input
	var show = $("#tv-input").val().trim();
	// adding new show to array
	tv.push(show);
	//calling function to display new button
	getButton();

});



$("#tv-btns").on("click", function(event) {
	event.preventDefault();

	showGIF();

});

getButton();
});
