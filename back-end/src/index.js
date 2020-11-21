const cors = require('cors');
const express = require('express');
const { v4: uuid } = require('uuid');
const Joi = require('joi');
const { loadFile, saveFile } = require("./file-utils");

const filePath = "../movies.json";
const corsOption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

const app = express();
app.use(express.json());

const port = 3000;

const movieSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
});

app.options('/movies/:id', cors(corsOption));

async function getMovies(req, res) { 

    const { id } = req.params;
    let movies = await loadFile(filePath);

    movies = id ? movies.filter(m => m.id === id) : movies;

    if (Array.isArray(movies) && movies.length) {
        res.send(movies);
        return;
    }

    res.sendStatus(404);
};

app.get('/movies', cors(corsOption), async(req, res) => await getMovies(req, res));

app.get("/movies/:id", cors(corsOption), async(req, res) => await getMovies(req, res));

app.post("/movies", cors(corsOption), async (req, res) => {
    const { error } = movieSchema.validate(req.body);
    if (error) {
        res.sendStatus(403).send(error);
        return;
    }

    const movie = { ...req.body, id: uuid() };

    const movies = await loadFile(filePath);
    movies.push(movie);

    await saveFile(filePath, movies);
    res.sendStatus(201);
});

app.put("/movies/:id", cors(corsOption), async (req,  res) => {
    const { id } = req.params;

    const movies = await loadFile(filePath);
    const moviesUpdated = movies.map(movie => movie.id === id ? { ...req.body, id } : movie);

    await saveFile(filePath, moviesUpdated);
    res.sendStatus(202);
});

app.delete("/movies/:id", cors(corsOption), async (req, res) => {
    const { id } = req.params;

    const movies = await loadFile(filePath);
    const moviesUpdated = movies.filter(movie => movie.id !== id);

    await saveFile(filePath, moviesUpdated);
    res.sendStatus(202);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});