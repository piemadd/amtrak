import { Train, StationMeta, TrainResponse, StationResponse } from "./types";
declare const fetchTrain: (trainId: string) => Promise<Train>;
declare const fetchAllTrains: () => Promise<TrainResponse>;
declare const fetchStation: (stationId: string) => Promise<StationMeta>;
declare const fetchAllStations: () => Promise<StationResponse>;
export { fetchTrain, fetchAllTrains, fetchStation, fetchAllStations };
//# sourceMappingURL=index.d.ts.map