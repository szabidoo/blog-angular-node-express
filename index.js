const express = require('express');
const cors = require('cors');
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

// Connect to the POSTS DB
const postDB = new sqlite3.Database('./posts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the posts DB');
});

// Create a posts table
const createPostDB = `CREATE TABLE IF NOT EXISTS posts(id INTEGER PRIMARY KEY, content TEXT)`;
postDB.run(createPostDB, (err) => {
    if (err) {
        console.log("PostsDB table already exists.");
    } else {
        console.log("PostsDB table created.");
    }
});

// Create a users table
const createDB = `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, password TEXT)`;
db.run(createDB, (err) => {
    if (err) {
        console.log('Table already exists.');
    } else {
        console.log('Table created.');
    }
});

app.use(cors());
app.use(express.json()); // Use express.json() middleware to parse JSON data

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


//delete all empty posts
postDB.run('DELETE FROM posts WHERE content IS NULL OR content = ""', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Deleted empty posts.');
});

app.post('/api/postdata', (req, res) => {
    const postdata = req.body.data;
    console.log(postdata);
    const q = 'INSERT INTO posts(content) VALUES (?)';

    if (postdata === '' || postdata === null || postdata === undefined) {
        res.json({ message: `Success ${postdata}`, data: postdata });
        return;
    } else {
        postDB.run(q, [postdata], function(err) { // Pass postdata as an array
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ message: `Success ${postdata}` });
        });
    }

    console.log('Post Data:', postdata); // Log the post data
});

app.get('/api/getposts', (req, res) => {
    const query = 'SELECT content FROM posts';

    postDB.all(query, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        // Extract the content values from the rows
        const contentList = rows.map(row => row.content);
        res.json({ message: 'Success', data: contentList });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});