const TaxDeductionRate = require('../models/TaxDeductionRate');

// Create TaxDeductionRate
exports.createTaxDeductionRate = async (req, res) => {
  const { taxDeductionRate } = req.body;

  try {
    const newTaxDeductionRate = new TaxDeductionRate({ taxDeductionRate });
    await newTaxDeductionRate.save();

    res.status(201).json({ message: 'Tax Deduction Rate created successfully', taxDeductionRate: newTaxDeductionRate });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Tax Deduction Rates
exports.getAllTaxDeductionRates = async (req, res) => {
  try {
    const taxDeductionRates = await TaxDeductionRate.find();
    res.json(taxDeductionRates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tax Deduction Rate by ID
exports.getTaxDeductionRateById = async (req, res) => {
  const taxDeductionRateId = req.params.id;

  try {
    const taxDeductionRate = await TaxDeductionRate.findById(taxDeductionRateId);

    if (!taxDeductionRate) {
      return res.status(404).json({ message: 'Tax Deduction Rate not found' });
    }

    res.json(taxDeductionRate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Tax Deduction Rate
exports.updateTaxDeductionRate = async (req, res) => {
  const taxDeductionRateId = req.params.id;
  const { taxDeductionRate } = req.body;

  try {
    const updatedTaxDeductionRate = await TaxDeductionRate.findByIdAndUpdate(
      taxDeductionRateId,
      { taxDeductionRate },
      { new: true }
    );

    if (!updatedTaxDeductionRate) {
      return res.status(404).json({ message: 'Tax Deduction Rate not found' });
    }

    res.json({ message: 'Tax Deduction Rate updated successfully', taxDeductionRate: updatedTaxDeductionRate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Tax Deduction Rate
exports.deleteTaxDeductionRate = async (req, res) => {
  const taxDeductionRateId = req.params.id;

  try {
    const deletedTaxDeductionRate = await TaxDeductionRate.findByIdAndDelete(taxDeductionRateId);

    if (!deletedTaxDeductionRate) {
      return res.status(404).json({ message: 'Tax Deduction Rate not found' });
    }

    res.json({ id: taxDeductionRateId, message: 'Tax Deduction Rate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
