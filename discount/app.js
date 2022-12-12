const app = require('express')()
const cors = require('cors')
const userModel = require('./users/user.entity')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose
    .connect("mongodb://127.0.0.1:27017/project", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.put('/updateUserCoupon/:id', (req, res) => {                     // to assign coupon to user
    const id = req.params.id
    const body = req.body
    userModel.updateOne({ '_id': id }, { $addToSet: { coupons: body } }, (err, response) => {
        if (err) res.status(500).send(err)
        else res.send(response)
    })
})
app.put('/useUserCoupon/:id', (req, res) => {                  // to get the coupon so that user can use      
    const id = req.params.id
    const body = req.body
    userModel.updateOne({ '_id': id }, { $pull: { coupons: body } }, (err, response) => {
        if (err) res.status(500).send(err)
        else res.send(response)
    })
})





module.exports = app