const dotenv = require('dotenv');
dotenv.config(); 
require('./dbconnection')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const chequeRoutes = require('./routes/chequeRoutes');
const rateOfTaxRoutes = require('./routes/rateOfTaxRoutes');
const underSectionRoutes = require('./routes/underSectionRoutes'); 
const taxDeductionRateRoutes = require('./routes/taxDeductionRateRoutes'); 
const ledgerRoutes = require('./routes/ledgerRoutes'); 
const Company = require('./models/Company');
const Ledger = require('./models/Ledger');
const RateOfTax = require('./models/RateOfTax');
const User = require('./models/User');
const Cheque = require('./models/Cheque');
const UnderSection = require('./models/UnderSection');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Cors middleware
app.use(cors());

// Proxy route
app.use('/api/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://api.darkpixels-tax.shop' + req.url);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('<h3>Tax Management System</h3>');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/user', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/cheque', chequeRoutes);
app.use('/api/rate-of-tax', rateOfTaxRoutes); 
app.use('/api/under-section', underSectionRoutes); 
app.use('/api/tax-deduction-rate', taxDeductionRateRoutes); 
app.use('/api/ledger', ledgerRoutes);
app.get('/api/get_count', authMiddleware, async (req, res) => {
  try {
    const companyCount = await Company.countDocuments()
    const ledgerCount = await Ledger.countDocuments()
    const ledgerCountForUser = await Ledger.countDocuments({ createdBy: req.userId })
    const companyCountForUser = await Company.countDocuments({ user: req.userId })
    const rateOfTaxCount = await RateOfTax.countDocuments()
    const approvedUsersCount = await User.countDocuments({ status: 'approve' });
    const pendingUsersCount = await User.countDocuments({ status: 'pending' });
    const chequeCount = await Cheque.countDocuments()
    const underSectionCount = await UnderSection.countDocuments()
    res.json({ companyCount, ledgerCount, rateOfTaxCount, approvedUsersCount, pendingUsersCount, chequeCount, underSectionCount, ledgerCountForUser, companyCountForUser })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
