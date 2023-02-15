"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStaleStatus = exports.fetchAllStations = exports.fetchStation = exports.fetchAllTrains = exports.fetchTrain = void 0;
const axios_1 = require("axios");
const fetchTrain = async (trainId) => {
    const res = await axios_1.default.get(`https://api-v3.amtraker.com/v3/trains/${trainId}`);
    return res.data;
};
exports.fetchTrain = fetchTrain;
const fetchAllTrains = async () => {
    const res = await axios_1.default.get("https://api-v3.amtraker.com/v3/trains");
    return res.data;
};
exports.fetchAllTrains = fetchAllTrains;
const fetchStation = async (stationId) => {
    const res = await axios_1.default.get(`https://api-v3.amtraker.com/v3/stations/${stationId}`);
    return res.data;
};
exports.fetchStation = fetchStation;
const fetchAllStations = async () => {
    const res = await axios_1.default.get("https://api-v3.amtraker.com/v3/stations");
    return res.data;
};
exports.fetchAllStations = fetchAllStations;
const fetchStaleStatus = async () => {
    const res = await axios_1.default.get("https://api-v3.amtraker.com/v3/stale");
    return res.data;
};
exports.fetchStaleStatus = fetchStaleStatus;
//# sourceMappingURL=index.js.map