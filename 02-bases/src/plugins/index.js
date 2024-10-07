

const {getAge} = require('./get-age.plugin');
const { generateUniqueId } = require('./get-uuid.plugin');

// API
const { httpClientPlugin } = require('./http-client.plugin');

// Logger
const buildLogger = require('./logger.plugin')

module.exports = {
    getAge,
    generateUniqueId,
    httpClientPlugin,
    buildLogger

}