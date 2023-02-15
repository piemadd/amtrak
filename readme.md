# Amtrak.js

[![Amtrak.js - Unofficial Amtrak Library - The easiest way to track Amtrak Trains Programmatically! | Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=312322&theme=dark&e=.svg)](https://www.producthunt.com/posts/amtrak-js-unofficial-amtrak-library?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-amtrak-js-unofficial-amtrak-library)

## Disclaimer

This library and its creator have no relation to Amtrak. Amtrak and the Amtrak
Logo are trademarks of The National Railroad Passenger Corporation (NRPC). The
API endpoint used is originally intended for with
[Amtrak's Train Tracking map](https://www.amtrak.com/track-your-train.html).

## Note

Any version below 3.0.0 **WILL NO LONGER WORK** due to:

- Amtrak blocking all requests from any Node.js REST client, or at least the
  ones that I have tried.
- The deprecation of the Amtraker v1 and v2 APIs.

While v3 code syntax is the same, the resulting types are different, please
check the [docs](#docs) section for more information.

## Installation

Using NPM:

`npm install amtrak`

Using Yarn:

`yarn add amtrak`

Using PNPM:

`pnpm add amtrak`

## Functions

Amtrak.js has a pretty basic schema with 4 different functions:

- `fetchAllTrains()`: Fetches all active Amtrak trains.
- `fetchTrain(trainId: string)`: Fetches a train by its number or ID.
- `fetchAllStations()`: Fetches metadata for all Amtrak stations.
- `fetchStation(stationId: string)`: Fetches metadata for a station by its ID.

### `fetchAllTrains()`

- Fetches all active Amtrak trains.
- Returns `Promise<TrainResponse>` where each key is a train number and the
  value is a list of `Train` objects.

#### Example

```ts
const { fetchAllTrains } = require("amtrak"); // CommonJS
import { fetchAllTrains } from "amtrak"; // ES6


// JS
fetchAllTrains().then((trains) => {
  console.log(trains);
});

// TS

```

### `fetchTrain(trainId: string)`

- Fetches a train by its number or ID.
- Returns `Promise<TrainResponse>` with a single key (the train number) and the
  value is a list of `Train` objects.
  - If a valid Train ID is provided, the value will be a list of length 1.
- If the train number/ID is not found, the promise will resolve with an empty
  array.
- A train ID is comprised of the train number and the day of the month the train
  originated.
  - For example, a California Zephyr train (train #5) that originated on
    02/09/2023 would have an ID of `5-9`;

### `fetchAllStations()`

- Fetches metadata for all Amtrak stations.
- Returns `Promise<StationResponse>` where each key is a station ID and the
  value is a `StationMeta` object.

### `fetchStation(stationId: string)`

- Fetches metadata for a station by its ID.
- Returns `Promise<StationResponse>` with a single key (the station ID) and the
  value is a `StationMeta` object.
- If the station ID is not found, the promise will resolve with an empty object.

### `fetchStaleStatus()`

- Fetches info on the state of the Amtraker API.
- Returns `Promise<StaleStatusResponse>`.
