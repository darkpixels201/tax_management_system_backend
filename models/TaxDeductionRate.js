const mongoose = require('mongoose');

const taxDeductionRateSchema = new mongoose.Schema({
  taxDeductionRate: { type: String, required: true },
});

const TaxDeductionRate = mongoose.model('TaxDeductionRate', taxDeductionRateSchema);

module.exports = TaxDeductionRate;
