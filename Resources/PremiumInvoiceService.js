const premiumInvoicePdf = require('pdfkit');

const PremiumInvoiceService = {
    generatePremiumInvoicePDF: (res) => {
        // Create a new PDF document
        const doc = new premiumInvoicePdf();

        // Write text onto the PDF
        doc.fontSize(20).text('Premium Invoice', { align: 'center' });
        doc.moveDown();

        // Write bill from, bill to, and invoice number
        doc.fontSize(14).text('Bill From:', { continued: true });
        doc.text('Your Company Name\nYour Address\nCity, State, Zip\nCountry');

        doc.moveUp(0.5).text('Bill To:', { continued: true });
        doc.text('Client Name\nClient Address\nCity, State, Zip\nCountry');

        doc.moveUp(0.5).text('Invoice Number:', { continued: true });
        doc.text('INV-001'); // Replace with actual invoice number

        // Pipe the PDF to the response stream
        doc.pipe(res);

        // Finalize the PDF
        doc.end();
    }
};

module.exports = PremiumInvoiceService;
