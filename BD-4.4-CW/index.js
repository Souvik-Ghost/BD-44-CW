let express = require("express");
let app = express();
let port = process.env.port || 3000;
let db;
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Connect to SQLite database
(async () => {
  db = await open({
    filename: "./BD-4.4-CW/database.sqlite",
    driver: sqlite3.Database,
  });
  if (db) console.log("Connected to the SQLite database.");
})();
//Message
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 CW Select specific columns" });
});
//node BD-4.4-CW/initDB.js
// THE ENPOINTS
//node BD-4.4-CW
//1 /movies
async function fetchMovies() {
  let query = "SELECT id, title, release_year FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
}
app.get("/movies", async (req, res) => {
  try {
    const result = await fetchMovies();
    if (result.movies.length === 0)
      return res.status(404).json({ message: "No movies found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//2 /movies/actor/Salman%20Khan
async function fetchMovieByActor(actor) {
  let response =
    "SELECT id, title, actor release_year FROM movies WHERE actor = ?";
  let  = await db.all(query, [actor]);
  return { movies: response };
}
app.get("/movies/actor/:actor", async (req, res) => {
  try {
    const actor = req.params.actor;
    const result = await fetchMovieByActor(actor);
    if (result.movies.length === 0)
      return res
        .status(404)
        .json({ message: `No movies found for actor ${actor}` });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//3 /movies/director/Kabir%20Khan
async function fetchMovieByDirector(director) {
  let query =
    "SELECT id, director, title, release_year FROM movies WHERE director = ?";
  let response = await db.all(query, [director]);
  return { movies: response };
}
app.get("/movies/director/:director", async (req, res) => {
  const director = req.params.director;
  try {
    const result = await fetchMovieByDirector(director);
    if (result.movies.length === 0)
      return res
        .status(404)
        .json({ message: `No movies found for director ${director}` });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
