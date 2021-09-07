"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const crypto = require("crypto-js");
const moment = require("moment-timezone");
const dataUrl = 'https://maps.amtrak.com/services/MapDataService/trains/getTrainsData';
const sValue = '9a3686ac';
const iValue = 'c6eb2f7f5c4740c1a2f708fefd947d39';
const publicKey = '69af143c-e8cf-47f8-bf09-fc1f61e5cc33';
const masterSegment = 88;
const fetchTrainData = async (i = 0) => {
    if (i > 3)
        throw Error('Issue');
    try {
        const { data } = await axios_1.default.get(dataUrl);
        const mainContent = data.substring(0, data.length - masterSegment);
        const encryptedPrivateKey = data.substr(data.length - masterSegment, data.length);
        const privateKey = decrypt(encryptedPrivateKey, publicKey).split('|')[0];
        const { features: parsed } = JSON.parse(decrypt(mainContent, privateKey));
        return parsed.map(({ geometry, properties }) => {
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
        });
    }
    catch (e) {
        return await fetchTrainData();
    }
};
Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};
Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
};
const cleanTrainData = async((originalData) => {
    let resultingData;
    originalData.forEach((originalTrain) => {
        let lastArr;
        let today = new Date();
        let middleTimeLetter;
        if (today.isDstObserved()) {
            middleTimeLetter = "D";
        }
        else {
            middleTimeLetter = "S";
        }
        if (originalTrain.TrainState == "Completed") {
            let lastArr = new Date(`${originalTrain.updated_at} ${await moment().tz(tzlookup(originalTrain.coordinates[1], originalTrain.coordinates[0])).zoneAbbr()}`);
        }
        else {
            let lastArr;
        }
        let resultingTrain = {
            routeName: originalTrain.RouteName,
            trainNum: originalTrain.TrainNum,
            coordinates: [originalTrain.coordinates[1], originalTrain.coordinates[0]],
            lat: originalTrain.coordinates[1],
            lon: originalTrain.coordinates[0],
            heading: originalTrain.Heading,
            velocity: originalTrain.Velocity,
            lastValTS: new Date(`${originalTrain.LastValTS} ${await moment().tz(tzlookup(originalTrain.coordinates[1], originalTrain.coordinates[0])).zoneAbbr()}`),
            lastArr: lastArr,
            trainState: originalTrain.TrainState,
            statusMsg: originalTrain.StatusMsg,
            serviceDisruption: (originalTrain.statusMsg == "SERVICE DISRUPTION"),
            eventCode: originalTrain.EventCode,
            destCode: originalTrain.DestCode,
            origCode: originalTrain.OrigCode,
            originTZ: `${original.OriginTZ}${middleTimeLetter}T`,
            origSchDep: new Date(`${originalData.OrigSchDep} ${original.OriginTZ}${middleTimeLetter}T`),
            aliases: originalTrain.Aliases.split(','),
            updatedAt: new Date(`${originalData.updated_at} E${middleTimeLetter}T`),
            stations: updatedStations
        };
    });
});
;
const decrypt = (content, key) => {
    return crypto.AES.decrypt(crypto.lib.CipherParams.create({ ciphertext: crypto.enc.Base64.parse(content) }), crypto.PBKDF2(key, crypto.enc.Hex.parse(sValue), { keySize: 4, iterations: 1e3 }), { iv: crypto.enc.Hex.parse(iValue) }).toString(crypto.enc.Utf8);
};
fetchTrainData().then((trainData) => {
    console.dir(trainData, { depth: null });
});
//# sourceMappingURL=index.js.map