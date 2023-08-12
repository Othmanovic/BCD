const express = require("express");
const router = express.Router();
const multer = require("multer");
const CardDetails = require("../models/CardDetails");
const Transactions = require("../models/Transactions");
const verifyToken = require("../middlewares/verifyTokenMiddleware");
const Accounts = require("../models/Accounts");

const upload = multer({ storage: multer.memoryStorage() });

function dateFormat(date) {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6) - 1; // JS Date uses 0-based indexing for months (0 - January, 1 - February, etc.)
  const day = date.slice(6, 8);

  const jsDate = new Date(year, month, day);

  return jsDate;
}

// Handle file upload
router.post("/upload1", verifyToken, upload.single("file1"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }

  try {
    var fileContent = String(req.file.buffer);
    var lines = fileContent.split("\r\n");

    lines.forEach(async (line) => {
      var data = line.split("|");

      const obj = {
        CardNo: data[0],
        item2: data[1],
        item3: data[2],
        item4: data[3],
        AccountNo: data[4],
        item6: data[5],
        item7: data[6],
        item8: data[7],
        Currency: data[8],
        item10: data[9],
        item11: data[10],
        TrxType: data[11],
        TrxActualDate: data[12] && dateFormat(data[12]),
        TrxDate: data[13] && dateFormat(data[13]),
        item15: data[14],
        item16: data[15],
        item17: data[16],
        item18: data[17],
        WithdrawalAmount: data[18],
        WithdrawalType: data[19],
        WithdrawalLocation: data[20],
        item22: data[21],
        item23: data[22],
        item24: data[23],
        item25: data[24],
      };
      const newDocument = new Transactions(obj);
      let result = await newDocument.save();
    });
    res.json({ success: true, msg: "Documents inserted successfully" });
  } catch (e) {
    // Printing error
    console.log("Error:", e.stack);
    res.json({ success: false, msg: "Error while parsing file" });
  }
});

// Handle file upload
router.post("/upload2", verifyToken, upload.single("file2"), (req, res) => {
  console.log("upload2", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }

  try {
    var fileContent = String(req.file.buffer);
    var lines = fileContent.split("\r\n");

    lines = lines.slice(10);

    lines.forEach(async (line) => {
      var data = line.split("|");
      data = data.slice(1, -1);

      const obj = {
        PAN: data[0],
        AccountNumber: data[1],
        CardAccountNumber: data[2],
        BranchName: data[3],
        BranchCode: data[4],
        GuaranteeType: data[5],
        CreationDate: data[6],
        EmployeeDetails: data[7],
        EmbossingName: data[8],
        CustomerName: data[9],
        CreditLimit: data[10],
        ExpiryDate: data[11],
      };
      const newDocument = new CardDetails(obj);
      let result = await newDocument.save();
    });
    res.json({ success: true, msg: "Documents inserted successfully" });
  } catch (e) {
    // Printing error
    console.log("Error:", e.stack);
    res.json({ success: false, msg: "Error while parsing file" });
  }
});

router.post("/upload3", verifyToken, upload.single("file3"), (req, res) => {
  console.log("upload3", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }

  try {
    var fileContent = String(req.file.buffer);
    var lines = fileContent.split("\r\n");

    lines = lines.slice(1);

    lines.forEach(async (line) => {
      var data = line.split("|");
      data = data.slice(1, -1);

      const obj = {
        AccountNo: data[0],
        CardNo: data[1],
        Mbr: data[2],
        AccountLimit: data[3],
        Balance: data[4],
        AccFlag: data[5],
        DueAmount: data[6],
        OverDueAmount: data[7],
        OverDueDays: data[8],
        OverLimitAmount: data[9],
        CmsStatus: data[10],
        OnlineStatus: data[11],
        CreateDate: data[12],
        ExpiryDate: data[13],
        AccountStatus: data[14],
        AccountCurrency: data[15],
        ActivationDate: data[16],
        AmountOnHold: data[17],
        ExternalAccount: data[18],
        AccountBranch: data[19],
        AccountType: data[20],
        LinkedContract: data[21],
        ClientName: data[22],
        AccountState: data[23],
        ProductType: data[24],
        DomesticMPProfile: data[25],
        InternationalMPProfile: data[26],
        LinkedCards: data[27],
        LinkedValidCards: data[28],
        AccDAFProfileNameDom: data[29],
        AccDAFProfileNameInt: data[30],
        ArrestedAmounts: data[31],
        RetailBalance: data[32],
        CashBalance: data[33],
        FeesBalance: data[34],
        InterestBalance: data[35],
        PaymentsBalance: data[36],
        OthersBalance: data[37],
        InstallmentBalance: data[38],
      };
      const newDocument = new Accounts(obj);
      let result = await newDocument.save();
    });
    res.json({ success: true, msg: "Documents inserted successfully" });
  } catch (e) {
    // Printing error
    console.log("Error:", e.stack);
    res.json({ success: false, msg: "Error while parsing file" });
  }
});

// search
router.get("/search", verifyToken, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const cards = await CardDetails.find({
      $or: [
        { AccountNumber: { $in: query } },
        { PAN: { $in: query } },
      ],
    });

    res.json({ cards: cards });
  } catch (error) {
    console.error("Error searching cards:", error);
    res.status(500).json({ message: "Error searching cards" });
  }
});

// Card data from CardDetails table
router.get("/get-card-data/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const cardData = await CardDetails.findById(id);

    res.json({ success: true, cardData: cardData });
  } catch (error) {
    console.error("Error fetching card data:", error);
    res.status(500).json({ message: "Error fetching card data" });
  }
});

// Bank Statment
router.post("/getBankStatment", verifyToken, async (req, res) => {
  try {
    const { cardNo, accountNo, startDate, endDate } = req.body.searchData;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const query = {
      $and: [
        {
          $or: [
            { CardNo: { $in: cardNo } },
            { AccountNo: { $in: accountNo } },
          ],
        },
        {
          TrxDate: {
            $gte: start,
            $lt: end,
          },
        },
      ],
    };

    const transactions = await Transactions.find(query);
    res.json({ transactions: transactions });
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({ message: "Error retrieving transactions" });
  }
});

// Transactions data from Transactions table
router.get("/get-transaction-data/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const cardData = await Transactions.findById(id);

    res.json({ success: true, cardData: cardData });
  } catch (error) {
    console.error("Error fetching card data:", error);
    res.status(500).json({ message: "Error fetching card data" });
  }
});



module.exports = router;
