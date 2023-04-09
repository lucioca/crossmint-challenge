# Crossmint Challenge
This repository contains two JavaScript scripts for solving the Crossmint Challenge:

- **create_polyanets.js**: Creates a series of Polyanets in an X-shaped pattern, with a delay between API calls to avoid rate limiting.

- **megaverse_challenge_solver.js**: Fetches the goal map from the Megaverse API and processes it by creating Polyanets, Soloons, and Comeths as specified in the goal map.

## Prerequisites
- Node.js installed on your system
- A valid CANDIDATE_ID from the Crossmint Challenge

## Setup
Clone the repository
```bash
git clone git@github.com:lucioca/crossmint-challenge.git
```

Navigate to the project directory
```bash
cd crossmint-challenge
```

Install the required packages
```bash
npm install
```

Set your CANDIDATE_ID in the .env file
```bash
CANDIDATE_ID=your_candidate_id_here
```

## Usage and execution
### create_polyanets.js
To use create_polyanets.js:

Open a terminal in the directory containing **create_polyanets.js** and then run
```bash
node create_polyanets.js
```

This will execute the *createXPolyanetsWithDelay* method of the **MegaverseSolver** class, which will create an X-shaped pattern of Polyanet entities on the Megaverse platform.

### megaverse_challenge_solver.js
To use megaverse_challenge_solver.js:

Open a terminal in the directory containing **megaverse_challenge_solver.js** and then run
```bash
node megaverse_challenge_solver.js
```

This will execute the *processGoalMap* method of the **MegaverseSolver** class, which will process the goal map and add the necessary entities to complete the coding challenge on the Megaverse platform.

## Author
@lucioca