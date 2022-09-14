"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTrainData = exports.fetchAllStations = exports.fetchStation = exports.fetchAllTrainsNear = exports.fetchAllTrains = exports.fetchTrain = exports.tzConv = exports.cleanStationDataAPI = exports.cleanTrainDataAPI = exports.cleanStationData = exports.cleanTrainData = void 0;
const axios_1 = require("axios");
const crypto = require("crypto-js");
const cleaning_1 = require("../cleaning/cleaning");
const haversine = require('haversine-distance');
const dataUrl = 'https://maps.amtrak.com/services/MapDataService/trains/getTrainsData';
const sValue = '9a3686ac';
const iValue = 'c6eb2f7f5c4740c1a2f708fefd947d39';
const publicKey = '69af143c-e8cf-47f8-bf09-fc1f61e5cc33';
const masterSegment = 88;
var cleaning_2 = require("../cleaning/cleaning");
Object.defineProperty(exports, "cleanTrainData", { enumerable: true, get: function () { return cleaning_2.cleanTrainData; } });
Object.defineProperty(exports, "cleanStationData", { enumerable: true, get: function () { return cleaning_2.cleanStationData; } });
Object.defineProperty(exports, "cleanTrainDataAPI", { enumerable: true, get: function () { return cleaning_2.cleanTrainDataAPI; } });
Object.defineProperty(exports, "cleanStationDataAPI", { enumerable: true, get: function () { return cleaning_2.cleanStationDataAPI; } });
Object.defineProperty(exports, "tzConv", { enumerable: true, get: function () { return cleaning_2.tzConv; } });
exports.fetchTrain = (async (trainNum) => {
    const dataRaw = await axios_1.default.get(`https://api.amtraker.com/v1/trains/${trainNum.toString()}`);
    let originalData = await dataRaw.data;
    return originalData;
});
exports.fetchAllTrains = (async () => {
    const dataRaw = await axios_1.default.get(`https://api.amtraker.com/v1/trains`);
    let originalData = await dataRaw.data;
    return originalData;
});
exports.fetchAllTrainsNear = (async (targetLocation, kilometers) => {
    const allTrains = Object.freeze((await (0, exports.fetchAllTrains)()));
    const allTrainsNear = {};
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
exports.fetchStation = (async (stationCode) => {
    const dataRaw = await axios_1.default.get(`https://api.amtraker.com/v1/stations/${stationCode}`);
    let originalData = await dataRaw.data;
    let finalStation = await (0, cleaning_1.cleanStationDataAPI)(originalData);
    return finalStation;
});
exports.fetchAllStations = (async () => {
    const dataRaw = await axios_1.default.get(`https://api.amtraker.com/v1/stations`);
    let originalData = await dataRaw.data;
    let finalStations = Object.fromEntries(await Promise.all(Object.entries(originalData).map(async ([stationCode, station]) => {
        return [stationCode, await (0, cleaning_1.cleanStationDataAPI)(station)];
    })));
    return finalStations;
});
const fetchTrainData = async (i = 0) => {
    if (i > 3)
        throw Error('Issue');
    try {
        const { data } = await axios_1.default.get(dataUrl);
        const mainContent = data.substring(0, data.length - masterSegment);
        const encryptedPrivateKey = data.substr(data.length - masterSegment, data.length);
        const privateKey = decrypt(encryptedPrivateKey, publicKey).split('|')[0];
        const { features: parsed } = JSON.parse(decrypt(mainContent, privateKey));
        return (0, cleaning_1.cleanTrainData)(parsed.map(({ geometry, properties }) => {
            const tempTrainData = {
                coordinates: geometry.coordinates
            };
            const filteredKeys = Object.keys(properties).filter((key) => key.startsWith('Station') && properties[key] != null);
            const sortedKeys = filteredKeys.sort((a, b) => parseInt(a.replace('Station', '')) - parseInt(b.replace('Station', '')));
            tempTrainData.Stations = sortedKeys.map((key) => JSON.parse(properties[key]));
            Object.keys(properties).forEach((key) => {
                if (!key.startsWith('Station') && !tempTrainData.hasOwnProperty(key))
                    tempTrainData[key] = properties[key];
            });
            return tempTrainData;
        }));
    }
    catch (e) {
        console.log(e);
        return await (0, exports.fetchTrainData)(i + 1);
    }
};
exports.fetchTrainData = fetchTrainData;
const decrypt = (content, key) => {
    return crypto.AES.decrypt(crypto.lib.CipherParams.create({ ciphertext: crypto.enc.Base64.parse(content) }), crypto.PBKDF2(key, crypto.enc.Hex.parse(sValue), { keySize: 4, iterations: 1e3 }), { iv: crypto.enc.Hex.parse(iValue) }).toString(crypto.enc.Utf8);
};
