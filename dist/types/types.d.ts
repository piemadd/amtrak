export interface stationRaw {
    code: string;
    tz: string;
    bus: boolean;
    scharr: string;
    schdep: string;
    schmnt: string;
    autoarr: boolean;
    autodep: boolean;
    postarr?: string;
    postdep?: string;
    postcmnt?: string;
    estarr?: string;
    estdep?: string;
    estarrcmnt?: string;
    estdepcmnt?: string;
}
export interface station {
    trainNum: number;
    code: string;
    tz: string;
    bus: boolean;
    schArr: Date;
    schDep: Date;
    schMnt: string;
    autoArr: boolean;
    autoDep: boolean;
    postArr?: Date;
    postDep?: Date;
    postCmnt?: string;
    estArr?: Date;
    estDep?: Date;
    estArrCmnt?: string;
    estDepCmnt?: string;
}
export interface stationMin {
    trainNum: number;
    schArr: Date;
    schDep: Date;
    postArr?: Date;
    postDep?: Date;
    postCmnt?: string;
    estArr?: Date;
    estDep?: Date;
    estArrCmnt?: string;
    estDepCmnt?: string;
}
export interface trainDataRaw {
    coordinates: number[];
    OBJECTID: number;
    lon: number;
    lat: number;
    gx_id: number;
    ViewStn1: string;
    ViewStn2: string;
    StatusMsg: string;
    EventSchDp: string;
    EventSchAr: string;
    Heading: string;
    LastValTS: string;
    EventTZ: string;
    EventT: string;
    EventDT: string;
    EventCode: string;
    DestCode: string;
    OrigCode: string;
    RouteName: string;
    TrainState: string;
    OriginTZ: string;
    OrigSchDep: string;
    Aliases: string;
    updated_at: string;
    created_at: string;
    CMSID: string;
    ID: number;
    TrainNum: string;
    Velocity: string;
    Stations: stationRaw[];
}
export interface trainData {
    routeName: string;
    trainNum: number;
    objectID: number;
    coordinates: number[];
    lat: number;
    lon: number;
    heading: string;
    velocity: number;
    lastValTS: Date;
    trainTimeZone: string;
    lastArr: Date;
    trainState: string;
    statusMsg: string;
    serviceDisruption: boolean;
    eventCode: string;
    destCode: string;
    origCode: string;
    originTZ: string;
    origSchDep: Date;
    aliases: number[];
    updatedAt: Date;
    stations: station[];
}
