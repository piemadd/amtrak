"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationStatus = exports.TrainState = exports.Heading = void 0;
var Heading;
(function (Heading) {
    Heading["N"] = "North";
    Heading["NE"] = "Northeast";
    Heading["NW"] = "Northwest";
    Heading["S"] = "South";
    Heading["SE"] = "Southeast";
    Heading["SW"] = "Southwest";
    Heading["E"] = "East";
    Heading["W"] = "West";
})(Heading = exports.Heading || (exports.Heading = {}));
var TrainState;
(function (TrainState) {
    TrainState["Active"] = "Active";
    TrainState["Predeparture"] = "Predeparture";
})(TrainState = exports.TrainState || (exports.TrainState = {}));
var StationStatus;
(function (StationStatus) {
    StationStatus["Enroute"] = "Enroute";
    StationStatus["Station"] = "Station";
    StationStatus["Departed"] = "Departed";
    StationStatus["Unknown"] = "Unknown";
})(StationStatus = exports.StationStatus || (exports.StationStatus = {}));
;
//# sourceMappingURL=types.js.map