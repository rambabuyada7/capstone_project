const app = require('express')()
const httpProxy = require('http-proxy-middleware')
const cors = require('cors')
const csvtojson = require("csvtojson");
const formidable = require('formidable');
const itemModel = require('./items/items.entity')
const mongoose = require('mongoose');



app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

mongoose
    .connect("mongodb://127.0.0.1:27017/project", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        start
    });

//creating proxy for discount and backend
const userProxy = httpProxy.createProxyMiddleware({ target: 'http://localhost:8010', pathRewrite: { '^/appData': '/' } })
app.use('/appData', userProxy)
const discountProxy = httpProxy.createProxyMiddleware({ target: 'http://localhost:8030', pathRewrite: { '^/discountData': '/' } })
app.use('/discountData', discountProxy)


//bulk upload
app.post('/bulkUpload', (req, res) => {
    const formidable = require('formidable');
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ // upto here only csv
                error: 'file could not be uploaded',
            });
        }

        //from csv to json
        csvtojson()
            .fromFile(files.file.filepath) // upn to this csv file
            .then(csvData => { // json obj
                itemModel.insertMany(csvData, (err, rest) => { // insertmany to upload to db
                    if (err) { console.log(err); return res.send({ error: err }) }
                    res.send({ message: "Items uploaded Successfully" })
                });
            });
    })
})





module.exports = app