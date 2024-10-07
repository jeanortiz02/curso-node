
const axios = require('axios');

const httpClientPlugin = {
    get: async(url) => {
        
        // Axios
        const response = await axios.get(url);
        return response.data;


        // Fetch
        // const response = await fetch(url);
        // return await response.json();
    },

    post: async(url, data) => {},
    put: async(url, data) => {},
    delete: async(url) => {},

}

module.exports = {
    httpClientPlugin,
}