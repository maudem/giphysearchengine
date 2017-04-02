$(document).ready(function (){
	//----initial TV show array
	var topics =["New Girl", "Game of Thrones", "Sesame Street"];

	//----*FUNCTION* that displays gifs----
	function showGIF(show) {

		// var show = $(this).data("info");

		//url to search for the tv show that was clicked
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+show+"&limit=12&api_key=dc6zaTOxFJmzC";
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
				// //returns stills
				// showImg.attr("src", results[i].images.fixed_height_still.url);
				showImg.attr("src", results[i].images.fixed_height.url);
			

				// $(<"img">).on("click", function() {
				// 	return showImg.attr("src", results[i].images.fixed_height.url);
    //     			}
    
    // 			var animate = showImg.attr("src", results[i].images.fixed_height.url);
				// var still = showImg.attr("src", results[i].images.fixed_height_still.url);
				
    // 			 $("<img>").hover(
    //    				 function()
    //    					 {
    
    //      					 $(this).attr("src", src.replace(still, animate));
    //    						 },
    //     			function()
    //     				{
      
    //       			$(this).attr("src", src.replace(animate, still));
    //     			});

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
	//--- delete old info to avoid repeat.prepend
	$("#tv-btns").empty(); 
	//--- loop for making the tv buttons---->
	for (var i =0; i <topics.length; i++) {
		var a = $("<button>");
		//adding a class to the button
		a.addClass("gif");
		// adding data attribute (idk y that's important)
		a.attr("data-info", topics[i]);
		//text inside button
		a.text(topics[i]);
		//put the button in its place on the page
		$("#tv-btns").append(a);
	}
}

//--- *FUNCTION* event that adds a new tv show when when newShow button is clicked---

$("#getShow").on("click", function(event) {
	event.preventDefault();   //keeps button from resetting
	//stores user input
	var show = $("#tv-input").val().trim();

	// gives an alert if tv-input is blank when pressed
	if (show == "") {
		alert("If you want to add a show, don't leave this blank");
		return false;
	} else{
	// adding new show to array
	topics.push(show);
	}
	//calling function to display new button

	getButton();

}); //getShow onclick end



$("#tv-btns").on("click", ".gif" ,function() {
	event.preventDefault();
	$("#results").empty();
		// i'm trying to attach the dynamic child, .gif to static parent tv-btns
	var show= $(this).data("info");
	showGIF(show);

});

getButton();
});
