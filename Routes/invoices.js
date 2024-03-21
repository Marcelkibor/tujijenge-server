const router = require("express").Router();
const PremiumInvoiceService = require('../Resources/PremiumInvoiceService'); // Import the service

router.get("/premium", async (req, res) => {
    try {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline;filename=premium-member-invoice.pdf'
        });

        // Dynamic data
        const invoiceData = {
            iNumber: '100TN12',
            due: '17/02/2022',
            clientName: 'Jean Marie',
            phone: '072123232',
        };

        // Call the service function with dynamic data and the response object
        PremiumInvoiceService.generatePremiumInvoicePDF(res, invoiceData);

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

module.exports = router;
