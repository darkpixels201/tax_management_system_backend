const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Login
router.post('/login', authController.login);

// Signup
router.post('/signup', authController.signup);

// Get Signup User's Pending List
router.get('/pending-users', authMiddleware, authController.getPendingUsers);

// Delete Signup User's Pending
router.delete('/pending-users/:id', authMiddleware, authController.deleteUser);

// Get Signup User's Approved List
router.get('/approved-users', authMiddleware, authController.getApprovedUsers);

// Update User Type
router.patch('/update-user-type/:userId', authMiddleware, authController.updateUserType);

// Update User Status
router.patch('/update-user-status/:userId', authMiddleware, authController.updateUserStatus);

// Update Account Status
router.put('/update-account-status/:userId',authMiddleware, authController.updateAccountStatus);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

router.delete('/:userId',  authController.deleteUser)

router.get('/:userId', authController.getUser) 

router.put('/:userId',  authController.updateUser)
 
module.exports = router;
