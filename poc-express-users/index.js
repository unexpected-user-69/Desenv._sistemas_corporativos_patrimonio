const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];
let nextId = 1;

<<<<<<< HEAD
=======
// GET /users - List all users
>>>>>>> c5f548e5865c620e3aeebcaf689d326aa38f85a5
app.get('/users', (req, res) => {
    res.json(users);
});

<<<<<<< HEAD
=======
// GET /users/:id - Get user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// POST /users - Create a new user
>>>>>>> c5f548e5865c620e3aeebcaf689d326aa38f85a5
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send('Name and email are required');
    }
    const newUser = { id: nextId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

<<<<<<< HEAD
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('User not found');
=======
// PUT /users/:id - Update a user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
});

// DELETE /users/:id - Delete a user
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('User not found');

>>>>>>> c5f548e5865c620e3aeebcaf689d326aa38f85a5
    users.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
<<<<<<< HEAD
    console.log('Users Service PoC listening at http://localhost:' + port);
=======
    console.log(`Users Service PoC listening at http://localhost:${port}`);
>>>>>>> c5f548e5865c620e3aeebcaf689d326aa38f85a5
});
