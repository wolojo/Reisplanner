const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');

const weather = require('./api/weather.cjs')
const favorites = require('./api/favorites.cjs')
const routes = require('./api/route.cjs')

const {port} = require('./config.cjs');

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/weather', weather.get)

app.get('/api/favorites', favorites.getAll)
app.get('/api/favorites/:id', favorites.get)
app.delete('/api/favorites/:id', favorites.delete)
app.post('/api/favorites', favorites.post)

app.get('/api/routes', routes.get);

app.listen(port, () => console.log(`Server listening on port: ${port}`));