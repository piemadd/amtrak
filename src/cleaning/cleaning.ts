import { stationRaw, station, stationMin, trainDataRaw, trainData } from "../types/types";

const isDstObserved = (() => {
	let date = new Date();

    let year = date.getFullYear();
    let dst_start = new Date(year, 2, 14);
    let dst_end = new Date(year, 10, 7);
    dst_start.setDate(14 - dst_start.getDay()); // adjust date to 2nd Sunday
    dst_end.setDate(7 - dst_end.getDay()); // adjust date to the 1st Sunday

    return (date >= dst_start && date < dst_end);
})

export const tzExtend = ((singleLetter: string) => {
	let zones = {
		'E': "EST5EDT",
		'C': "CST6CDT",
		'M': "MST7MDT",
		'P': "PST8PDT"
	}

	// @ts-ignore
	return zones[singleLetter];

})

export const tzConv = ((threeLetter: string) => {
	let zones = {
		'EST': 'America/New_York',
		'EDT': 'America/New_York',
		'CST': 'America/Chicago',
		'CDT': 'America/Chicago',
		'MST': 'America/Denver',
		'MDT': 'America/Denver',
		'PST': 'America/Los_Angeles',
		'PDT': 'America/Los_Angeles'
	};
	
	// @ts-ignore
	return zones[threeLetter];
})

const dateOrNull = ((date: Date): Date => {
	if (date.toString() == 'Invalid Date') {
		return undefined as any;
	} else {
		return date;
	}
})

export const cleanStationDataAPI = ((originalData: station[]) => {
	let resultingData: station[] = [];

	originalData.forEach((originalStation: station) => {
		let tempSchArr = originalStation.schArr;
		let tempSchDep = originalStation.schDep;
		let tempPostArr = originalStation.postArr;
		let tempPostDep = originalStation.postDep;
		let tempEstARr = originalStation.estArr;
		let estDep = originalStation.estDep;

		if ((tempSchArr != undefined) && (tempSchArr != null)) {tempSchArr = new Date(tempSchArr)};
		if ((tempSchDep != undefined) && (tempSchDep != null)) {tempSchDep = new Date(tempSchDep)};
		if ((tempPostArr != undefined) && (tempPostArr != null)) {tempPostArr = new Date(tempPostArr)};
		if ((tempPostDep != undefined) && (tempPostDep != null)) {tempPostDep = new Date(tempPostDep)};
		if ((tempEstARr != undefined) && (tempEstARr != null)) {tempEstARr = new Date(tempEstARr)};
		if ((estDep != undefined) && (estDep != null)) {estDep = new Date(estDep)};

		let stationTemp =  {
			trainNum: originalStation.trainNum, //number of the train station is from
			code: originalStation.code,
			tz: tzConv(originalStation.tz),
			bus: originalStation.bus,
			schArr: tempSchArr, //scheduled arrival at station
			schDep: tempSchDep, //scheduled departure from station
			schMnt: originalStation.schMnt,
			autoArr: originalStation.autoArr,
			autoDep: originalStation.autoDep,
			postArr: tempPostArr, //actual arrival at station
			postDep: tempPostDep, //actual departure from station
			postCmnt: originalStation.postCmnt, //how late it departed in english
			estArr: tempEstARr, //estimated arrival at station
			estDep: estDep, //estimated departure from station
			estArrCmnt: originalStation.estArrCmnt, //how early/late train will be in english
			estDepCmnt: originalStation.estDepCmnt, //how early/late train will be in english
		}
		resultingData.push(stationTemp)
	});
	return resultingData;
});

export const cleanTrainDataAPI = ((originalData: trainData[]) => {
	let finalTrains: trainData[] = [];
	originalData.forEach((originalTrain: trainData) => {
		let trainDataTemp: trainData = {
			routeName: originalTrain.routeName, //name of the route
			trainNum: originalTrain.trainNum, //train number
			coordinates: originalTrain.coordinates, //coordinates in lat, lon
			lat: originalTrain.lat, //current latitude position of train
			lon: originalTrain.lon, //current longitude position of train
			heading: originalTrain.heading, //heading of the train in N, NE, E, SE, S, etc.
			velocity: originalTrain.velocity,
			objectID: originalTrain.objectID,
			lastValTS: new Date(originalTrain.lastValTS), //Date object which train was last updated
			trainTimeZone: originalTrain.trainTimeZone, //the current time zone of the train
			lastArr: new Date(originalTrain.lastArr), //Date object which train arrived at final destination, null if still uncompleted
			trainState: originalTrain.trainState, //state of the train ("Predeparture", "Active", or "Completed")
			statusMsg: originalTrain.statusMsg, //status of the train (" " if normal, "SERVICE DISRUPTION" if the obvious has happened)
			serviceDisruption: originalTrain.serviceDisruption, //true if a service disruption
			eventCode: originalTrain.eventCode, //upcoming or current stop
			destCode: originalTrain.destCode, //final destination
			origCode: originalTrain.origCode, //origin station
			originTZ: originalTrain.originTZ, //timezone of origin station (EST, EDT, CST, CDT, PST, or PDT)
			origSchDep: new Date(originalTrain.origSchDep), //scheduled original departure for train
			aliases: originalTrain.aliases, //train numbers which also refer to this train
			updatedAt: new Date(originalTrain.updatedAt), //the time this data was retrieved from the server
			stations: cleanStationDataAPI(originalTrain.stations), //poop
		};
		finalTrains.push(trainDataTemp);
	})
	return finalTrains;
})

export const cleanStationDataAPIMin = ((originalData: station[]) => {
	let resultingData: stationMin[] = [];

	originalData.forEach((originalStation: station) => {
		let tempSchArr = originalStation.schArr;
		let tempSchDep = originalStation.schDep;
		let tempPostArr = originalStation.postArr;
		let tempPostDep = originalStation.postDep;
		let tempEstARr = originalStation.estArr;
		let estDep = originalStation.estDep;

		if ((tempSchArr != undefined) && (tempSchArr != null)) {tempSchArr = new Date(tempSchArr)};
		if ((tempSchDep != undefined) && (tempSchDep != null)) {tempSchDep = new Date(tempSchDep)};
		if ((tempPostArr != undefined) && (tempPostArr != null)) {tempPostArr = new Date(tempPostArr)};
		if ((tempPostDep != undefined) && (tempPostDep != null)) {tempPostDep = new Date(tempPostDep)};
		if ((tempEstARr != undefined) && (tempEstARr != null)) {tempEstARr = new Date(tempEstARr)};
		if ((estDep != undefined) && (estDep != null)) {estDep = new Date(estDep)};

		let stationTemp =  {
			trainNum: originalStation.trainNum, //number of the train station is from
			schArr: tempSchArr, //scheduled arrival at station
			schDep: tempSchDep, //scheduled departure from station
			postArr: tempPostArr, //actual arrival at station
			postDep: tempPostDep, //actual departure from station
			postCmnt: originalStation.postCmnt, //how late it departed in english
			estArr: tempEstARr, //estimated arrival at station
			estDep: estDep, //estimated departure from station
			estArrCmnt: originalStation.estArrCmnt, //how early/late train will be in english
			estDepCmnt: originalStation.estDepCmnt, //how early/late train will be in english
		}
		resultingData.push(stationTemp)
	});
	return resultingData;
});

export const cleanStationData = ((originalData: stationRaw[], originalTrainNum: number): station[] => {
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
			trainNum: originalTrainNum, //number of parent train
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
			switch(Math.abs(parseInt(originalTrain.updated_at.substring(originalTrain.updated_at.indexOf(' ')+1, originalTrain.updated_at.indexOf(':'))) - parseInt(originalTrain.LastValTS.substring(originalTrain.LastValTS.indexOf(' ')+1, originalTrain.LastValTS.indexOf(':'))))) { 
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
			objectID: originalTrain.OBJECTID,
			lat: originalTrain.coordinates[1], //current latitude position of train
			lon: originalTrain.coordinates[0], //current longitude position of train
			heading: originalTrain.Heading, //heading of the train in N, NE, E, SE, S, etc.
			velocity: parseFloat(originalTrain.Velocity),
			// @ts-ignore
			lastValTS: dateOrNull(new Date(`${originalTrain.LastValTS} ${trainTimeZone}`)), //Date object which train was last updated
			// @ts-ignore
			trainTimeZone: trainTimeZone, //the current time zone of the train
			// @ts-ignore
			lastArr: lastArrTime, //Date object which train arrived at final destination, null if still uncompleted
			trainState: originalTrain.TrainState, //state of the train ("Predeparture", "Active", or "Completed")
			statusMsg: originalTrain.StatusMsg, //status of the train (" " if normal, "SERVICE DISRUPTION" if the obvious has happened)
			serviceDisruption: (originalTrain.StatusMsg == "SERVICE DISRUPTION"), //true if a service disruption
			eventCode: originalTrain.EventCode, //upcoming or current stop
			destCode: originalTrain.DestCode, //final destination
			origCode: originalTrain.OrigCode, //origin station
			originTZ: tzConv(originalTrain.OriginTZ), //timezone of origin station (EST, EDT, CST, CDT, PST, or PDT)
			origSchDep: dateOrNull(new Date(`${originalTrain.OrigSchDep} ${originalTrain.OriginTZ}${middleTimeLetter}T`)), //scheduled original departure for train
			// @ts-ignore
			aliases: listOfAliases, //train numbers which also refer to this train
			updatedAt: dateOrNull(new Date(`${originalTrain.updated_at} E${middleTimeLetter}T`)), //the time this data was retrieved from the server
			stations: cleanStationData(originalTrain.Stations, parseInt(originalTrain.TrainNum)) // array of station objects
		}
		// @ts-ignore
		resultingData.push(resultingTrain);
	})
	// @ts-ignore
	return resultingData;
})