const express = require('express');
const app = express();
const mongoose = require('mongoose');
const toDoModel = require('./models/model.js');
require('dotenv').config();

// to send data b/w frontend and backend
// https://www.youtube.com/watch?v=Vzn79HN8fgQ
// when you are working on port 3000 and want to share data on some another port (eg: 5000), then CORS (Cross Origin Resource Sharing) error occurs. 
// It tells us that if you are working on port 3000 you can't share data on port 5000
const cors = require('cors');

// middleware to send json
app.use(express.json());

// middleware to send forms
// https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
app.use(express.urlencoded({ extended: false }));

// middleware to use CORS
app.use(cors());

// get all todo
app.get('/', async (req, res) => {
    try {
        const lists = await toDoModel.find({});
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// push a new todo
app.post('/', async (req, res) => {
    try {
        toDoModel.create(req.body);
        res.status(200).send("added successfully");
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message })
    }
});

// update a todo
app.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const lists = await toDoModel.findByIdAndUpdate(id, req.body);
        // if (!id) {
        //     return res.status(404).json({ message: `cannot find product with ID ${id}` });
        // }
        res.status(200).send("updated successfully");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// delete a product
app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const lists = await toDoModel.findByIdAndDelete(id);
        // if (!lists) {
        //     return res.status(404).json({ message: `cannot find product with ID ${id}` });
        // }
        res.status(200).send("deleted successfully");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// connecting mongodb with nodejs
mongoose.connect(`${process.env.MDB_URL}`).then(() => {
    try {
        console.log("ConnecteD to MDB");
        app.listen(process.env.PORT, () => {
            console.log(`nodepr listening on port ${process.env.PORT}`)
        })
    } catch (err) {
        console.log(err);
    }
})