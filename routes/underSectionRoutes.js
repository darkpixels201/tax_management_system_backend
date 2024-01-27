const express = require('express');
const router = express.Router();
const underSectionController = require('../controllers/underSectionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create UnderSection
router.post('/create-under-section', authMiddleware, underSectionController.createUnderSection);

// Get All UnderSections
router.get('/all-under-sections', authMiddleware, underSectionController.getAllUnderSections);

// Get UnderSection by ID
router.get('/get-under-section/:id', authMiddleware, underSectionController.getUnderSectionById);

// Update UnderSection
router.put('/update-under-section/:id', authMiddleware, underSectionController.updateUnderSection);

// Delete UnderSection
router.delete('/delete-under-section/:id', authMiddleware, underSectionController.deleteUnderSection);

module.exports = router;
