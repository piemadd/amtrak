import { stationRaw, station, stationMin, trainDataRaw, trainData } from "../types/types";
export declare const tzConv: (threeLetter: string) => any;
export declare const cleanStationDataAPI: (originalData: station[]) => station[];
export declare const cleanTrainDataAPI: (originalData: trainData[]) => trainData[];
export declare const cleanStationDataAPIMin: (originalData: station[]) => stationMin[];
export declare const cleanStationData: (originalData: stationRaw[], originalTrainNum: number) => station[];
export declare const cleanTrainData: (originalData: trainDataRaw[]) => trainData[];
