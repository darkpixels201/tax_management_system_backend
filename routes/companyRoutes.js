// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create Company
router.post('/create-company', authMiddleware, companyController.createCompany);

// Get All Companies
router.get('/all-companies', authMiddleware, companyController.getAllCompanies);

// Get Single Company for logged in user
router.get('/my-companies', authMiddleware, companyController.getMyCompany);


router.get('/single-company', authMiddleware, companyController.getSingleCompany);

// Get Single Company 
router.get('/company/:id', authMiddleware, companyController.getCompany);

// Update Company
router.put('/update-company/:id', authMiddleware, companyController.updateCompany);

// Delete Company
router.delete('/delete-company/:id', authMiddleware, companyController.deleteCompany);

// Get All Users and their Companies
router.get('/all-users-and-companies', authMiddleware, companyController.getAllUsersAndCompanies);

// Update ShowToAdmin Status
router.put('/update-show-to-admin/:id', companyController.updateShowToAdminStatus);


module.exports = router;
