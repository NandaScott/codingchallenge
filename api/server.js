const express = require('express');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const https = require('https');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useNewUrlParser: true })
.then(() => {
    console.log("Successfully connected to the database.");
}).catch(err => {
    console.log(err);
    console.log("Couldn't connect to database. Exiting now...");
    process.exit();
})

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(helmet());

require('./app/routes/factory.routes.js')(app);

app.get('/', function (err, res) {
    res.end('<h1>Hello</h1>')
});

app.listen(8000, () => {
    console.log('Listening on locahost:8000');
});

// https.createServer(options, app).listen(8080);