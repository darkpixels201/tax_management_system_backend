const express = require('express');
const router = express.Router();
const ledgerController = require('../controllers/ledgerController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create Ledger
router.post('/create-ledger', authMiddleware, ledgerController.createLedger);

// Get All Ledgers
router.get('/all-ledgers', authMiddleware, ledgerController.getAllLedgers);

// Get Ledger by ID
router.get('/get-ledger/:id', authMiddleware, ledgerController.getLedgerById);

// Update Ledger
router.put('/update-ledger/:id', authMiddleware, ledgerController.updateLedger);

// Delete Ledger
router.delete('/delete-ledger/:id', authMiddleware, ledgerController.deleteLedger);

// Get Ledgers by Company Name
router.get('/get-ledgers-by-company/:companyName', authMiddleware, ledgerController.getLedgersByCompanyName);

// Get Ledgers by Company ID
router.get('/ledgers-by-company/:companyId',authMiddleware, ledgerController.getLedgersByCompanyId);

// Update accessToDeleteLedger for a Ledger
router.put('/ledger/update-access/:id', authMiddleware, ledgerController.updateAccessToDeleteLedger);

module.exports = router;
