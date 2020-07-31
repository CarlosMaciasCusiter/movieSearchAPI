let express = require("express");
let app = express();
const port = 3000;
let request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("search");
})

app.get("/results", function(req, res){
	let movieName = req.query.search;
	let url = "http://www.omdbapi.com/?s=" + movieName + "&apikey=thewdb";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			let data = JSON.parse(body)
			res.render("results", {data:data});
		}
	});
});

app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`));