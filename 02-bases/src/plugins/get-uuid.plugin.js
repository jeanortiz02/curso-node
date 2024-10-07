const crypto = require('crypto'); 


const generateUniqueId = () => {
    return crypto.randomUUID();
}

module.exports = {
    generateUniqueId
}