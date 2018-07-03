const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const sqliteJson = require('sqlite-json');

app.get('/', function (err, res) {
    res.end('<h1>Hello</h1>')
});

app.get('/readValues', function (req, res) {
    var db = new sqlite3.Database(__dirname + '/main.db');
    var exporter = sqliteJson(db);

    exporter.json(`SELECT factory_child.number_value
    FROM factory_child, root_table
    WHERE factory_child.parent_factory == root_table.id;`, function (err, json) {
        res.end(json)
    });
});

var server = app.listen(8000, function () {
    console.log('Listening on locahost:8000');
});