const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("successfully connected with db.")
  }).catch((e)=>{
    console.log("Error with connecting db.")
  });