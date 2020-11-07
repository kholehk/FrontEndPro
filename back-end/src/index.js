const cors = require('cors');
const express = require('express');
const { v4: uuid } = require('uuid');
const Joi = require('joi');
const { loadFile, saveFile } = require("./file-utils");

const filePath = "../movies.json";

const app = express();
app.use(express.json());

const port = 3000;

const movieSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
});

app.get('/movies', cors(), async (req, res) => {
    const movies = await loadFile(filePath);
    res.send(movies);
});

app.get("/movies/:id", cors(), async (req, res) => {
    const { id } = req.params;
    const movies = await loadFile(filePath);

    const movie = movies.find(m => m.id === id);
    if (movie) {
        res.send(movie);
        return;
    }

    res.sendStatus(404);
});

app.post("/movies", cors(), async (req, res) => {
    const { error } = movieSchema.validate(req.body);
    if (error) {
        res.sendStatus(403).send(error);
        return;
    }

    const movie = { ...req.body, id: uuid() };

    const movies = await loadFile(filePath);
    movies.push(movie);

    await saveFile(filePath, movies);
    res.send(201);
});

app.put("/movies/:id", cors(), async (req,  res) => {
    const { id } = req.params;

    const movies = await loadFile(filePath);
    const moviesUpdated = movies.map(movie => movie.id === id ? { ...req.body, id } : movie);

    await saveFile(filePath, moviesUpdated);
    res.send(202);
});

app.delete("/movies/:id", cors(), async (req, res) => {
    const { id } = req.params;

    const movies = await loadFile(filePath);
    const moviesUpdated = movies.filter(movie => movie.id !== id);

    await saveFile(filePath, moviesUpdated);
    res.send(202);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});