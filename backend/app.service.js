const bodyParser = require('body-parser')
const fileupload = require("express-fileupload");
const cors = require('cors')
const db = require('./db')
const api = require('./api')
const morgan = require('morgan');


//create middleware
const useMiddleWares = (app) => {
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(fileupload());
    app.use(morgan('dev'));

}

//establish mongo connection
const mongoConnection = () => {
    db.createMongooseConnection()
    const connection = db.getMongoConnection()
    connection.on('open', () => { return console.log("mongodb connection established"); })
    connection.on('error', () => { return console.log("mongodb connection failed"); })
}

const useApi = (app) => {
    app.use('/api', api)


}

module.exports = {
    useMiddleWares,
    mongoConnection,
    useApi
}