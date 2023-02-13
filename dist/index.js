"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllStations = exports.fetchStation = exports.fetchAllTrains = exports.fetchTrain = void 0;
const node_fetch_1 = require("node-fetch");
const fetchTrain = async (trainId) => {
    const res = await (0, node_fetch_1.default)(`https://api-v3.amtraker.com/v3/trains/${trainId}`);
    const data = await res.json();
    return data;
};
exports.fetchTrain = fetchTrain;
const fetchAllTrains = async () => {
    const res = await (0, node_fetch_1.default)("https://api-v3.amtraker.com/v3/trains");
    const data = await res.json();
    return data;
};
exports.fetchAllTrains = fetchAllTrains;
const fetchStation = async (stationId) => {
    const res = await (0, node_fetch_1.default)(`https://api-v3.amtraker.com/v3/stations/${stationId}`);
    const data = await res.json();
    return data;
};
exports.fetchStation = fetchStation;
const fetchAllStations = async () => {
    const res = await (0, node_fetch_1.default)("https://api-v3.amtraker.com/v3/stations");
    const data = await res.json();
    return data;
};
exports.fetchAllStations = fetchAllStations;
//# sourceMappingURL=index.js.map