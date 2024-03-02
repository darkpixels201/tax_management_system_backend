const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer=require("nodemailer")

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD, 
  },
});
// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
     if(!email || !password){
      return res.status(404).json({ message: 'Email and Password both required.' });
     }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Send the OTP to the user's email
    const mailOptions = {
      from: `"FACTS" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Login Alert',
      text: `You just logged in with your account.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error")
      }
      console.log(`Email sent`);
     
    });
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      res.json({ token, userId: user._id, email: user.email, type: user.type, status: user.status, accountStatus: user.accountStatus });
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

   // Update Account Status
   exports.updateAccountStatus = async (req, res) => {
    const { userId } = req.params;
    const { accountStatus } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, { accountStatus }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ id: updatedUser._id, status: updatedUser.accountStatus });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // API to request password reset OTP
exports.forgotPassword=async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate and save a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetPasswordToken = otp.toString();
    user.resetPasswordExpires = Date.now() + 600000; // OTP expires in 10 minutes

    await user.save();
    
    // Send the OTP to the user's email
    const mailOptions = {
      from: `"FACTS" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending OTP via email' });
      }
      console.log(`Email sent: ${info.response}`);
      res.status(200).json({ message: 'OTP sent successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



exports.resetPassword=async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.resetPasswordToken || user.resetPasswordToken !== otp || Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Reset the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteUser= async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser=async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId, 'username email type status accountStatus');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateUser=async (req, res) => {
  const userId = req.params.userId;
  const { username, email, type, status, accountStatus } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, type, status, accountStatus },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}