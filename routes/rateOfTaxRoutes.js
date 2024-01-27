const express = require('express');
const router = express.Router();
const rateOfTaxController = require('../controllers/rateOfTaxController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create Rate of Tax
router.post('/create-rate-of-tax', authMiddleware, rateOfTaxController.createRateOfTax);

// Get All Rates of Tax
router.get('/all-rates-of-tax', authMiddleware, rateOfTaxController.getAllRatesOfTax);

// Get Rate of Tax by ID
router.get('/get-rate-of-tax/:id', authMiddleware, rateOfTaxController.getRateOfTaxById);

// Update Rate of Tax
router.put('/update-rate-of-tax/:id', authMiddleware, rateOfTaxController.updateRateOfTax);

// Delete Rate of Tax
router.delete('/delete-rate-of-tax/:id', authMiddleware, rateOfTaxController.deleteRateOfTax);

module.exports = router;
