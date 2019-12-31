const express = require('express');
var app = express();
var config = require('./config/config');
var routers = require('./config/routers');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.json());

app.all('*', (req, res) => routers.searchRouter(req, res, config));

app.listen(config.port, () => {
    console.log(require('./banner').banner + '\n\n\n\Server Online | Port: ' + config.port);
});

module.exports.app = app;