const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the /public directory
app.use(express.static(path.join(__dirname, 'public')));

// Store submitted messages
let messages = [];

// Endpoint to display the form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact_form.html'));
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    messages.push({ name, email, message });
    res.redirect('/');
});

// Endpoint to get all messages
app.get('/messages', (req, res) => {
    res.json(messages);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
