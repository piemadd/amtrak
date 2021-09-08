//WHY IS EVERYTHING A STRING
//ISO 8601 MY ASS
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
	code: string; //code of station
	tz: string; //timezone of station (EST, EDT, CST, CDT, PST, or PDT)
	bus: boolean; //true if bus at stop
	schArr: Date; //scheduled arrival at station
	schDep: Date; //scheduled departure from station
	schMnt: string; //variable from amtrak, not sure use of but could be related to any maintnence the train will go through at this station
	autoArr: boolean; //has the train arrived at this station already?
	autoDep: boolean; //has the train departed from this station already?
	postArr?: Date; //actual arrival at station
	postDep?: Date; //actual departure from station
	postCmnt?: string; //how late it departed in english
	estArr?: Date; //estimated arrival at station
	estDep?: Date; //estimated departure from station
	estArrCmnt?: string; //how early/late train will be in english
	estDepCmnt?: string; //how early/late train will be in english
}

export interface trainDataRaw { //DONT USE THIS FOR GOD'S SAKE
	coordinates: number[]; //coordinates in lat, lon
	OBJECTID: number;
	lon: number;
	lat: number;
	gx_id: number;
	ViewStn1: string; //always eastern
	ViewStn2: string; //train tz
	StatusMsg: string;
	EventSchDp: string;
	EventSchAr: string;
	Heading: string;
	LastValTS: string; //position tz
	EventTZ: string;
	EventT: string;
	EventDT: string;
	EventCode: string;
	DestCode: string;
	OrigCode: string;
	RouteName: string;
	TrainState: string;
	OriginTZ: string;
	OrigSchDep: string; //origin tz
	Aliases: string;
	updated_at: string;
	created_at: string;
	CMSID: string;
	ID: number;
	TrainNum: string;
	Velocity: string;
	Stations: stationRaw[];
};

export interface trainData {
	routeName: string; //name of the route
	trainNum: number; //train number
	coordinates: number[]; //coordinates in lat, lon
	lat: number; //current latitude position of train
	lon: number; //current longitude position of train
	heading: string; //heading of the train in N, NE, E, SE, S, etc.
	velocity: number;
	lastValTS: Date; //Date object which train was last updated
	lastArr: Date; //Date object which train arrived at final destination, null if still uncompleted
	trainState: string; //state of the train ("Predeparture", "Active", or "Completed")
	statusMsg: string; //status of the train (" " if normal, "SERVICE DISRUPTION" if the obvious has happened)
	serviceDisruption: boolean; //true if a service disruption
	eventCode: string; //upcoming or current stop
	destCode: string; //final destination
	origCode: string; //origin station
	originTZ: string; //timezone of origin station (EST, EDT, CST, CDT, PST, or PDT)
	origSchDep: Date; //scheduled original departure for train
	aliases: number[]; //train numbers which also refer to this train
	updatedAt: Date; //the time this data was retrieved from the server
	stations: station[]; //
};