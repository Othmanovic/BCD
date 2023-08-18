const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
  CardNo: { type: String, trim: true },
  item2: { type: String, trim: true },
  item3: { type: String, trim: true },
  item4: { type: String, trim: true },
  AccountNo: { type: String, trim: true },
  item6: { type: String, trim: true },
  item7: { type: String, trim: true },
  item8: { type: String, trim: true },
  Currency: { type: String, trim: true },
  item10: { type: String, trim: true },
  item11: { type: String, trim: true },
  TrxType: { type: String, trim: true },
  TrxActualDate: { type: Date, trim: true },
  TrxDate: { type: Date, trim: true },
  item15: { type: String, trim: true },
  item16: { type: String, trim: true },
  item17: { type: String, trim: true },
  item18: { type: String, trim: true },
  WithdrawalAmount: { type: String, trim: true },
  WithdrawalType: { type: String, trim: true },
  WithdrawalLocation: { type: String, trim: true },
  item22: { type: String, trim: true },
  item23: { type: String, trim: true },
  item24: { type: String, trim: true },
  item25: { type: String, trim: true },
});

const Transactions = mongoose.model("Transactions", mySchema);

module.exports = Transactions;
