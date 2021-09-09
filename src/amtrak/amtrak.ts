import axios from "axios";
import * as crypto from "crypto-js";
import * as fs from 'fs';
import { stationRaw, station, trainDataRaw, trainData } from "../types/types";
import { cleanTrainData, cleanStationData } from "../cleaning/cleaning";

const dataUrl: string = 'https://maps.amtrak.com/services/MapDataService/trains/getTrainsData';
const sValue: string = '9a3686ac';
const iValue: string = 'c6eb2f7f5c4740c1a2f708fefd947d39';
const publicKey: string = '69af143c-e8cf-47f8-bf09-fc1f61e5cc33';
const masterSegment: number = 88;

export { cleanTrainData, cleanStationData } from "../cleaning/cleaning";
export { stationRaw, station, trainDataRaw, trainData } from "../types/types";

export const fetchTrainData = async (i: number = 0): Promise<trainDataRaw[]> => {
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

// Decrypt with crypto
const decrypt = (content: string, key: string) => {
	return crypto.AES.decrypt(
		crypto.lib.CipherParams.create({ ciphertext: crypto.enc.Base64.parse(content) }),
		crypto.PBKDF2(key, crypto.enc.Hex.parse(sValue), { keySize: 4, iterations: 1e3 }),
		{ iv: crypto.enc.Hex.parse(iValue) }
	).toString(crypto.enc.Utf8)
};