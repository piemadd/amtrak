import { trainData } from "../types/types";
export { cleanTrainData, cleanStationData, cleanTrainDataAPI, cleanStationDataAPI, cleanStationDataMinAPI } from "../cleaning/cleaning";
export { stationRaw, station, stationMin, trainDataRaw, trainData } from "../types/types";
export declare const fetchTrain: (trainNum: number) => Promise<trainData[]>;
export declare const fetchAllTrains: () => Promise<{}>;
export declare const fetchStation: (stationCode: string) => Promise<import("../types/types").stationMin[]>;
export declare const fetchAllStations: () => Promise<{}>;
export declare const fetchTrainData: (i?: number) => Promise<trainData[]>;
//# sourceMappingURL=amtrak.d.ts.map