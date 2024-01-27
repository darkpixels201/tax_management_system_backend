const express = require('express');
const router = express.Router();
const taxDeductionRateController = require('../controllers/taxDeductionRateController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create Tax Deduction Rate
router.post('/create-tax-deduction-rate', authMiddleware, taxDeductionRateController.createTaxDeductionRate);

// Get All Tax Deduction Rates
router.get('/all-tax-deduction-rates', authMiddleware, taxDeductionRateController.getAllTaxDeductionRates);

// Get Tax Deduction Rate by ID
router.get('/get-tax-deduction-rate/:id', authMiddleware, taxDeductionRateController.getTaxDeductionRateById);

// Update Tax Deduction Rate
router.put('/update-tax-deduction-rate/:id', authMiddleware, taxDeductionRateController.updateTaxDeductionRate);

// Delete Tax Deduction Rate
router.delete('/delete-tax-deduction-rate/:id', authMiddleware, taxDeductionRateController.deleteTaxDeductionRate);

module.exports = router;
