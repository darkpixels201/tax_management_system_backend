const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token, userId: user._id, email: user.email, type: user.type, status: user.status });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Signup
exports.signup = async (req, res) => {
    const { username, email, password} = req.body;
  
    try {
      const ifUserExist = await User.findOne({ $or: [{ username }] });
      const ifEmailExist = await User.findOne({ $or: [{ email }] });
  
      if (ifUserExist) {
        return res.status(400).json({ message: 'Username already in Use' });
      }

      if (ifEmailExist) {
        return res.status(400).json({ message: 'Email already in Use' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      const newUser = await user.save();
      res.status(201).json({ id: newUser._id, email: newUser.email });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Get Signup User's Pending List
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' });
    res.json(pendingUsers.map(user => ({ id: user._id, username: user.username, email: user.email, status: user.status })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Signup User's Pending
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ id: deletedUser._id, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Signup User's Approved List
exports.getApprovedUsers = async (req, res) => {
  try {
    const approvedUsers = await User.find({ status: 'approve' });
    res.json(approvedUsers.map(user => ({ id: user._id, username: user.username, email: user.email, accountStatus: user.accountStatus })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Type
exports.updateUserType = async (req, res) => {
    const { userId } = req.params;
    const { type } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, { type }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ id: updatedUser._id, type: updatedUser.type });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update User Status
  exports.updateUserStatus = async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, { status }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ id: updatedUser._id, status: updatedUser.status });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };