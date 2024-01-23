const express = require('express');
const router = express.Router();
const chequeController = require('../controllers/chequeController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create Cheque
router.post('/create-cheque', authMiddleware, chequeController.createCheque);

// Get All Cheques
router.get('/all-cheques', authMiddleware, chequeController.getAllCheques);

// Get Cheque by ID
router.get('/get-cheque/:id', authMiddleware, chequeController.getChequeById);

// Update Cheque
router.put('/update-cheque/:id', authMiddleware, chequeController.updateCheque);

// Delete Cheque
router.delete('/delete-cheque/:id', authMiddleware, chequeController.deleteCheque);

// Get Cheques by Bank Name
router.get('/by-bank/:bankName', authMiddleware, chequeController.getChequesByBank);

// Get Cheques of All Users
router.get('/all-users-cheques', authMiddleware, chequeController.getAllChequesForAllUsers);


module.exports = router;
