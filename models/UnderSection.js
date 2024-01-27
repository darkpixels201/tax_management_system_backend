const mongoose = require('mongoose');

const underSectionSchema = new mongoose.Schema({
  underSection: { type: String, required: true },
});

const UnderSection = mongoose.model('UnderSection', underSectionSchema);

module.exports = UnderSection;
