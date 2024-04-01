const bodyParser = require('body-parser')
const invoiceRoute = require('./Routes/invoices')
require('dotenv').config(); 
const express = require('express');
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.use("/api",invoiceRoute)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
