// Create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4001;
const comments = require('./comments');
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
    res.send(comments.getComments());
});

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    res.send(comments.getComment(id));
});

// POST /comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    const newComment = comments.addComment(comment);
    res.send(newComment);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    const updatedComment = comments.updateComment(id, comment);
    res.send(updatedComment);
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    comments.deleteComment(id);
    res.send(id);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});