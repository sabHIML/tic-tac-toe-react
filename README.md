## Fun with Tic Tac Toe

### Basic Features:
* Two users play a game of tick-tack-toe on the same computer
* No real-time functionality is required
* Single session
* All actions are reported to the API, which saves them
* Action log is displayed underneath the game area, read from the API
* The game resume if the browser is refreshed

### Technologies :
* React & Redux
* Node.js
* Docker

### Developed with :
* Node 12.1.0
* Yarn 1.17.0
* Docker 19.03.2

## Installation

1. Clone the repository.
2. Enter into folder: `cd tic-tac-toe-react`
3. set API origin in `src/config/api.js`
4. Install dependencies: `yarn`
5. Runs the app in the development mode: `yarn start` or build it : `yarn build`
6. Visit [http://localhost:3000](http://localhost:3000) in your browser
7. Enjoy the game.

### Docker

The easiest way to get up and running is using Docker. Once the Docker CLI is installed from [https://www.docker.com/get-docker](https://www.docker.com/get-docker).

1. Clone and enter the root of the tic-tac-toe application
2. set API origin in `src/config/api.js`
3. Run: `docker-compose up --build`
4. Visit [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser

#### Testing
After installation, run `yarn test` to run automated test cases.

#### API Project 
API part stored in [this](https://github.com/sabHIML/tic-tac-toe-api) Repository.  
 
