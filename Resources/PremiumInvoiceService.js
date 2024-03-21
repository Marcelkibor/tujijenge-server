const premiumInvoicePdf = require('pdfkit');

const PremiumInvoiceService = {
    generatePremiumInvoicePDF: (res, data) => {
        const premiumBulk = {
            training:{item:{name:'Training',x:50,y:300},rate:{val:0.0,x:260,y:300},price:{val:500,x:460,y:300}},
            premium:{item:{name:'Premium Membership',x:50,y:275},rate:{val:0.0,x:260,y:275},price:{val:1500,x:460,y:275}}
        }
        let total = premiumBulk.premium.price.val+premiumBulk.training.price.val
        const cummulative = {  
            subtotal:{name:{title:'Subtotal',x:390,y:390},values:{total:total,x:450,y:390}},
            discount:{name:{title:'Discount',x:390,y:410},values:{total:0.0,x:450,y:410}},
            tax:{name:{title:'Tax',x:390,y:430},values:{total:0.0,x:450,y:430}},
            total:{name:{title:'Total',x:390,y:450},values:{total:total,x:450,y:450}}
        }
        try {
            //x-axis,y-axis
            const doc = new premiumInvoicePdf();
            // Write text onto the PDF
            doc.fontSize(18).font('Helvetica-Bold').text('Reduced Poverty Club', 50,60);

            // Move down to make space for other content
            doc.moveDown();
            const invoiceDiv = {
                x:420,
                y:50,
                width:100,
                height:40,
            }
            const splitDiv = {
                x:0,
                y:230,
                width:615,
                height:30
            }
            doc.fillColor('#0097b2');
            doc.rect(invoiceDiv.x,invoiceDiv.y,invoiceDiv.width,invoiceDiv.height).fill();
            let cenX = invoiceDiv.x+invoiceDiv.width/2
            let cenY = invoiceDiv.y+invoiceDiv.height/2
            doc.fillColor('white');
            doc.text('Invoice',cenX-30,cenY-6);
            // Write bill details
            doc.fontSize(14).fillColor('black').font('Helvetica-Bold').text('Bill From:', 50, 120);
            doc.font('Helvetica').fillColor('black').fontSize(12).text(`Reduced Poverty Club`,  50,140);

            doc.fontSize(14).fillColor('black').font('Helvetica-Bold').text('Bill To:', 240, 120);
            doc.font('Helvetica').fillColor('black').fontSize(12).text(`${data.clientName}\n${data.phone}`, 240,140);
            doc.fontSize(14).fillColor('black').font('Helvetica-Bold').text(`Invoice No:`, 420, 120);
            doc.font('Helvetica').fillColor('black').fontSize(12).text(`${data.iNumber}\nDate: ${data.due}\nDue:  ${data.due}`, 420,140);
            
            doc.fillColor('#d66016').rect(splitDiv.x,splitDiv.y,splitDiv.width,splitDiv.height).fill();
            doc.fillColor('white').font('Helvetica-Bold').text('Item',splitDiv.x+50,splitDiv.y+10);
            doc.fillColor('white').text('Rate(Ksh)',splitDiv.x+250,splitDiv.y+10);
            doc.fillColor('white').text('Price',splitDiv.x+450,splitDiv.y+10);
            // item.names
            doc.fillColor('black').font('Helvetica').text(premiumBulk.premium.item.name,premiumBulk.premium.item.x,premiumBulk.premium.item.y).fill();
            doc.fillColor('black').font('Helvetica').text(premiumBulk.training.item.name,premiumBulk.training.item.x,premiumBulk.training.item.y).fill();
            // item.rates
            doc.fillColor('black').font('Helvetica').text(premiumBulk.premium.rate.val,premiumBulk.premium.rate.x,premiumBulk.premium.rate.y).fill();
            doc.fillColor('black').font('Helvetica').text(premiumBulk.training.rate.val,premiumBulk.training.rate.x,premiumBulk.training.rate.y).fill();
            // item.price
            doc.fillColor('black').font('Helvetica').text(premiumBulk.premium.price.val,premiumBulk.premium.price.x-10,premiumBulk.premium.price.y).fill();
            doc.fillColor('black').font('Helvetica').text(premiumBulk.training.price.val,premiumBulk.training.price.x-7,premiumBulk.training.price.y).fill();
            //totals
            doc.text(cummulative.subtotal.name.title,cummulative.subtotal.name.x,cummulative.subtotal.name.y);
            doc.text(cummulative.subtotal.values.total,cummulative.subtotal.values.x,cummulative.subtotal.values.y);
            doc.text(cummulative.discount.name.title,cummulative.discount.name.x,cummulative.discount.name.y);
            doc.text(cummulative.discount.values.total,cummulative.discount.values.x,cummulative.discount.values.y);
            doc.text(cummulative.tax.name.title,cummulative.tax.name.x,cummulative.tax.name.y);
            doc.text(cummulative.tax.values.total,cummulative.tax.values.x,cummulative.tax.values.y);
            doc.font('Helvetica-Bold').fontSize(18).text(cummulative.total.name.title,cummulative.total.name.x,cummulative.total.name.y);
            doc.text(cummulative.total.values.total,cummulative.total.values.x,cummulative.total.values.y);
            doc.font('Helvetica').fontSize(14).text('Thank you for purchasing this premium subsciption. For more information or any inquiries please contact 0712345677',50,650)
            // finalize
            doc.pipe(res);
            doc.end();
        } catch (error) {
            console.error(`Error generating PDF: ${error}`);
            res.status(500).send('Error generating PDF');
        }
    }
};

module.exports = PremiumInvoiceService;
