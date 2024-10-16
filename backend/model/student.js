const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  roll_number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  math: { type: Number, required: true },
  science: { type: Number, required: true },
  english: { type: Number, required: true },
  total: { type: Number, required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
