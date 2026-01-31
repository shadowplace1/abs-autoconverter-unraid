require('dotenv').config({ override: true });
const { refreshLibrary } = require('./extrafeatures');
const axios = require('axios');
const cron = require('node-cron');

// Load environment variables
const {
  DOMAIN,
  LIBRARIES,
  LIBRARY_REFRESH_WAIT,
  TOKEN,
  MAX_PARALLEL_CONVERSIONS,
  CRON_SETTING,
  BITRATE,
  TZ = 'UTC'
} = process.env;

// Validate required values and throw out errors
if (!DOMAIN || DOMAIN.trim() === '') {
  throw new Error('A Domain is required and cannot be empty.')
};

if (!LIBRARIES || LIBRARIES.trim() === '') {
  throw new Error('LIBRARIES is required and cannot be empty.');
}

if (!TOKEN || TOKEN.trim() === '') {
    throw new Error('Tokens is required and cannot be empty.');
}

// Ensure Refresh Wait is not invalid
const REFRESH_WAIT_MS = Number(LIBRARY_REFRESH_WAIT) * 1000;

if (isNaN(REFRESH_WAIT_MS) || REFRESH_WAIT_MS < 0) {
  throw new Error('LIBRARY_REFRESH_WAIT must be a positive number (seconds).');
}

// Parse library list
const LIBRARY_LIST = LIBRARIES.split(',').map(id => id.trim());

// Timezone
process.env.TZ = TZ;
console.log('Timezone is set to:', TZ);

// Shared headers
const headers = { Authorization: 'Bearer ' + TOKEN };

// Logging helpers
function logInfo(message) {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] INFO: ${message}`);
}

function logError(message) {
  const timestamp = new Date().toLocaleString();
  console.error(`[${timestamp}] ERROR: ${message}`);
}

// Extract and convert items
async function extractItems(obj, results = []) {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      await extractItems(item, results);
    }
  } else if (obj && typeof obj === 'object') {
    if (obj.id && obj.media?.metadata?.title) {
      results.push(`ID: ${obj.id}, Titel: ${obj.media.metadata.title}`);
      logInfo(`ID: ${obj.id} Name: ${obj.media.metadata.title}`);

      try {
        await axios.post(`${DOMAIN}/api/tools/item/${obj.id}/encode-m4b?token=${TOKEN}&bitrate=${BITRATE}`);
      } catch (error2) {
        if (error2.response && error2.response.status === 400) {
          logInfo(`Skipping conversion — Audiobookshelf reports item ${obj.id} is already processing.`);
        } else {
          logError(`Conversion Error for item ${obj.id}: ${error2.message || error2}`);
        }
      }
    }

    for (const value of Object.values(obj)) {
      await extractItems(value, results);
    }
  }

  return results;
}


// Multi-library loop
async function start() {
  try {
    for (const libraryId of LIBRARY_LIST) {
      logInfo(`Starting cycle for library ${libraryId}`);

      await refreshLibrary(DOMAIN, libraryId, headers, logInfo, logError);

      logInfo(`Waiting ${LIBRARY_REFRESH_WAIT} seconds before processing library ${libraryId}...`);

      await new Promise(resolve => setTimeout(resolve, REFRESH_WAIT_MS));

      const url = `${DOMAIN}/api/libraries/${libraryId}/items?limit=${MAX_PARALLEL_CONVERSIONS}&page=0&filter=tracks.bXVsdGk%3D`;

      const response = await axios.get(url, { headers });
      const data = response.data;

      await extractItems(data);

      logInfo(`Completed cycle for library ${libraryId}. Moving to next library...`);
    }

    logInfo("All libraries processed. Loop will restart on next cron cycle.");
  } catch (error) {
    logError(JSON.stringify(error, null, 2));
  }
}

// Start cron
cron.schedule(CRON_SETTING, () => {
  start();
});