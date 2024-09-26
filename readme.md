# Amtrak.js

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
check the [docs](#functions) section for more information.

## Installation

Using NPM:

`npm install amtrak`

Using Yarn:

`yarn add amtrak`

Using PNPM:

`pnpm add amtrak`

## CLI Usage

Not complete, check back later.

## oEmbed

The Amtraker oEmbed endpoint is [https://api.amtraker.com/v3/oembed](https://api.amtraker.com/v3/oembed), following the standard [oEmbed Spec](https://oembed.com/).

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
- Associated endpoint: `https://api-v3.amtraker.com/v3/trains`

#### Example

```ts
const { fetchAllTrains } = require("amtrak"); // CommonJS
import { fetchAllTrains } from "amtrak"; // ES6

// JS
fetchAllTrains().then((trains) => {
  console.log(trains);
});

// TS
fetchAllTrains().then((trains: TrainResponse) => {
  console.log(trains);
});
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
- Associated endpoint: `https://api-v3.amtraker.com/v3/trains/:trainId`

#### Example

```ts
const { fetchTrain } = require("amtrak"); // CommonJS
import { fetchTrain } from "amtrak"; // ES6

// JS
fetchTrain("5-9").then((train) => {
  console.log(train);
});

// TS
fetchTrain("5-9").then((train: TrainResponse) => {
  console.log(train);
});
```

### `fetchAllStations()`

- Fetches metadata for all Amtrak stations.
- Returns `Promise<StationResponse>` where each key is a station ID and the
  value is a `StationMeta` object.
- Associated endpoint: `https://api-v3.amtraker.com/v3/stations`

#### Example

```ts
const { fetchAllStations } = require("amtrak"); // CommonJS
import { fetchAllStations } from "amtrak"; // ES6

// JS
fetchAllStations().then((stations) => {
  console.log(stations);
});

// TS
fetchAllStations().then((stations: StationResponse) => {
  console.log(stations);
});
```

### `fetchStation(stationId: string)`

- Fetches metadata for a station by its ID.
- Returns `Promise<StationResponse>` with a single key (the station ID) and the
  value is a `StationMeta` object.
- If the station ID is not found, the promise will resolve with an empty object.
- Associated endpoint: `https://api-v3.amtraker.com/v3/stations/:stationId`

#### Example

```ts
const { fetchStation } = require("amtrak"); // CommonJS
import { fetchStation } from "amtrak"; // ES6

// JS
fetchStation("CHI").then((station) => {
  console.log(station);
});

// TS
fetchStation("CHI").then((station: StationResponse) => {
  console.log(station);
});
```

### `fetchStaleStatus()`

- Fetches info on the state of the Amtraker API.
- Returns `Promise<StaleStatusResponse>`.
- Associated endpoint: `https://api-v3.amtraker.com/v3/stale`

#### Example

```ts
const { fetchStaleStatus } = require("amtrak"); // CommonJS
import { fetchStaleStatus } from "amtrak"; // ES6

// JS
fetchStaleStatus().then((status) => {
  console.log(status);
});

// TS
fetchStaleStatus().then((status: StaleStatusResponse) => {
  console.log(status);
});
```

## Types

There are a handful of types that are used throughout the library. Below is a
list:

### Train

```ts
interface Train {
  routeName: string; // Name of the train route
  trainNum: string; // Train number
  trainID: string; // Train ID
  lat: number; // Latitude of the train
  lon: number; // Longitude of the train
  trainTimely: string; // Deprecated
  stations: Station[]; // List of stations the train has and will pass through
  heading: string; // Direction the train is heading in the 8 cardinal directions
  eventCode: string; // Upcoming/current station
  eventTZ: string; // Timezone of the upcoming/current station
  eventName: string; // Name of the upcoming/current station
  origCode: string; // Origin station code
  originTZ: string; // Timezone of the origin station
  origName: string; // Name of the origin station
  destCode: string; // Destination station code
  destTZ: string; // Timezone of the destination station
  destName: string; // Name of the destination station
  trainState: string; // Either "Predeparture" or "Active"
  velocity: number; // Speed of the train in MPH
  statusMsg: string; // Status message associated with the train, if any
  createdAt: string; // Timestamp of when the train data was stored in Amtrak's DB
  updatedAt: string; // Timestamp of when the train data was last updated
  lastValTS: string; // Timestamp of when the train data was last received
  objectID: number; // ID of the train data in Amtrak's DB
  provider: string; // The provider of this train, either "Amtrak" or "Via"
}
```

### Station

```ts
interface Station {
  name: string; // Name of the station in plain english
  code: string; // Station code
  tz: string; // Timezone of the station
  bus: boolean; // Whether or not the station is a bus stop
  schArr: string; // Scheduled arrival time
  schDep: string; // Scheduled departure time
  arr: string; // Actual arrival time
  dep: string; // Actual departure time
  arrCmnt: string; // Deprecated
  depCmnt: string; // Deprecated
  platform: string; // Platform name/number, if available
  status: string; // One of "Enroute", "Station", "Departed", or "Unknown"
}
```

### StationMeta

```ts
interface StationMeta {
  name: string; // Name of the station in plain english
  code: string; // Station code
  tz: string; // Timezone of the station
  lat: number; // Latitude of the station
  lon: number; // Longitude of the station
  hasAddress: boolean; // Whether or not the station has address data. Usually true for Amtrak, usually false for Via Rail.
  address1: string; // Address line 1 of the station
  address2: string; // Address line 2 of the station, *usually* empty
  city: string; // City of the station
  state: string; // State of the station
  zip: number; // Zip code of the station
  trains: string[]; // List of train IDs that pass through the station
}
```

### TrainResponse

```ts
interface TrainResponse {
  [key: string]: Train[];
}
```

### StationResponse

```ts
interface StationResponse {
  [key: string]: StationMeta;
}
```

### StaleData

```ts
interface StaleData {
  avgLastUpdate: number; // Average time in milliseconds since train data was last updated in Amtrak's database
  activeTrains: number; // Number of trains that are currently active
  stale: boolean; // Whether or not the data is stale
}
```

## Endpoints

As mentioned above in the [Functions](#functions) section, each function is
associated with an endpoint. Below is a list of all endpoints used by the
library, where the associated function returns the same data as the endpoint,
allowing you to use the library with your own HTTP client.

- `https://api-v3.amtraker.com/v3/trains`
  - Associted with [`fetchAllTrains()`](#fetchAllTrains)
- `https://api-v3.amtraker.com/v3/trains/:trainId`
  - Associted with [`fetchTrain(trainId: string)`](#fetchTraintrainId-string)
- `https://api-v3.amtraker.com/v3/stations`
  - Associted with [`fetchAllStations()`](#fetchAllStations)
- `https://api-v3.amtraker.com/v3/stations/:stationId`
  - Associted with
    [`fetchStation(stationId: string)`](#fetchStationstationId-string)
- `https://api-v3.amtraker.com/v3/stale`
  - Associted with [`fetchStaleStatus()`](#fetchStaleStatus)
