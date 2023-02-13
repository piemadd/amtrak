export interface Train {
    routeName: string;
    trainNum: number;
    trainID: string;
    lat: number;
    lon: number;
    trainTimely: string;
    stations: Station[];
    heading: Heading;
    eventCode: string;
    eventTZ: string[];
    eventName: string;
    origCode: string;
    originTZ: string[];
    origName: string;
    destCode: string;
    destTZ: string[];
    destName: string;
    trainState: TrainState;
    velocity: number;
    statusMsg: string;
    createdAt: string;
    updatedAt: string;
    lastValTS: string;
    objectID: number;
}
export declare enum Heading {
    N = "North",
    NE = "Northeast",
    NW = "Northwest",
    S = "South",
    SE = "Southeast",
    SW = "Southwest",
    E = "East",
    W = "West"
}
export declare enum TrainState {
    Active = "Active",
    Predeparture = "Predeparture"
}
export interface Station {
    name: string;
    code: string;
    tz: string;
    bus: boolean;
    schArr: string;
    schDep: string;
    arr: string;
    dep: string;
    arrCmnt: string;
    depCmnt: string;
    status: StationStatus;
}
export interface StationMeta {
    name: string;
    code: string;
    tz: string;
    lat: number;
    lon: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    trains: string[];
}
export declare enum StationStatus {
    Enroute = "Enroute",
    Station = "Station",
    Departed = "Departed",
    Unknown = "Unknown"
}
export interface TrainResponse {
    [key: string]: Train[];
}
export interface StationResponse {
    [key: string]: StationMeta;
}
export interface StaleData {
    avgLastUpdate: number;
    activeTrains: number;
    stale: boolean;
}
//# sourceMappingURL=types.d.ts.map