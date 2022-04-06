const express = require('express');
const path = require('path');

// Import and require mysql2
const mysql = require('mysql2');
const api = require("./routes/index")


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", api);

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));
app.get("/index", (req, res) => {
	// responds by sending a specified html file to the request
	res.sendFile(path.join(__dirname, "public/index.html"));
});



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Password123!',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

// Query database
db.query('SELECT * FROM movie', function (err, results) {
  console.log(results);
  console.log(err)
});

/* USING APIs WITH ROUTE LISTENERS */
app.get('/api', (req, res) => {
    res.json(movie_db);
})


// // GET route that returns any specific term
// app.get("/api/movies/:term", (req, res) => {
// 	console.log(req.params); 
// 	const requestedTerm = req.params.term.toLowerCase();

// 	// Iterate through the terms name to check if it matches `req.params.term`
// 	for (let i = 0; i < termData.length; i++) {
// 		// example
// 		const foundTerm = termData.filter(
// 			(termObj) => termObj.term.toLowerCase() === requestedTerm
// 		)[0];

// 		console.log(foundTerm);

// 		if (requestedTerm === termData[i].term.toLowerCase()) {
// 			return res.json(termData[i]);
// 		}
// 	}
// })

app.get("/", (req, res) => {
    db.query ('movies_db', (err, results) => {
      res.status(200).json(results)
    });
  })

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.get("*", (req, res) => res.send("File Not Found"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
