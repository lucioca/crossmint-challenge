require('dotenv').config();
const axios = require('axios');

const candidateId = process.env.CANDIDATE_ID;

// MegaverseAPI class to handle API requests
class MegaverseAPI {
  // Constructor with candidateId and optional API base URL
  constructor(candidateId, baseUrl = 'https://challenge.crossmint.io/api') {
    this.candidateId = candidateId;
    this.baseUrl = baseUrl;
  }

  // Generic method to create an entity
  async createEntity(entityType, params) {
    try {
      const response = await axios.post(`${this.baseUrl}/${entityType}`, {
        ...params,
        candidateId: this.candidateId,
      });

      console.log(`${entityType} created with parameters:`, params);
      return response.data;
    } catch (error) {
      console.error(`Error creating ${entityType} with parameters ${JSON.stringify(params)}:`, error.message);
    }
  }

  // Method to create a Polyanet
  createPolyanet(row, col) {
    return this.createEntity('polyanets', { row, column: col });
  }
}

// MegaverseSolver class to implement the solution logic
class MegaverseSolver {
  constructor(api) {
    this.api = api;
  }

  // Method to create an X-shaped Polyanets with a specified delay between API calls
  async createXPolyanetsWithDelay(delayMs) {
    const xPolyanetCoords = [
      [2, 2], [2, 8], [3, 3], [3, 7], [4, 4], [4, 6], [5, 5], [6, 4], [6, 6], [7, 3], [7, 7], [8, 2], [8, 8],
    ];

    console.log('Creating X-shaped Polyanets with delay...');

    for (const [row, col] of xPolyanetCoords) {
      await this.api.createPolyanet(row, col);
      console.log(`Waiting for ${delayMs} ms before creating the next Polyanet...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

// Main function
(async () => {
  if (!candidateId) {
    console.error('CANDIDATE_ID environment variable is not set');
    process.exit(1);
  }

  const api = new MegaverseAPI(candidateId);
  const solver = new MegaverseSolver(api);

  await solver.createXPolyanetsWithDelay(200);
  console.log('All entities created');
})();
