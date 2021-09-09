# Amtrak

## Disclaimer
This library and it's creator have no relation to Amtrak. Amtrak and the Atmrak Logo are trademarks of The National Railroad Passenger Corporation (NRPC). The API endpoint used is not intended for use outside of [Amtrak's Train Tracking map](https://www.amtrak.com/track-your-train.html). 

## Don't be an A\*\*
- Please refrain from spamming the API, as that is an a\*\*hole move. The API returns an object with everything in it, so there is ***literally no reason*** to spam the API. 
- If you want to keep your application with the most up to date, I would simply update once per minute (central server) or every 5 to 10 minutes (individual clients).
- In the future, I plan on hosting my own free API which will serve the same data as the Amtrak API, just with some added benefits, such as pulling information for specific trains and stations. I plan on allowing this library to interact with said API, so stay tuned.

## Installation
It'n an NPM package lol:

`npm install amtrak`

## Usage/Documentation

### Types/Objects
Currently the library returns what it gets from the API, a massive array of `trainData` objects. The following is what a `trainData` object looks like:
```ts
interface trainData {
	routeName: string; //name of the route
	trainNum: number; //train number
	coordinates: number[]; //coordinates in lat, lon
	lat: number; //current latitude position of train
	lon: number; //current longitude position of train
	heading: string; //heading of the train in N, NE, E, SE, S, etc.
	velocity: number;
	lastValTS: Date; //Date object which train was last updated
	lastArr: Date; //Date object which train arrived at final destination, null if still uncompleted
	trainState: string; //state of the train ("Predeparture", "Active", or "Completed")
	statusMsg: string; //status of the train (" " if normal, "SERVICE DISRUPTION" if the obvious has happened)
	serviceDisruption: boolean; //true if a service disruption
	eventCode: string; //upcoming or current stop
	destCode: string; //final destination
	origCode: string; //origin station
	originTZ: string; //timezone of origin station (EST, EDT, CST, CDT, PST, or PDT)
	origSchDep: Date; //scheduled original departure for train
	aliases: number[]; //train numbers which also refer to this train
	updatedAt: Date; //the time this data was retrieved from the server
	stations: station[]; //
};
```
If you look at the bottom, you see an array of `station` objects as well, so it's probably important to know what those are as well:
```ts
interface station {
	code: string; //code of station
	tz: string; //timezone of station (EST, EDT, CST, CDT, PST, or PDT)
	bus: boolean; //true if bus at stop
	schArr: Date; //scheduled arrival at station
	schDep: Date; //scheduled departure from station
	schMnt: string; //variable from amtrak, not sure use of but could be related to any maintnence the train will go through at this station
	autoArr: boolean; //has the train arrived at this station already?
	autoDep: boolean; //has the train departed from this station already?
	postArr?: Date; //actual arrival at station
	postDep?: Date; //actual departure from station
	postCmnt?: string; //how late it departed in english
	estArr?: Date; //estimated arrival at station
	estDep?: Date; //estimated departure from station
	estArrCmnt?: string; //how early/late train will be in english
	estDepCmnt?: string; //how early/late train will be in english
}
```
To make better sense of this information, check out `examples/completed.json` to see what a completed train's data looks like and `examples/inprogress.json` to see what an in progress' train looks like. You can also look in `examples/full.json` to see what a full object looks like in JSON. Do note, the dates in these JSON objects are just what happens when you convert a `Date` object to a string. In reality, you will have a Date object to work with.

Also, everything is currently synchronous, though I do plan on moving to asynchronous functions in the future.

### TS Example
As this library was written in TypeScript, it is naturally easy to use it:
```ts
import { fetchTrainData, cleanTrainData } from 'amtrak';

//fetches data, cleans it, and then prints to terminal
fetchTrainData().then((trainData) => {
	let cleanedData = cleanTrainData(trainData);
	console.dir(cleanedData, { depth: null })
})
```

### JS Example
And of course, as the TS is compliled to JS, you can use that as well:
```js
const amtrak = require("amtrak");
amtrak.fetchTrainData().then((trainData) => {
    let cleanedData = amtrak.cleanTrainData(trainData);
    console.dir(cleanedData, { depth: null })
});
```

## Contributing
I don't currently have any official contributing templates, but please make sure to add some testing code to `testing/src/testAll.ts`. Anything you add should take one of the existing types and return a modified version of it or a new type which you define in `src/types/types.ts`.