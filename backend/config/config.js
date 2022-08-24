const serverConfig = {
    port: 8010,
    hostname: '127.0.0.1'
}

const dbConfig = {
    mongoUrl: 'mongodb://127.0.0.1:27017/project'
}
const authConfig = {
    jwtSecret: 'WiproCapstone'
}
module.exports = {
    serverConfig,
    dbConfig,
    authConfig
}