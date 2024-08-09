const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
let state = false;


// Connect to the database
const db = new sqlite3.Database('./users.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

// Create a table
const createDB = `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, password TEXT)`;
db.run(createDB, (err) => {
    if (err) {
        console.log('Table already exists.');
    } else {
        console.log('Table created.');
    }
});

app.use(cors());
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON data

// GET endpoint to retrieve data from Angular app
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});


// POST endpoint to receive data from Angular app, LOGIN!!!
app.post('/api/data', (req, res) => {
    const receivedData = req.body.data; // Data from sendData() - login.component
    console.log('Data received from Angular app:', receivedData); // node console log
    
    let sqlpw = 'SELECT password FROM users WHERE name = ?';
    let uname = receivedData[0];
    let pw = receivedData[1];

    db.get(sqlpw, [uname], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (row) {
            console.log('Password from DB:', row.password);
            if (row.password === pw) {
                state = true;
                res.json(true);
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

