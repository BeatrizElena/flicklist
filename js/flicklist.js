// Flicklist 2 Requirements:
// TODO 1: create a paragraph containing the movie object's .overview value
    // then, in the code block below, append the paragraph in between the title and the button
		//  var itemView = $("<li></li>")
	//       .append($("<hr/>"))
	//       .append(title)
	//       .append(button);


// TODO 2: the button in the code below should be disabled if this movie is already in
      // the user's watchlist (see jQuery .prop() and Array.indexOf())
	//       var button = $("<button></button>")
	//       .text("Add to Watchlist")
	//       .click(function() {
	//         model.watchlistItems.push(movie);
	//         render();
	//       });
		
		
// TODO 3: give itemView a class attribute of "item-watchlist"

// TODO 4: style the Watchlist Items as Orange Bricks

// TODO 5: Change the Text Color to Gray

// TODO 6: (in HTML file)
// 		add a <form> in the Browse Movies section for users to search for movies by title.

// TODO 7: Style the Buttons 
		
// TODO 8: in HTML file, Add a Submit Handler to the Form (fill in the missing pieces of the code below)
		// <script>
		//     $("TODO 8a").submit(function(evt) {
		// 
		//       // first, we cancel the default action (which would leave the page)
		//       evt.preventDefault();
		// 
		//       // figure out what the user typed
		//       var searchTerm = $("TODO 8b").val();
		// 
		//       // TODO 8c invoke the searchMovies function,
		//       // passing in the search term, and render as the callback
		// 
		//     });
		//   </script>

// TODO 9: implement this searchMovies(searchTerm, callback) function as described in the comment above 
// 		   (use the body of discoverMovies as a jumping off point)

$(document).ready(function() {
  discoverMovies(render);
});



var model = {
  watchlistItems: [],
  browseItems: []
};


var api = {
  root: "https://api.themoviedb.org/3",
  token: "8e888fa39ec243e662e1fb738c42ae99" // TODO 0 add your api key
};


/**
 * Makes an AJAX request to /discover/movie endpoint of the API
 *
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback();
    }
  });
}


/**
 * Makes an AJAX request to the /search/movie endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(searchTerm, callback) {
// 	console.log("searching for movies with '" + searchTerm + "' in their title...");

  // TODO 9: implement this function as described in the comment above
  // (use the body of discoverMovies as a jumping off point)
	$.ajax({
		url: api.root + "/search/movie",
		data: {
			api_key: api.token,
			query: searchTerm
		},
		success: function(render) {
			model.browseItems = render.results;
			callback(render);
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var itemView = $("<li></li>")
      .append(title);
      // TODO 3: give itemView a class attribute of "item-watchlist"
      itemView.attr("class", "item-watchlist");

    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<h4></h4>").text(movie.original_title);
    var button = $("<button></button>")
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      });
      // TODO 2
      // the button should be disabled if this movie is already in
      // the user's watchlist
      // see jQuery .prop() and Array.indexOf() .prop(propertyName, value) propertyName is a string and value is any value to set for the property.
   button.prop("disabled", model.watchlistItems.indexOf(movie) !== -1);
		

    // TODO 1
    // create a paragraph containing the movie object's .overview value
    // then, in the code block below,
    // append the paragraph in between the title and the button
	var overview = $("<p></p>").text(movie.overview);

    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .append($("<hr/>"))
      .append(title)
      .append(overview)
      .append(button);

    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });
  
}




