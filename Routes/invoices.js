const express = require("express");
const router = express.Router();
const Mailjet = require("node-mailjet");
const PremiumInvoiceService = require("../Resources/PremiumInvoiceService");
require("dotenv").config();

// Initialize Mailjet client
const mailjetClient = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY || 'your-api-key',
  apiSecret: process.env.MAILJET_API_SECRET || 'your-api-secret'
});

router.post("/premium", async (req, res) => {
  try {
    const { iNumber, due, clientName, phone,cEmail } = req.body;
    const pdfBuffer = await PremiumInvoiceService.generatePremiumInvoicePDF({
      iNumber,
      due,
      clientName,
      phone,
    });

    // Prepare email message
    const emailMessage = {
      From: {
        Email: process.env.SENDER_EMAIL,
        Name: process.env.SENDER_NAME,
      },
      To: [
        {
          Email: cEmail,
          Name: clientName,
        },
      ],
      Subject: "Premium Member Invoice",
      TextPart: "Please find your premium member invoice attached.",
      Attachments: [
        {
          ContentType: "application/pdf",
          Filename: "premium-invoice.pdf",
          Base64Content: pdfBuffer.toString("base64"),
        },
      ],
    };
    // Send email with PDF attachment
    const request = mailjetClient
      .post("send", { version: "v3.1" })
      .request({ Messages: [emailMessage] });
    // Await response
    const response = await request;
    console.log("STATUS:sI200", response.body);
    res.status(200).json({ message: "The invoice has been sent to your email." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending invoice to email" });
  }
});

module.exports = router;
