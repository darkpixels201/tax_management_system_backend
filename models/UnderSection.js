const mongoose = require('mongoose');

const underSectionSchema = new mongoose.Schema({
  underSection: { type: String, required: true },
  created_at: { type: Date, default: Date.now },

});

const UnderSection = mongoose.model('UnderSection', underSectionSchema);

module.exports = UnderSection;
