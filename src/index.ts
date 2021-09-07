import axios from "axios";
import * as crypto from "crypto-js";
import * as tzLookup from "tz-lookup"; 
import * as moment from "moment-timezone";
import { stationRaw, station, trainDataRaw, trainData } from "./types";

const dataUrl: string = 'https://maps.amtrak.com/services/MapDataService/trains/getTrainsData';
const sValue: string = '9a3686ac';
const iValue: string = 'c6eb2f7f5c4740c1a2f708fefd947d39';
const publicKey: string = '69af143c-e8cf-47f8-bf09-fc1f61e5cc33';
const masterSegment: number = 88;

const fetchTrainData = async (i: number = 0): Promise<trainDataRaw[]> => {
  if (i > 3) throw Error('Issue');
  try {
    const { data } = await axios.get(dataUrl);
    // Parse Data
    const mainContent = data.substring(0, data.length - masterSegment);
	  const encryptedPrivateKey = data.substr(data.length - masterSegment, data.length);
    const privateKey = decrypt(encryptedPrivateKey, publicKey).split('|')[0]
    const { features:parsed } = JSON.parse(decrypt(mainContent, privateKey));
    return parsed.map(({ geometry, properties }: any) => {
      const tempTrainData: trainDataRaw = <trainDataRaw>{
        coordinates: geometry.coordinates
      };
      const filteredKeys = Object.keys(properties).filter((key) => key.startsWith('Station') && properties[key] != null);
      const sortedKeys = filteredKeys.sort((a: string, b: string): number => 
        parseInt(a.replace('Station', '')) - parseInt(b.replace('Station', ''))
      );
      tempTrainData.Stations = sortedKeys.map((key) => JSON.parse(properties[key]));
      Object.keys(properties).forEach((key) => {
        //@ts-ignore
        if (!key.startsWith('Station') && !tempTrainData.hasOwnProperty(key)) tempTrainData[key] = properties[key];
      })
      return tempTrainData;
    });
  } catch (e) {
    return await fetchTrainData();
  }
}

Date.prototype.stdTimezoneOffset = function () {
	var jan = new Date(this.getFullYear(), 0, 1);
	var jul = new Date(this.getFullYear(), 6, 1);
	return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.isDstObserved = function () {
	return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

//takes an array of uncleaned train data and returns an array of cleaned train data
const cleanTrainData = async ((originalData: trainDataRaw[]): Promise<trainData[]> => {
	let resultingData: trainData[];

	//code for time zone of train 
	// await moment().tz(tzlookup(originalTrain.coordinates[1], originalTrain.coordinates[0])).zoneAbbr()

	originalData.forEach((originalTrain: trainDataRaw) => {
		let lastArr: Date;
		let today: Date = new Date();
		let middleTimeLetter: string;
		if (today.isDstObserved()) { 
			middleTimeLetter = "D";
		} else {
			middleTimeLetter = "S";
		}

		if (originalTrain.TrainState == "Completed") {
			let lastArr: Date = new Date(`${originalTrain.updated_at} ${await moment().tz(tzlookup(originalTrain.coordinates[1], originalTrain.coordinates[0])).zoneAbbr()}`);
		} else {
			let lastArr: null;
		}

		let resultingTrain: trainData = {
			routeName: originalTrain.RouteName, //name of the route
			trainNum: originalTrain.TrainNum, //train number
			coordinates: [originalTrain.coordinates[1], originalTrain.coordinates[0]], //coordinates in lat, lon
			lat: originalTrain.coordinates[1], //current latitude position of train
			lon: originalTrain.coordinates[0], //current longitude position of train
			heading: originalTrain.Heading, //heading of the train in N, NE, E, SE, S, etc.
			velocity: originalTrain.Velocity,
			lastValTS: new Date(`${originalTrain.LastValTS} ${await moment().tz(tzlookup(originalTrain.coordinates[1], originalTrain.coordinates[0])).zoneAbbr()}`), //Date object which train was last updated
			lastArr: lastArr, //Date object which train arrived at final destination, null if still uncompleted
			trainState: originalTrain.TrainState, //state of the train ("Predeparture", "Active", or "Completed")
			statusMsg: originalTrain.StatusMsg, //status of the train (" " if normal, "SERVICE DISRUPTION" if the obvious has happened)
			serviceDisruption: (originalTrain.statusMsg == "SERVICE DISRUPTION"), //true if a service disruption
			eventCode: originalTrain.EventCode, //upcoming or current stop
			destCode: originalTrain.DestCode, //final destination
			origCode: originalTrain.OrigCode, //origin station
			originTZ: `${originalTrain.OriginTZ}${middleTimeLetter}T`, //timezone of origin station (EST, EDT, CST, CDT, PST, or PDT)
			origSchDep: new Date(`${originalData.OrigSchDep} ${originalTrain.OriginTZ}${middleTimeLetter}T`), //scheduled original departure for train
			aliases: originalTrain.Aliases.split(','), //train numbers which also refer to this train
			updatedAt: new Date(`${originalData.updated_at} E${middleTimeLetter}T`), //the time this data was retrieved from the server
			stations: updatedStations // array of station objects
		}
	})
	resultingData.push(resultingTrain);
})

export interface trainDataRaw {
	LastValTS: string;
	EventTZ: null;
	EventT: null;
	EventDT: null;
	EventCode: string;
	DestCode: string;
	OrigCode: string;
	RouteName: string;
	TrainState: string;
	OriginTZ: string;
	OrigSchDep: string;
	Aliases: string;
	updated_at: string;
	created_at: string;
	CMSID: string;
	ID: number;
	TrainNum: string;
	Velocity: string;
	Stations: stationRaw[];
};

// Decrypt with crypto
const decrypt = (content: string, key: string) => {
	return crypto.AES.decrypt(
		crypto.lib.CipherParams.create({ ciphertext: crypto.enc.Base64.parse(content) }),
		crypto.PBKDF2(key, crypto.enc.Hex.parse(sValue), { keySize: 4, iterations: 1e3 }),
		{ iv: crypto.enc.Hex.parse(iValue) }
	).toString(crypto.enc.Utf8)
};

fetchTrainData().then((trainData) => {
	console.dir(trainData, { depth: null })
})