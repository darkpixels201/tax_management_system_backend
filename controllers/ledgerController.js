const Ledger = require('../models/Ledger');
const User = require('../models/User')
const Company = require('../models/Company')
// Create Ledger
exports.createLedger = async (req, res) => {
  const {
    companyName,
    bankName,
    chequeNo,
    chequeAmount,
    taxDeductionRate,
    underSection,
    taxAmount,
  } = req.body;

  try {
    const userId = req.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newLedger = new Ledger({
      date: new Date(), 
      createdBy:user.username,
      companyName,
      bankName,
      chequeNo,
      chequeAmount,
      taxDeductionRate,
      underSection,
      taxAmount,
    });
    await newLedger.save();

    res.status(201).json({ message: 'Ledger created successfully', ledger: newLedger });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get All Ledgers
exports.getAllLedgers = async (req, res) => {
  try {
    const ledgers = await Ledger.find();
    res.json(ledgers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Ledger by ID
exports.getLedgerById = async (req, res) => {
  const ledgerId = req.params.id;

  try {
    const ledger = await Ledger.findById(ledgerId);

    if (!ledger) {
      return res.status(404).json({ message: 'Ledger not found' });
    }

    res.json(ledger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Ledger
exports.updateLedger = async (req, res) => {
  const ledgerId = req.params.id;
  const {
    companyName,
    bankName,
    chequeNo,
    chequeAmount,
    taxDeductionRate,
    underSection,
    taxAmount,
    accessToDeleteLedger
  } = req.body;

  try {
    const updatedLedger = await Ledger.findByIdAndUpdate(
      ledgerId,
      {
        companyName,
        bankName,
        chequeNo,
        chequeAmount,
        taxDeductionRate,
        underSection,
        taxAmount,
        accessToDeleteLedger
      },
      { new: true }
    );

    if (!updatedLedger) {
      return res.status(404).json({ message: 'Ledger not found' });
    }

    res.json({ message: 'Ledger updated successfully', ledger: updatedLedger });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Ledger
exports.deleteLedger = async (req, res) => {
  const ledgerId = req.params.id;

  try {
    const deletedLedger = await Ledger.findByIdAndDelete(ledgerId);

    if (!deletedLedger) {
      return res.status(404).json({ message: 'Ledger not found' });
    }

    res.json({ id: ledgerId, message: 'Ledger deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Ledgers by Company Name
exports.getLedgersByCompanyName = async (req, res) => {
    const companyName = req.params.companyName;
  
    try {
      const ledgers = await Ledger.find({ companyName });
  
      if (!ledgers || ledgers.length === 0) {
        return res.status(404).json({ message: 'No ledgers found for the specified company name' });
      }
  
      res.json(ledgers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get Ledgers by Company ID
exports.getLedgersByCompanyId = async (req, res) => {
  const companyId = req.params.companyId;

  try {
    // Find the company by ID
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Get ledgers for the company name
    const ledgers = await Ledger.find({ companyName: company.companyName });

    if (!ledgers || ledgers.length === 0) {
      return res.status(404).json({ message: 'No ledgers found for the specified company' });
    }

    res.json(ledgers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};