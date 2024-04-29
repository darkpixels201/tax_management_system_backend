const RateOfTax = require('../models/RateOfTax');

// Create RateOfTax
exports.createRateOfTax = async (req, res) => {
  const { taxDeductionRate } = req.body;

  try {
    // Check if taxDeductionRate already exists
    const existingRate = await RateOfTax.findOne({ taxDeductionRate });

    if (existingRate) {
      return res.status(400).json({ message: 'Rate of Tax with the given rate already exists' });
    }

    const rateOfTax = new RateOfTax({ taxDeductionRate });
    await rateOfTax.save();

    res.status(201).json({ message: 'Rate of Tax created successfully', rateOfTax });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Rates of Tax
exports.getAllRatesOfTax = async (req, res) => {
  try {
    const ratesOfTax = await RateOfTax.find();
    res.json(ratesOfTax);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Rate of Tax by ID
exports.getRateOfTaxById = async (req, res) => {
  const rateOfTaxId = req.params.id;

  try {
    const rateOfTax = await RateOfTax.findById(rateOfTaxId);

    if (!rateOfTax) {
      return res.status(404).json({ message: 'Rate of Tax not found' });
    }

    res.json(rateOfTax);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Rate of Tax
exports.updateRateOfTax = async (req, res) => {
  const rateOfTaxId = req.params.id;
  const { taxDeductionRate } = req.body;

  try {
    const existingRate = await RateOfTax.findOne({ taxDeductionRate });

    if (existingRate) {
      return res.status(400).json({ message: 'Rate of Tax with the given rate already exists' });
    }
    const rateOfTax = await RateOfTax.findByIdAndUpdate(rateOfTaxId, { taxDeductionRate }, { new: true });

    if (!rateOfTax) {
      return res.status(404).json({ message: 'Rate of Tax not found' });
    }

    res.json({ message: 'Rate of Tax updated successfully', rateOfTax });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Rate of Tax
exports.deleteRateOfTax = async (req, res) => {
  const rateOfTaxId = req.params.id;

  try {
    const rateOfTax = await RateOfTax.findByIdAndDelete(rateOfTaxId);

    if (!rateOfTax) {
      return res.status(404).json({ message: 'Rate of Tax not found' });
    }

    res.json({ id: rateOfTaxId, message: 'Rate of Tax deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
