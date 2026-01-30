const axios = require('axios');

// Refresh the library
async function refreshLibrary(DOMAIN, LIBRARY_ID, headers, logInfo, logError) {
  try {
    logInfo(`Triggering library refresh for ID: ${LIBRARY_ID}`);

    await axios.post(`${DOMAIN}/api/libraries/${LIBRARY_ID}/scan`, null, { headers });

    logInfo('Library refresh triggered.');
  } catch (error) {
    logError(`Library refresh failed: ${error.message || error}`);
    throw error;
  }
}


// Export all features cleanly
module.exports = {
  refreshLibrary
};
