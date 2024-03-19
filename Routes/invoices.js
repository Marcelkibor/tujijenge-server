const router = require("express").Router();
const PremiumInvoiceService = require('../Resources/PremiumInvoiceService'); // Import the service

router.get("/premium", async (req, res) => {
    try {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename=premium-member-invoice.pdf'
        });

        // Call the service function with the response object
        PremiumInvoiceService.generatePremiumInvoicePDF(res);

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

module.exports = router;
