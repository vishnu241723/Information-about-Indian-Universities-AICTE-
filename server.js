const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'university_management'
});

app.get('/universities', (req, res) => {
    db.query('SELECT * FROM universities', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
