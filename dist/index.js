"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStaleStatus = exports.fetchAllStations = exports.fetchStation = exports.fetchAllTrains = exports.fetchTrain = void 0;
const axios_1 = require("axios");
const fetchTrain = async (trainId) => {
    return axios_1.default.get(`https://api-v3.amtraker.com/v3/trains/${trainId}`);
};
exports.fetchTrain = fetchTrain;
const fetchAllTrains = async () => {
    return axios_1.default.get("https://api-v3.amtraker.com/v3/trains");
};
exports.fetchAllTrains = fetchAllTrains;
const fetchStation = async (stationId) => {
    return axios_1.default.get(`https://api-v3.amtraker.com/v3/stations/${stationId}`);
};
exports.fetchStation = fetchStation;
const fetchAllStations = async () => {
    return axios_1.default.get("https://api-v3.amtraker.com/v3/stations");
};
exports.fetchAllStations = fetchAllStations;
const fetchStaleStatus = async () => {
    return axios_1.default.get("https://api-v3.amtraker.com/v3/stale");
};
exports.fetchStaleStatus = fetchStaleStatus;
//# sourceMappingURL=index.js.map