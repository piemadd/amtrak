"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanTrainData = exports.cleanStationData = exports.cleanStationDataAPIMin = exports.cleanTrainDataAPI = exports.cleanStationDataAPI = exports.tzConv = void 0;
const isDstObserved = (() => {
    let today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var daylight = new Date(`${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} EDT`);
    let diffInMilliSeconds = Math.abs(daylight.getTime() - today.getTime()) / 1000;
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    if (hours == 3) {
        return true;
    }
    else {
        return false;
    }
});
exports.tzConv = ((threeLetter) => {
    let zones = {
        'EST': 'America/New_York',
        'EDT': 'America/New_York',
        'CST': 'America/Chicago',
        'CDT': 'America/Chicago',
        'MST': 'America/Denver',
        'MDT': 'America/Denver',
        'PST': 'America/Los_Angeles',
        'PDT': 'America/Los_Angeles'
    };
    return zones[threeLetter];
});
const dateOrNull = ((date) => {
    if (date.toString() == 'Invalid Date') {
        return undefined;
    }
    else {
        return date;
    }
});
exports.cleanStationDataAPI = ((originalData) => {
    let resultingData = [];
    originalData.forEach((originalStation) => {
        let tempSchArr = originalStation.schArr;
        let tempSchDep = originalStation.schDep;
        let tempPostArr = originalStation.postArr;
        let tempPostDep = originalStation.postDep;
        let tempEstARr = originalStation.estArr;
        let estDep = originalStation.estDep;
        if ((tempSchArr != undefined) && (tempSchArr != null)) {
            tempSchArr = new Date(tempSchArr);
        }
        ;
        if ((tempSchDep != undefined) && (tempSchDep != null)) {
            tempSchDep = new Date(tempSchDep);
        }
        ;
        if ((tempPostArr != undefined) && (tempPostArr != null)) {
            tempPostArr = new Date(tempPostArr);
        }
        ;
        if ((tempPostDep != undefined) && (tempPostDep != null)) {
            tempPostDep = new Date(tempPostDep);
        }
        ;
        if ((tempEstARr != undefined) && (tempEstARr != null)) {
            tempEstARr = new Date(tempEstARr);
        }
        ;
        if ((estDep != undefined) && (estDep != null)) {
            estDep = new Date(estDep);
        }
        ;
        let stationTemp = {
            trainNum: originalStation.trainNum,
            code: originalStation.code,
            tz: originalStation.tz,
            bus: originalStation.bus,
            schArr: tempSchArr,
            schDep: tempSchDep,
            schMnt: originalStation.schMnt,
            autoArr: originalStation.autoArr,
            autoDep: originalStation.autoDep,
            postArr: tempPostArr,
            postDep: tempPostDep,
            postCmnt: originalStation.postCmnt,
            estArr: tempEstARr,
            estDep: estDep,
            estArrCmnt: originalStation.estArrCmnt,
            estDepCmnt: originalStation.estDepCmnt,
        };
        resultingData.push(stationTemp);
    });
    return resultingData;
});
exports.cleanTrainDataAPI = ((originalData) => {
    let finalTrains = [];
    originalData.forEach((originalTrain) => {
        let trainDataTemp = {
            routeName: originalTrain.routeName,
            trainNum: originalTrain.trainNum,
            coordinates: originalTrain.coordinates,
            lat: originalTrain.lat,
            lon: originalTrain.lon,
            heading: originalTrain.heading,
            velocity: originalTrain.velocity,
            lastValTS: new Date(originalTrain.lastValTS),
            trainTimeZone: originalTrain.trainTimeZone,
            lastArr: new Date(originalTrain.lastArr),
            trainState: originalTrain.trainState,
            statusMsg: originalTrain.statusMsg,
            serviceDisruption: originalTrain.serviceDisruption,
            eventCode: originalTrain.eventCode,
            destCode: originalTrain.destCode,
            origCode: originalTrain.origCode,
            originTZ: originalTrain.originTZ,
            origSchDep: new Date(originalTrain.origSchDep),
            aliases: originalTrain.aliases,
            updatedAt: new Date(originalTrain.updatedAt),
            stations: (0, exports.cleanStationDataAPI)(originalTrain.stations),
        };
        finalTrains.push(trainDataTemp);
    });
    return finalTrains;
});
exports.cleanStationDataAPIMin = ((originalData) => {
    let resultingData = [];
    originalData.forEach((originalStation) => {
        let tempSchArr = originalStation.schArr;
        let tempSchDep = originalStation.schDep;
        let tempPostArr = originalStation.postArr;
        let tempPostDep = originalStation.postDep;
        let tempEstARr = originalStation.estArr;
        let estDep = originalStation.estDep;
        if ((tempSchArr != undefined) && (tempSchArr != null)) {
            tempSchArr = new Date(tempSchArr);
        }
        ;
        if ((tempSchDep != undefined) && (tempSchDep != null)) {
            tempSchDep = new Date(tempSchDep);
        }
        ;
        if ((tempPostArr != undefined) && (tempPostArr != null)) {
            tempPostArr = new Date(tempPostArr);
        }
        ;
        if ((tempPostDep != undefined) && (tempPostDep != null)) {
            tempPostDep = new Date(tempPostDep);
        }
        ;
        if ((tempEstARr != undefined) && (tempEstARr != null)) {
            tempEstARr = new Date(tempEstARr);
        }
        ;
        if ((estDep != undefined) && (estDep != null)) {
            estDep = new Date(estDep);
        }
        ;
        let stationTemp = {
            trainNum: originalStation.trainNum,
            schArr: tempSchArr,
            schDep: tempSchDep,
            postArr: tempPostArr,
            postDep: tempPostDep,
            postCmnt: originalStation.postCmnt,
            estArr: tempEstARr,
            estDep: estDep,
            estArrCmnt: originalStation.estArrCmnt,
            estDepCmnt: originalStation.estDepCmnt,
        };
        resultingData.push(stationTemp);
    });
    return resultingData;
});
exports.cleanStationData = ((originalData, originalTrainNum) => {
    let resultingData = [];
    originalData.forEach((originalStation) => {
        let middleTimeLetter;
        if (isDstObserved()) {
            middleTimeLetter = "D";
        }
        else {
            middleTimeLetter = "S";
        }
        let stationTimeZone = `${originalStation.tz}${middleTimeLetter}T`;
        let resultingStation = {
            trainNum: originalTrainNum,
            code: originalStation.code,
            tz: stationTimeZone,
            bus: originalStation.bus,
            schArr: dateOrNull(new Date(`${originalStation.scharr} ${stationTimeZone}`)),
            schDep: dateOrNull(new Date(`${originalStation.schdep} ${stationTimeZone}`)),
            schMnt: originalStation.schmnt,
            autoArr: originalStation.autoarr,
            autoDep: originalStation.autodep,
            postArr: dateOrNull(new Date(`${originalStation.postarr} ${stationTimeZone}`)),
            postDep: dateOrNull(new Date(`${originalStation.postdep} ${stationTimeZone}`)),
            postCmnt: originalStation.postcmnt,
            estArr: dateOrNull(new Date(`${originalStation.estarr} ${stationTimeZone}`)),
            estDep: dateOrNull(new Date(`${originalStation.estdep} ${stationTimeZone}`)),
            estArrCmnt: originalStation.estarrcmnt,
            estDepCmnt: originalStation.estdepcmnt,
        };
        resultingData.push(resultingStation);
    });
    return resultingData;
});
exports.cleanTrainData = ((originalData) => {
    let resultingData = [];
    originalData.forEach((originalTrain) => {
        let lastArrTime;
        let today = new Date();
        let middleTimeLetter;
        let listOfAliases = [];
        if (isDstObserved()) {
            middleTimeLetter = "D";
        }
        else {
            middleTimeLetter = "S";
        }
        let trainTimeZone;
        if (originalTrain.Aliases != null) {
            originalTrain.Aliases.split(',').forEach((alias) => {
                listOfAliases.push(parseInt(alias));
            });
        }
        if (originalTrain.TrainState == "Completed" && originalTrain.ViewStn1 != null && originalTrain.ViewStn2 != null) {
            switch (Math.abs(parseInt(originalTrain.ViewStn1.substring(originalTrain.ViewStn1.indexOf(' ') + 1, originalTrain.ViewStn1.indexOf(':'))) - parseInt(originalTrain.ViewStn2.substring(originalTrain.ViewStn2.indexOf(' ') + 1, originalTrain.ViewStn2.indexOf(':'))))) {
                case 0: {
                    trainTimeZone = `E${middleTimeLetter}T`;
                    break;
                }
                case 1: {
                    trainTimeZone = `C${middleTimeLetter}T`;
                    break;
                }
                case 2: {
                    trainTimeZone = `M${middleTimeLetter}T`;
                    break;
                }
                case 3: {
                    trainTimeZone = `P${middleTimeLetter}T`;
                    break;
                }
                case 9: {
                    trainTimeZone = `P${middleTimeLetter}T`;
                    break;
                }
                case 10: {
                    trainTimeZone = `M${middleTimeLetter}T`;
                    break;
                }
                case 11: {
                    trainTimeZone = `C${middleTimeLetter}T`;
                    break;
                }
            }
            let lastArrTime = dateOrNull((`${originalTrain.updated_at} ${trainTimeZone}`));
        }
        else {
            let lastArrTime;
            switch (Math.abs(parseInt(originalTrain.updated_at.substring(originalTrain.updated_at.indexOf(' ') + 1, originalTrain.updated_at.indexOf(':'))) - parseInt(originalTrain.updated_at.substring(originalTrain.LastValTS.indexOf(' ') + 1, originalTrain.LastValTS.indexOf(':'))))) {
                case 0: {
                    trainTimeZone = `E${middleTimeLetter}T`;
                    break;
                }
                case 1: {
                    trainTimeZone = `C${middleTimeLetter}T`;
                    break;
                }
                case 2: {
                    trainTimeZone = `M${middleTimeLetter}T`;
                    break;
                }
                case 3: {
                    trainTimeZone = `P${middleTimeLetter}T`;
                    break;
                }
                case 9: {
                    trainTimeZone = `P${middleTimeLetter}T`;
                    break;
                }
                case 10: {
                    trainTimeZone = `M${middleTimeLetter}T`;
                    break;
                }
                case 11: {
                    trainTimeZone = `C${middleTimeLetter}T`;
                    break;
                }
            }
        }
        let resultingTrain = {
            routeName: originalTrain.RouteName,
            trainNum: parseInt(originalTrain.TrainNum),
            coordinates: [originalTrain.coordinates[1], originalTrain.coordinates[0]],
            lat: originalTrain.coordinates[1],
            lon: originalTrain.coordinates[0],
            heading: originalTrain.Heading,
            velocity: parseFloat(originalTrain.Velocity),
            lastValTS: dateOrNull(new Date(`${originalTrain.LastValTS} ${trainTimeZone}`)),
            trainTimeZone: trainTimeZone,
            lastArr: lastArrTime,
            trainState: originalTrain.TrainState,
            statusMsg: originalTrain.StatusMsg,
            serviceDisruption: (originalTrain.StatusMsg == "SERVICE DISRUPTION"),
            eventCode: originalTrain.EventCode,
            destCode: originalTrain.DestCode,
            origCode: originalTrain.OrigCode,
            originTZ: `${originalTrain.OriginTZ}${middleTimeLetter}T`,
            origSchDep: dateOrNull(new Date(`${originalTrain.OrigSchDep} ${originalTrain.OriginTZ}${middleTimeLetter}T`)),
            aliases: listOfAliases,
            updatedAt: dateOrNull(new Date(`${originalTrain.updated_at} E${middleTimeLetter}T`)),
            stations: (0, exports.cleanStationData)(originalTrain.Stations, parseInt(originalTrain.TrainNum))
        };
        resultingData.push(resultingTrain);
    });
    return resultingData;
});
//# sourceMappingURL=cleaning.js.map