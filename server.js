const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("successfully connected with db.")
}).catch((e)=>{
  console.log("Error with connecting db.")
});

//Cors middleware
app.use(cors())

// Middleware
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const chequeRoutes= require('./routes/chequeRoutes')
const rateOfTaxRoutes = require('./routes/rateOfTaxRoutes');
const underSectionRoutes = require('./routes/underSectionRoutes'); 

app.use('/api/user', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/cheque', chequeRoutes);
app.use('/api/rate-of-tax', rateOfTaxRoutes); 
app.use('/api/under-section', underSectionRoutes); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
