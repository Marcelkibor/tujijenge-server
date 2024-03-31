const express = require("express");
const router = express.Router();
const mailjet = require("node-mailjet");
const PremiumInvoiceService = require("../Resources/PremiumInvoiceService");
require("dotenv").config();

// Initialize Mailjet client
const mailjetClient = mailjet.connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);
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
        Email: cEmail,
        Name: clientName,
      },
      To: [
        {
          Email: process.env.EMAIL_RECIPIENT,
          Name: process.env.RECIPIENT_NAME,
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
    console.log("Email sent successfully:", response.body);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

module.exports = router;
