const Company = require('../models/Company');
const User= require('../models/User')

// Create Company
exports.createCompany = async (req, res) => {
    const { companyName, address, natureOfWork, rateOfTax, underSection, ntn, taxDeduction, showToAdmin } = req.body;
  
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const company = new Company({
        companyName,
        address,
        natureOfWork,
        rateOfTax,
        underSection,
        ntn,
        taxDeduction,
        showToAdmin,
        user: req.userId,
      });
  
      // Add the new company to the user's companies array
      user.companies.push(company._id);
  
      // Save both the user and company
      await Promise.all([user.save(), company.save()]);
  
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Get All Companies
exports.getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.find({ user: req.userId }).select('companyName showToAdmin');
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get Single Company
exports.getCompany = async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findOne({ _id: companyId, user: req.userId });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Company
exports.updateCompany = async (req, res) => {
    const companyId = req.params.id;
    const { companyName, address, natureOfWork, rateOfTax, underSection, ntn, taxDeduction, showToAdmin } = req.body;
  
    try {
      // Find the company to be updated
      const company = await Company.findOne({ _id: companyId, user: req.userId });
  
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // Update the company fields
      company.companyName = companyName;
      company.address = address;
      company.natureOfWork = natureOfWork;
      company.rateOfTax = rateOfTax;
      company.underSection = underSection;
      company.ntn = ntn;
      company.taxDeduction = taxDeduction;
      company.showToAdmin = showToAdmin;
  
      // Save the updated company
      const updatedCompany = await company.save();
  
      // Response with the updated company details
      res.json(updatedCompany);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Delete Company
exports.deleteCompany = async (req, res) => {
    const companyId = req.params.id;
  
    try {
      // Find the company to be deleted
      const company = await Company.findOne({ _id: companyId, user: req.userId });
  
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // Find the user and remove the company from their companies array
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove the company from the user's companies array
      user.companies = user.companies.filter((userCompanyId) => userCompanyId.toString() !== companyId);
  
      // Save the updated user
      await user.save();
  
      // Delete the company
      await Company.deleteOne({ _id: companyId });
  
      res.json({ id: companyId, message: 'Company deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Get All Users with their Companies
exports.getAllUsersAndCompanies = async (req, res) => {
  try {
    const usersWithCompanies = await User.find({}).populate('companies', 'companyName showToAdmin _id'); 
    const formattedData = usersWithCompanies.map((user) => ({
      username: user.username,
      companies: user.companies.map(company => ({ companyName: company.companyName, showToAdmin: company.showToAdmin, companyId: company._id })), 
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  