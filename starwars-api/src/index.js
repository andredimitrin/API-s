require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3131;

app.use(cors());
app.use(express.json());

const Film = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
});

app.get('/', async (req, res) => {
    try {
        const films = await Film.find();
        res.send(films);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const film = await Film.findByIdAndDelete(req.params.id);
        if (!film) {
            return res.status(404).send({ error: 'Film not found' });
        }
        res.send(film);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.put('/:id', async (req, res) => {
    try {
        const film = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!film) {
            return res.status(404).send({ error: 'Film not found' });
        }
        res.send(film);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

app.post('/', async (req, res) => {
    try {
        const film = new Film({
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            trailer_url: req.body.trailer_url
        });

        await film.save();
        res.status(201).send(film);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
