const mongoose = require('mongoose');

const rateOfTaxSchema = new mongoose.Schema({
  taxDeductionRate: { type: String, required: true },
});

const RateOfTax = mongoose.model('RateOfTax', rateOfTaxSchema);

module.exports = RateOfTax;
