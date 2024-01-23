const User = require('../models/User');
const Cheque = require('../models/Cheque');

// Create Cheque
exports.createCheque = async (req, res) => {
  const { bankName, checkNo, checkAmount } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cheque = new Cheque({
      bankName,
      checkNo,
      checkAmount,
      user: req.userId,
    });

    await cheque.save();

    res.status(201).json({ message: 'Cheque created successfully', cheque });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Cheques of User
exports.getAllCheques = async (req, res) => {
  try {
    const cheques = await Cheque.find({ user: req.userId });
    res.json(cheques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Cheque by ID
exports.getChequeById = async (req, res) => {
  const chequeId = req.params.id;

  try {
    const cheque = await Cheque.findOne({ _id: chequeId, user: req.userId });

    if (!cheque) {
      return res.status(404).json({ message: 'Cheque not found' });
    }

    res.json(cheque);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Cheque
exports.updateCheque = async (req, res) => {
  const chequeId = req.params.id;
  const { bankName, checkNo, checkAmount } = req.body;

  try {
    const cheque = await Cheque.findOne({ _id: chequeId, user: req.userId });

    if (!cheque) {
      return res.status(404).json({ message: 'Cheque not found' });
    }

    cheque.bankName = bankName;
    cheque.checkNo = checkNo;
    cheque.checkAmount = checkAmount;

    const updatedCheque = await cheque.save();

    res.json({ message: 'Cheque updated successfully', cheque: updatedCheque });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Cheque
exports.deleteCheque = async (req, res) => {
  const chequeId = req.params.id;

  try {
    const cheque = await Cheque.findOne({ _id: chequeId, user: req.userId });

    if (!cheque) {
      return res.status(404).json({ message: 'Cheque not found' });
    }

    await cheque.remove();

    res.json({ id: chequeId, message: 'Cheque deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Cheques by Bank Name
exports.getChequesByBank = async (req, res) => {
    const bankName = req.params.bankName;
  
    try {
      const cheques = await Cheque.find({ bankName });
  
      if (cheques.length === 0) {
        return res.status(404).json({ message: 'No cheques found for the specified bank' });
      }
  
      res.json(cheques);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get Cheques of All Users
exports.getAllChequesForAllUsers = async (req, res) => {
    try {
      const cheques = await Cheque.find({}).select('bankName checkNo user -_id').populate('user', 'username -_id');
  
      if (cheques.length === 0) {
        return res.status(404).json({ message: 'No cheques found for any user' });
      }
  
      const formattedData = cheques.map((cheque) => ({
        id: cheque._id,
        bankName: cheque.bankName,
        checkNo: cheque.checkNo,
        username: cheque.user.username,
      }));
  
      res.json(formattedData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };