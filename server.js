const dotenv = require('dotenv');
dotenv.config(); 
require('./dbconnection')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const chequeRoutes= require('./routes/chequeRoutes')
const rateOfTaxRoutes = require('./routes/rateOfTaxRoutes');
const underSectionRoutes = require('./routes/underSectionRoutes'); 
const taxDeductionRateRoutes = require('./routes/taxDeductionRateRoutes'); 
const ledgerRoutes = require('./routes/ledgerRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

//Cors middleware
app.use(cors())

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
