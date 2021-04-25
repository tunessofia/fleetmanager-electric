## About

Small POC for rendering a google maps, with a predefined route for an electric vehicle, showing the relevant charging stations along the way

- The App renders a Map with the Departure marker, Arrival marker and best route from Lisbon Airport to the Autódromo Internacional do Algarve. 
- The App only renders the relevant Charging Stations along the way
- The App provides a way for the user to select only the Fast Charging Stations
- The user is able to visualize the Charging Station information - Address, socket type and number of sockets 🔌

This poc also uses a dummy backend server, found in the backend/ folder built to load some static info about the charging stations, so a call to an api could be simulated.


<img width="845" alt="poc-view" src="https://github.com/tunessofia/fleetmanager-electric/blob/master/poc.png">


## Built with

- ReactJs
- Jest
- Bootstrap
- Google Maps API
- Webpack

## What do you need to run the project

You will need a Google Maps API key with permissions for Maps Javascript API, Directions API and Service Usage API.

After that, copy the .env.example found in frontend/, to the same dir, under name .env.development.local and set your api in that file.

## Available Scripts

To run de project you need to first in the backend/ folder run:

### `npm run dev-server`

And then in the frontend/ directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Opens [http://localhost:3001] .

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
