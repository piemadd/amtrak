import axios from "axios";
import * as crypto from "crypto-js";
import * as fs from 'fs';
import { stationRaw, station, trainDataRaw, trainData, LatLng } from "../types/types";
import { cleanTrainData, cleanStationData, cleanTrainDataAPI, cleanStationDataAPI } from "../cleaning/cleaning";
const haversine = require('haversine-distance')

const dataUrl: string = 'https://maps.amtrak.com/services/MapDataService/trains/getTrainsData';
const sValue: string = '9a3686ac';
const iValue: string = 'c6eb2f7f5c4740c1a2f708fefd947d39';
const publicKey: string = '69af143c-e8cf-47f8-bf09-fc1f61e5cc33';
const masterSegment: number = 88;

export { cleanTrainData, cleanStationData, cleanTrainDataAPI, cleanStationDataAPI, tzConv } from "../cleaning/cleaning";
export { stationRaw, station, stationMin, trainDataRaw, trainData } from "../types/types";

export const fetchTrain = (async (trainNum: number) => {
	const dataRaw = await axios.get(`https://api.amtraker.com/v1/trains/${trainNum.toString()}`);
	let originalData: trainData[] = await dataRaw.data;

	return originalData;
});

export const fetchAllTrains = (async () => {
	const dataRaw = await axios.get(`https://api.amtraker.com/v1/trains`);
	let originalData: trainData[] = await dataRaw.data;
	return originalData;
});

export const fetchAllTrainsNear = (async (
  targetLocation : LatLng,
  kilometers: number
) => {
  // TODO: Replace this with whatever type replaces trainData[] in fetchAllTrains()
  // See https://github.com/piemadd/amtrak/pull/5
  type AllTrainsData = { [key: string]: trainData[] };
  
  const allTrains: AllTrainsData = Object.freeze((await fetchAllTrains()) as any);
  const allTrainsNear: AllTrainsData = {};

  for (const trainNum of Object.keys(allTrains)) {
    const trainNumData = allTrains[trainNum].filter((x) => {
      const trainLocation = {
        latitude: x.coordinates[0],
        longitude: x.coordinates[1],
      };
      return haversine(targetLocation, trainLocation) / 1000 <= kilometers;
    });

    if (trainNumData.length) {
      allTrainsNear[trainNum] = trainNumData;
    }
  }

  return allTrainsNear;
});

export const fetchStation = (async (stationCode: string) => {
	const dataRaw = await axios.get(`https://api.amtraker.com/v1/stations/${stationCode}`);
	let originalData: station[] = await dataRaw.data;

	let finalStation = await cleanStationDataAPI(originalData);

	return finalStation;
});

export const fetchAllStations = (async () => {
	const dataRaw = await axios.get(`https://api.amtraker.com/v1/stations`);
	let originalData = await dataRaw.data;

	let finalStations = Object.fromEntries(await Promise.all(Object.entries(originalData).map(async ([stationCode, station]) => {
		// @ts-ignore
		return [stationCode, await cleanStationDataAPI(station)]
	})));

	return finalStations;
});

//whoopsies forgot to increment i and this bug has existed forever
export const fetchTrainData = async (i: number = 0): Promise<trainData[]> => {
	if (i > 3) throw Error('Issue');
	try {
		const { data } = await axios.get(dataUrl);
		// Parse Data
		const mainContent = data.substring(0, data.length - masterSegment);
		const encryptedPrivateKey = data.substr(data.length - masterSegment, data.length);
		const privateKey = decrypt(encryptedPrivateKey, publicKey).split('|')[0]
		const { features:parsed } = JSON.parse(decrypt(mainContent, privateKey));

		return cleanTrainData(parsed.map(({ geometry, properties }: any) => {
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
		}));
	} catch (e) {
        console.log(e)
		return await fetchTrainData(i + 1);
	}
}

// Decrypt with crypto
const decrypt = (content: string, key: string) => {
	return crypto.AES.decrypt(
		crypto.lib.CipherParams.create({ ciphertext: crypto.enc.Base64.parse(content) }),
		crypto.PBKDF2(key, crypto.enc.Hex.parse(sValue), { keySize: 4, iterations: 1e3 }),
		{ iv: crypto.enc.Hex.parse(iValue) }
	).toString(crypto.enc.Utf8)
};

//fetchTrainData();