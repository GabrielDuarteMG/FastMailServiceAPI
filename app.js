const express = require("express");
var app = express();
var config = require("./config/config");
var routers = require("./config/routers");
const bodyParser = require("body-parser");
var cors = require('cors');


app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.text());

app.use(cors({ origin: true, credentials: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://?"); // Cors
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.all("*", (req, res) => {
    routers.searchRouter(req, res, config);
});

app.listen(config.port, () => {
    console.log(
        require("./banner").banner + "\n\n\nServer Online | Port: " + config.port
    );
});

module.exports.app = app;