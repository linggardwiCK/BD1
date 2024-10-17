const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    tanggal: { type: Date, required: true }
});

module.exports = mongoose.model('Data', dataSchema);