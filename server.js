const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

const db = new sqlite3.Database('./cinegram.db', (err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                email TEXT UNIQUE,
                password TEXT
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT
            )
        `);
    }
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], function(err) {
        if (err) {
            console.error("Error during user registration:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Account created successfully!' });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    db.get('SELECT id, username, password FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        if (password === row.password) {
            res.json({ message: 'Login successful!', userId: row.id, username: row.username });
        } else {
            res.status(401).json({ error: 'Invalid email or password.' });
        }
    });
});

app.get('/movies', (req, res) => {
    db.all('SELECT id, title FROM movies', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.delete('/api/users/me', (req, res) => {
    // **IMPORTANT:  SECURE THIS ROUTE!**
    //  You MUST add authentication middleware here to verify the user.
    //  For example, you might have something like:
    //  authenticate(req, res, () => {  // Your authentication middleware
    //  ... the rest of the delete logic ...
    //  });
    //
    //  For this example, I'm ASSUMING you can get the userId like this:
    const userId = req.body.userId; // Or however you get it (e.g., req.user.id)

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
    }

    db.run('DELETE FROM users WHERE id = ?', [userId], function(err) {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            // No rows were deleted, meaning the user probably didn't exist
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ message: 'Account deleted successfully.' });
    });
});