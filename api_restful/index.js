// Configuração inicial
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// Forma de ler JSON e middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas da API
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

// Rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Oi Express!'
    });
});

// Conectar ao banco de dados MongoDB
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}`)
    .then(() => {
        console.log('Conectou ao MongoDB!');
        app.listen(PORT, () => {
            console.log(`Servidor Express rodando na porta ${PORT}`);
        });
    })
    .catch((err) => console.error(err));
