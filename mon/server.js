const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname)); // To serve HTML and JS files

// MongoDB connection
mongoose.connect('mongodb+srv://jagathsri:hello0507@cluster0.hqi5x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Event Schema
const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    location: String,
    price: Number
});

// Event Model
const Event = mongoose.model('Event', eventSchema);

// Routes
// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form2.html'));
});

// GET all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST a new event
app.post('/events', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT (update) an event
app.put('/events/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).send(err);
    }
});

// DELETE an event
app.delete('/events/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).send('Event deleted');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
