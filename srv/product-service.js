const cds = require('@sap/cds');
module.exports = cds.service.impl( (srv) => {

    srv.on('UpdateStatus', (req) => {
        console.log(req.data);
    });


    srv.on('AddStock', add_stock);
    srv.on('UpdateStockForAll', (req) => {
        console.log('Update All Triggered');
        console.log(req.data);
        return 'Test';
    });

    srv.after('READ', 'Products', (lines) => { 
        if(Array.isArray(lines)) {
        lines.map((line) => { 
            line.desc = line.id + ' test'; 
            line.addStockEnabled = line.stock < 10;
            if ( line.stock < 5) line.criticalityInd = 1;
            else if ( line.stock < 10 )  line.criticalityInd = 2;
            else line.criticalityInd = 3;

            if ( line.stock / 0.2 > 75 ) line.stockCriticality = 3;
            else if ( line.stock / 0.2 > 50 ) line.stockCriticality = 2;
            else line.stockCriticality = 1;
            
        }) }
        else {
            lines.desc = lines.id + ' test';
            lines.addStockEnabled = lines.stock < 10;
            if ( lines.stock < 5) lines.criticalityInd = 1;
            else if ( lines.stock < 10 ) lines.criticalityInd = 2;
            else lines.criticalityInd = 3;

            if ( lines.stock / 0.2 > 75 ) lines.stockCriticality = 3;
            else if ( lines.stock / 0.2 > 50 ) lines.stockCriticality = 2;
            else lines.stockCriticality = 1;
        }
    });
});

async function add_stock(req) {
    console.log("test action");
    const stockVal = req.data.stock;
    const prodID = req.params[0].id;

    //Get current stock for the product ID
    let prodData = await cds.tx(req).run(SELECT('Products').where('id =', prodID));
    if ( prodData[0] == undefined )
    { req.reject(404, "Product not found."); }
    else if (prodData[0].stock >= 10 )
    { req.reject(405, "Enough stock Available");}
    
    //Update stock with the value entered
    await cds.tx(req).run(UPDATE('Products').set('stock +=', stockVal).where('id =', prodID))
    .then(all => {console.log(all); 
    if (all == 1 ) {req.notify(200, "Stock Updated");}});

}