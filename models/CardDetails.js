const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  PAN: { type: String, trim: true },
  AccountNumber: { type: String, trim: true },
  CardAccountNumber: { type: String, trim: true },
  BranchName: { type: String, trim: true },
  BranchCode: { type: String, trim: true },
  GuaranteeType: { type: String, trim: true },
  CreationDate: { type: String, trim: true },
  EmployeeDetails: { type: String, trim: true }, // You may customize the data type based on your needs
  EmbossingName: { type: String, trim: true },
  CustomerName: { type: String, trim: true },
  CreditLimit: { type: String, trim: true },
  ExpiryDate: { type: String, trim: true },
});

const CardDetails = mongoose.model('CardDetails', mySchema);

module.exports = CardDetails;
