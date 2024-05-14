const axios = require('axios');
const { API_URLS, DEFAULT_HEADERS } = require('../constants/constants.js');

axios.defaults.httpsAgent = new (require('https').Agent)({ rejectUnauthorized: false });

module.exports = {
  fetchResults: async function (program) {
    const payload = { program };
    const response = await axios.post(API_URLS.RESULTS, payload, { headers: DEFAULT_HEADERS });
    return response.data;
  },

  fetchData: async function (registerNo, dateOfBirth, examDefId, schemeId) {
    const payload = { registerNo, dateOfBirth, examDefId, schemeId };
    const response = await axios.post(API_URLS.INDIVIDUAL_RESULT, payload, { headers: DEFAULT_HEADERS });
    return response.data;
  },
};