const { readFromFile, writeToFile } = require("../helpers/fsUtils");

const movie = require("express").Router();

// POST request method to add movie;
movie.post("/api/movie", (req, res) => {
	let response;
	const { id, name, year } = req.body;
	if (id && name && year) {
		const newMovie = { id, name, year };
		response = {
			status: "Success",
			body: newMovie,
		};
		readAndAppend(newMovie, "./db/seeds.sql");
		console.log(response);
		res.status(201).json(response);
	} else {
		res.status(500).json("Error in posting movie");
	}
});

// Post request to page 
movie.post("/movie", (req, res) => {
	let response;
	const { id, name, year } = req.body;
	if (id && name && year) {
		const newMovie = { id, name, year };
		response = {
			status: "Success",
			body: newMovie,
		};
		readAndAppend(newMovie, "./db/seeds.sql");
		console.log(response);
		res.status(201).json(response);
	} else {
		res.status(500).json("Error in posting movie");
	}
});

//DELETE route for specific movie
// movie.delete('/:note_id', (req, res) => {
// 	const noteId = req.params.note_id;
// 	readFromFile('./db/movie.json')
// 		.then((data) => JSON.parse(data))
// 		.then(json) => {
// 			const result = json.filter((movie) => movie.note_id !== noteId);

// 			writeToFile('./db/movie.json', result);

// 			res.json(`Item ${noteId} has been deleted 🗑`);
// 		};
// })



module.exports = movie;
