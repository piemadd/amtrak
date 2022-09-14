import { station, trainData, LatLng } from "../types/types";
export { cleanTrainData, cleanStationData, cleanTrainDataAPI, cleanStationDataAPI, tzConv } from "../cleaning/cleaning";
export { stationRaw, station, stationMin, trainDataRaw, trainData } from "../types/types";
export declare const fetchTrain: (trainNum: number) => Promise<trainData[]>;
export declare const fetchAllTrains: () => Promise<trainData[]>;
export declare const fetchAllTrainsNear: (targetLocation: LatLng, kilometers: number) => Promise<{
    [key: string]: trainData[];
}>;
export declare const fetchStation: (stationCode: string) => Promise<station[]>;
export declare const fetchAllStations: () => Promise<any>;
export declare const fetchTrainData: (i?: number) => Promise<trainData[]>;
