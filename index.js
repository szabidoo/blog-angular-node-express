const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
let state = false;
let activeUser = '';

app.use(cors());
app.use(express.json()); // Use express.json() middleware to parse JSON data

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
const createPostDB = `CREATE TABLE IF NOT EXISTS posts(id INTEGER PRIMARY KEY, content TEXT, user TEXT)`;
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

// GET endpoint to retrieve data from Angular app
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Express!', data: state });
});

app.get('/api/logout', (req, res) => {
    console.log('Received request to /api/logout');
    state = false;
    activeUser = ''
    res.json({ message: "Logged out!", data: state });
    console.log('State after logout:', state);
});

app.get('/api/loginstate', (req, res) => {
    res.json({ data: state });
});

app.post('/api/register', (req, res) => {
    const registerData = req.body.data;
    let username = registerData[0]

    db.get('SELECT name FROM users WHERE name = ?', username, (err, row) => {
        if (!row){
            db.run('INSERT INTO users(name, password) VALUES (?, ?)', [registerData[0], registerData[1]], (err) => {
                if (err){
                    console.log(err)
                }
                res.json({message: `Success registering ${username}`})
            })
        }
        if(row){
            console.log("Already registered!")
        }
    })
});

// POST endpoint to receive data from Angular app, LOGIN!!!
app.post('/api/data', (req, res) => {
    const receivedData = req.body.data; // Data from sendData() - login.component
    console.log('Data received from Angular app:', receivedData); // node console log
    
    let sqlpw = 'SELECT password FROM users WHERE name = ?';
    let uname = receivedData[0];
    activeUser = uname;
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
    const q = 'INSERT INTO posts(content, user) VALUES (?, ?)';

    if (postdata === '' || postdata === null || postdata === undefined) {
        res.json({ message: `Wrong ${postdata}`, data: postdata });
        return;
    } else {
        postDB.run(q, [postdata, activeUser], function(err) { // Pass postdata as an array
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ message: `Success ${postdata}` });
        });
    }

    console.log('Post Data:', postdata); // Log the post data
});

//getPosts()
app.get('/api/getposts', (req, res) => {
    const query = 'SELECT content, user FROM posts';

    postDB.all(query, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        // Extract the content values from the rows
        
        res.json({ message: 'Success', data: rows});
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});