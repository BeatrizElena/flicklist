// Flicklist 1 Requirements:
// TODO 1 (in HTML file)
//   Add another section, with an an id of "section-browse", for the user to browse movies
//   It should display "Browse Movies" in large text
//   It should contain an empty unordered list

// TODO 2: update the model, setting its .browseItems property equal to the movies we received in the response
		// model.browseItems = movies.results;
		
// TODO 3: insert a list item into the <ul> in the browse section
		// var li = $('<li>');
		// 		li.text(movie.title);
		// 		$("#section-browse ul").append(li);

// TODO 4: the list item should include a button that says "Add to Watchlist"
		// var button = $('<button>');
		// 		button.text("Add to Watchlist");
		// 		li.append(button);

// TODO 5: when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
		// $("selector").click()
		// or
		// $("selector").click(function(){
		// }
		
		// $(button).click(function(){
			// model.watchlistItems.push(movie) 
			// render();
		// });
		
// TODO 6: for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
		// model.watchlistItems.forEach(function(movie) {
		//   		var li = $('<li>');
		// 		li.text(movie.title);
		// 		$("#section-watchlist ul").append(li);
		// });

// TODO 7: clear everything from both lists 
		// use empty() method: $(selector).empty()
		// 	$("#section-watchlist ul").empty();
		// 	$("#section-browse ul").empty();

var model = {
  watchlistItems: [],
  browseItems: []
};

var api = {
  root: "https://api.themoviedb.org/3",
  token: "614034599281c3d5060602eb29fb7e0b" // TODO 0 put your api key here
};

/**
 * Makes an AJAX request to themoviedb.org, asking for some movies. If successful:
 * updates the model.browseItems appropriately, 
 * and then invokes the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(movies) {
			console.log("We got a response from The Movie DB!");
			console.log(movies);
			
			// TODO 2
			model.browseItems = movies.results;
 			
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}

/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
	$("#section-watchlist ul").empty();
	$("#section-browse ul").empty(); 

  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
		var li = $('<li>');
		li.text(movie.title);
		$("#section-browse ul").append(li);
				
		// TODO 4
		var button = $('<button>');
		button.text("Add to Watchlist");
		li.append(button);
		
		// TODO 5
		$(button).click(function(){
		model.watchlistItems.push(movie);
		render();
		});
	});

  // TODO 6
	model.watchlistItems.forEach(function(movie) {
			var li = $('<li>');
			li.text(movie.title);
			$("#section-watchlist ul").append(li);
	});
}

// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

