# Amtrak.js Documentation
This markdown file will guide you through the types and funtions from the library you can call/interact with.

## Types/Structs
I have no idea what the proper name for these are, but they're like structs. There are three of them, `station`, `stationMin`, and `trainData`. These are all pretty self-explanitory of what each variable holds.

```ts
interface station {
	trainNum: number; //number of the train station is from
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

```ts
interface stationMin {
	trainNum: number; //number of the train station is from
	schArr: Date; //scheduled arrival at station
	schDep: Date; //scheduled departure from station
	postArr?: Date; //actual arrival at station
	postDep?: Date; //actual departure from station
	postCmnt?: string; //how late it departed in english
	estArr?: Date; //estimated arrival at station
	estDep?: Date; //estimated departure from station
	estArrCmnt?: string; //how early/late train will be in english
	estDepCmnt?: string; //how early/late train will be in english
}
```

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
	stations: station[]; //array of station objects
};
```

## Functions
There are 5 functions in this library, with one pulling all of the data directly from Amtrak, and the other 4 interact with my proxy api (api.amtrak.piemadd.com) which serves the same data, but allows for individual stations to be fetched and when fetching all stations and trains, they are organized by train number/station code instead of being one single array. Unless stated otherwise, assume all of these are async.

Also I am terrible at writing so these descriptions are pretty bad, but feel free to check out the `API` section below which might help you better understand some of these.

`fetchTrainData()` - Returns an array of `trainData` objects, with each being a currently active, recently active, or soon-to-be active Amtrak train.

`fetchTrain(trainNum)` - Returns an array of `trainData` objects with every object being from a train posessing the given train number (trainNum).

`fetchAllTrains()` - Returns object where the keys are the number to an Amtrak train and the values are what `fetchTrain()` would return, being an array of `trainData` objects.

`fetchStation(stationCode)` - Returns a list of `stationMin` objects correlating to the station code passed, with each object being related to a train arriving within the next few hours or having left a few hours back. 

`fetchAllStations()` = Returns an object where the keys are station codes and the objects being what `fetchStation()` would return.

## API
The last four functions above are also available from an API enpoint, being https://api.amtrak.piemadd.com/v1, which can be used to get a feel for the system and also add Amtrak API support to other libraries. Everything is returned as JSON.

[`/trains/{trainNum}`](https://api.amtrak.piemadd.com/v1/trains/{trainNum}) - same as `fetchTrain(trainNum)`

[`/trains`](https://api.amtrak.piemadd.com/v1/trains) - same as `fetchAllTrains()`

[`/stations/{stationCode}`](https://api.amtrak.piemadd.com/v1/stations) - same as `fetchStation(stationCode)`

[`/stations`](https://api.amtrak.piemadd.com/v1/trains/{stationCode}) - same as `fetchAllStations()`