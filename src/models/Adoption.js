const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  pet: { type: mongoose.SchemaTypes.ObjectId, ref: 'Pet', required: true }
}, { timestamps: true });

const Adoption = mongoose.model('Adoption', adoptionSchema);
module.exports = Adoption;
