const itemModel = require('../items/items.entity');
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'group13glproject@gmail.com',
        pass: 'binegvmnkestuvsn'
    }
});



async function sendMail(product) {
    console.log(product)
    product.map(async(list) => {
        const result = await transporter.sendMail({
            from: 'group13glproject@gmail.com',
            to: 'akki.kumar0909@gmail.com',
            subject: `${list.productName} have less than 10 stocks`,
            text: `please order ${list.productName}'s stocks,current number of items in stock:${list.stock}`
        });

        console.log(JSON.stringify(result, null, 4));

    })


}

module.exports = {
    sendMail
}