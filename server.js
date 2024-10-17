const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Data = require('./models/Data');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost/mydatabase');

// API untuk menambahkan data
app.post('/add', async (req, res) => {
    try {
        const data = new Data(req.body);
        const savedData = await data.save();
        res.status(201).json(savedData);
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ message: 'Error saving data', error: err.message });
    }
});

// API untuk mengambil data
app.get('/get', async (req, res) => {
    try {
        const data = await Data.find();
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Jalankan aplikasi
app.listen(PORT, () => {
    console.log(`Aplikasi berjalan di http://localhost:${PORT}`);
});