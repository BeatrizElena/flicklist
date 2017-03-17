
var api = {
	root: "https://api.themoviedb.org/3",
	token: "614034599281c3d5060602eb29fb7e0b" // TODO put your api key here
};


function testTheAPI() {
	$.ajax({
		url: api.root + "/discover/movie",
// 		url: api.root + "/authentication/token/new?api_key=",
		data: {
			api_key: api.token,

		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
		}
	});
}


console.log("The script loaded!");
testTheAPI();
