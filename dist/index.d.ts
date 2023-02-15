import * as AmtrakerTypes from "./types";
declare const fetchTrain: (trainId: string) => Promise<AmtrakerTypes.TrainResponse>;
declare const fetchAllTrains: () => Promise<AmtrakerTypes.TrainResponse>;
declare const fetchStation: (stationId: string) => Promise<AmtrakerTypes.StationResponse>;
declare const fetchAllStations: () => Promise<AmtrakerTypes.StationResponse>;
declare const fetchStaleStatus: () => Promise<AmtrakerTypes.StaleData>;
export { fetchTrain, fetchAllTrains, fetchStation, fetchAllStations, fetchStaleStatus, };
//# sourceMappingURL=index.d.ts.map