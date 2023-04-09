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

  // Fetch the goal map
  async getGoalMap() {
    console.log('Fetching goal map...');
    try {
      const response = await axios.get(`${this.baseUrl}/map/${this.candidateId}/goal`);
      console.log('Goal map fetched');
      return response.data.goal;
    } catch (error) {
      console.error('Error fetching goal map:', error.message);
      return [];
    }
  }

  // Add a Polyanet at the specified row and column
  async addPolyanet(row, column) {
    console.log(`Adding Polyanet at (${row}, ${column})`);
    try {
      const response = await axios.post(`${this.baseUrl}/polyanets`, { candidateId: this.candidateId, row, column });
      console.log(`Polyanet added at (${row}, ${column})`);
      return response.status === 200;
    } catch (error) {
      console.error('Error adding Polyanet:', error.message);
      return false;
    }
  }

  // Add a Soloon at the specified row and column with the specified color
  async addSoloon(row, column, color) {
    console.log(`Adding ${color} Soloon at (${row}, ${column})`);
    try {
      const response = await axios.post(`${this.baseUrl}/soloons`, { candidateId: this.candidateId, row, column, color });
      console.log(`${color.charAt(0).toUpperCase() + color.slice(1)} Soloon added at (${row}, ${column})`);
      return response.status === 200;
    } catch (error) {
      console.error('Error adding Soloon:', error.message);
      return false;
    }
  }

  // Add a Cometh at the specified row and column facing the specified direction
  async addCometh(row, column, direction) {
    console.log(`Adding Cometh facing ${direction} at (${row}, ${column})`);
    try {
      const response = await axios.post(`${this.baseUrl}/comeths`, { candidateId: this.candidateId, row, column, direction });
      console.log(`Cometh facing ${direction} added at (${row}, ${column})`);
      return response.status === 200;
    } catch (error) {
      console.error('Error adding Cometh:', error.message);
      return false;
    }
  }
}

// MegaverseSolver class to implement the solution logic
class MegaverseSolver {
  constructor(api) {
    this.api = api;
  }

  // Helper function to add a delay in milliseconds
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Process the goal map and add the entities accordingly
  async processGoalMap(goalMap) {
    console.log('Processing goal map...');
    for (let row = 0; row < goalMap.length; row++) {
      for (let column = 0; column < goalMap[row].length; column++) {
        const cell = goalMap[row][column];

        // Add Polyanets
        if (cell === 'POLYANET') {
          await this.api.addPolyanet(row, column);
        }
        // Add Soloons
        else if (cell.startsWith('BLUE_SOLOON') || cell.startsWith('RED_SOLOON') || cell.startsWith('PURPLE_SOLOON') || cell.startsWith('WHITE_SOLOON')) {
          const color = cell.split('_')[0].toLowerCase();
          await this.api.addSoloon(row, column, color);
        }
        // Add Comeths
        else if (cell.startsWith('UP_COMETH') || cell.startsWith('DOWN_COMETH') || cell.startsWith('LEFT_COMETH') || cell.startsWith('RIGHT_COMETH')) {
          const direction = cell.split('_')[0].toLowerCase();
          await this.api.addCometh(row, column, direction);
        }

        // Add a 200ms delay between requests to avoid rate limiting
        await this.delay(200);
      }
    }
    console.log('Goal map processing complete');
  }
}

// Main function to fetch the goal map and process it
(async () => {
  console.log('Starting...');
  if (!candidateId) {
    console.error('CANDIDATE_ID environment variable is not set');
    process.exit(1);
  }

  // Instantiate MegaverseAPI and MegaverseSolver classes
  const api = new MegaverseAPI(candidateId);
  const solver = new MegaverseSolver(api);

  // Fetch the goal map and process it to add the entities
  const goalMap = await api.getGoalMap();

  if (goalMap.length === 0) {
    console.error('Goal map is empty');
    process.exit(1);
  }

  await solver.processGoalMap(goalMap);
  console.log('All entities added');
})();
