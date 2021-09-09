import { stationRaw, station, trainDataRaw, trainData } from "../types/types";

const isDstObserved = (() => {
	let today: Date = new Date();
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var daylight = new Date(`${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} EDT`);

	let diffInMilliSeconds = Math.abs(daylight.getTime() - today.getTime()) / 1000;
	const hours = Math.floor(diffInMilliSeconds / 3600) % 24;

	if (hours == 3) {
		return true;
	} else {
		return false;
	}
})

isDstObserved();

const dateOrNull = ((date: Date): Date => {
	if (date.toString() == 'Invalid Date') {
		return undefined as any;
	} else {
		return date;
	}
})

export const cleanStationData = ((originalData: stationRaw[]): station[] => {
	let resultingData: station[] = [];

	originalData.forEach((originalStation: stationRaw) => {
		let middleTimeLetter: string;
		if (isDstObserved()) { 
			middleTimeLetter = "D";
		} else {
			middleTimeLetter = "S";
		}
		let stationTimeZone: string = `${originalStation.tz}${middleTimeLetter}T`

		let resultingStation: station = {
			code: originalStation.code, //code of station
			tz: stationTimeZone, //timezone of station (EST, EDT, CST, CDT, PST, or PDT)
			bus: originalStation.bus, //true if bus at stop
			schArr: dateOrNull(new Date(`${originalStation.scharr} ${stationTimeZone}`)), //scheduled arrival at station
			schDep: dateOrNull(new Date(`${originalStation.schdep} ${stationTimeZone}`)), //scheduled departure from station
			schMnt: originalStation.schmnt, //variable from amtrak, not sure use of but could be related to any maintnence the train will go through at this station
			autoArr: originalStation.autoarr, //has the train arrived at this station already?
			autoDep: originalStation.autodep, //has the train departed from this station already?
			postArr: dateOrNull(new Date(`${originalStation.postarr} ${stationTimeZone}`)), //actual arrival at station
			postDep: dateOrNull(new Date(`${originalStation.postdep} ${stationTimeZone}`)), //actual departure from station
			postCmnt: originalStation.postcmnt, //how late it departed in english
			estArr: dateOrNull(new Date(`${originalStation.estarr} ${stationTimeZone}`)), //estimated arrival at station
			estDep: dateOrNull(new Date(`${originalStation.estdep} ${stationTimeZone}`)), //estimated departure from station
			estArrCmnt: originalStation.estarrcmnt, //how early/late train will be in english
			estDepCmnt: originalStation.estdepcmnt, //how early/late train will be in english
		}

		resultingData.push(resultingStation);
	})
	// @ts-ignore
	return resultingData;
})

//takes an array of uncleaned train data and returns an array of cleaned train data
export const cleanTrainData = ((originalData: trainDataRaw[]): trainData[] => {
	let resultingData: trainData[] = [];

	originalData.forEach((originalTrain: trainDataRaw) => {
		let lastArrTime: Date;
		let today: Date = new Date();
		let middleTimeLetter: string;
		let listOfAliases: number[] = [];
		if (isDstObserved()) { 
			middleTimeLetter = "D";
		} else {
			middleTimeLetter = "S";
		}

		let trainTimeZone: string;
		
		if (originalTrain.Aliases != null) {
			originalTrain.Aliases.split(',').forEach((alias) => {
				listOfAliases.push(parseInt(alias));
			});
		}

		if (originalTrain.TrainState == "Completed" && originalTrain.ViewStn1 != null && originalTrain.ViewStn2 != null) {
			//ok hear me out. once a train is complete, the api sets two values with the time of completion, one being in eastern and one being in the tz of the train. i can just use the difference between these values to find out what timezone the train is in. trust me, this is *a lot* cleaner than the alternative

			switch(Math.abs(parseInt(originalTrain.ViewStn1.substring(originalTrain.ViewStn1.indexOf(' ')+1, originalTrain.ViewStn1.indexOf(':'))) - parseInt(originalTrain.ViewStn2.substring(originalTrain.ViewStn2.indexOf(' ')+1, originalTrain.ViewStn2.indexOf(':'))))) { 
				case 0: { //eastern
					trainTimeZone = `E${middleTimeLetter}T`;
					break; 
				} 
				case 1: { //central
					trainTimeZone = `C${middleTimeLetter}T`;
					break; 
				}
				case 2: { //mountain
					trainTimeZone = `M${middleTimeLetter}T`;
					break; 
				}
				case 3: { //pacific
					trainTimeZone = `P${middleTimeLetter}T`;
					break; 
				}
				case 9: { //pacific
					trainTimeZone = `P${middleTimeLetter}T`;
					break; 
				}
				case 10: { //mountain
					trainTimeZone = `M${middleTimeLetter}T`;
					break; 
				}
				case 11: { //cetral
					trainTimeZone = `C${middleTimeLetter}T`;
					break; 
				}
			}
			
			// @ts-ignore
			let lastArrTime: Date = dateOrNull((`${originalTrain.updated_at} ${trainTimeZone}`));

		} else {
			let lastArrTime: null;
			switch(Math.abs(parseInt(originalTrain.updated_at.substring(originalTrain.updated_at.indexOf(' ')+1, originalTrain.updated_at.indexOf(':'))) - parseInt(originalTrain.updated_at.substring(originalTrain.LastValTS.indexOf(' ')+1, originalTrain.LastValTS.indexOf(':'))))) { 
				case 0: { //eastern
					trainTimeZone = `E${middleTimeLetter}T`;
					break; 
				} 
				case 1: { //central
					trainTimeZone = `C${middleTimeLetter}T`;
					break; 
				}
				case 2: { //mountain
					trainTimeZone = `M${middleTimeLetter}T`;
					break; 
				}
				case 3: { //pacific
					trainTimeZone = `P${middleTimeLetter}T`;
					break; 
				}
				case 9: { //pacific
					trainTimeZone = `P${middleTimeLetter}T`;
					break; 
				}
				case 10: { //mountain
					trainTimeZone = `M${middleTimeLetter}T`;
					break; 
				}
				case 11: { //cetral
					trainTimeZone = `C${middleTimeLetter}T`;
					break; 
				}
			}
		}

		let resultingTrain: trainData = {
			routeName: originalTrain.RouteName, //name of the route
			trainNum: parseInt(originalTrain.TrainNum), //train number
			coordinates: [originalTrain.coordinates[1], originalTrain.coordinates[0]], //coordinates in lat, lon
			lat: originalTrain.coordinates[1], //current latitude position of train
			lon: originalTrain.coordinates[0], //current longitude position of train
			heading: originalTrain.Heading, //heading of the train in N, NE, E, SE, S, etc.
			velocity: parseFloat(originalTrain.Velocity),
			// @ts-ignore
			lastValTS: dateOrNull(new Date(`${originalTrain.LastValTS} ${trainTimeZone}`)), //Date object which train was last updated
			// @ts-ignore
			lastArr: lastArrTime, //Date object which train arrived at final destination, null if still uncompleted
			trainState: originalTrain.TrainState, //state of the train ("Predeparture", "Active", or "Completed")
			statusMsg: originalTrain.StatusMsg, //status of the train (" " if normal, "SERVICE DISRUPTION" if the obvious has happened)
			serviceDisruption: (originalTrain.StatusMsg == "SERVICE DISRUPTION"), //true if a service disruption
			eventCode: originalTrain.EventCode, //upcoming or current stop
			destCode: originalTrain.DestCode, //final destination
			origCode: originalTrain.OrigCode, //origin station
			originTZ: `${originalTrain.OriginTZ}${middleTimeLetter}T`, //timezone of origin station (EST, EDT, CST, CDT, PST, or PDT)
			origSchDep: dateOrNull(new Date(`${originalTrain.OrigSchDep} ${originalTrain.OriginTZ}${middleTimeLetter}T`)), //scheduled original departure for train
			// @ts-ignore
			aliases: listOfAliases, //train numbers which also refer to this train
			updatedAt: dateOrNull(new Date(`${originalTrain.updated_at} E${middleTimeLetter}T`)), //the time this data was retrieved from the server
			stations: cleanStationData(originalTrain.Stations) // array of station objects
		}
		// @ts-ignore
		resultingData.push(resultingTrain);
	})
	// @ts-ignore
	return resultingData;
})