const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specie: { type: String, required: true },
  birthDate: { type: String },
  adopted: { type: Boolean, default: false },
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  image: { type: String }
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
