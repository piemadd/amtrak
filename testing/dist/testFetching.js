"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amtrak_1 = require("amtrak");
(0, amtrak_1.fetchTrainData)().then((trainData) => {
    let cleanedData = cleanTrainData(trainData);
    let dataToWrite = JSON.stringify(cleanedData);
    if (dataToWrite != null) {
        console.log("Data Fetching Pass!");
    }
});
