const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const sqliteJson = require('sqlite-json');
const _ = require('lodash');

app.get('/', function (err, res) {
    res.end('<h1>Hello</h1>')
});

app.get('/allValues', function (req, res) {
    let exporter = sqliteJson(new sqlite3.Database(__dirname + '/main.db'));

    const query = `SELECT factory_child.number_value AS "value", root_table.id AS "root_id"
                    FROM factory_child LEFT JOIN root_table
                    WHERE factory_child.parent_factory = root_table.id;`;

    exporter.json(query, function (err, json) {

        let sqliteData = JSON.parse(json)
        let payload = sqliteData.map((a) => 
            a.value
        );

        // var payload1 = sqliteData.map(a => a.value);

        res.end(JSON.stringify(payload))
    });
});

var server = app.listen(8000, function () {
    console.log('Listening on locahost:8000');
});