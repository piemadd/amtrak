#!/usr/bin/env node

const axios = require('axios');
const c = require('ansi-colors');
const { Select, Input } = require('enquirer');

const argv = require('minimist')(process.argv.splice(2), opts = {
    alias: {
    'n': 'num',
    'i': 'id',
    'd': 'date'
    }
});

const elongatedTimeZones = {
    'PDT': 'America/Los_Angeles',
    'PST': 'America/Los_Angeles',
    'MDT': 'America/Denver',
    'MST': 'America/Denver',
    'CDT': 'America/Chicago',
    'CST': 'America/Chicago',
    'EDT': 'America/New_York',
    'EST': 'America/New_York'
}

const argsList = Object.keys(argv);

let trainNum = argv['num'];
let trainDate = argv['date'];
let trainObjectID = argv['id'];

//declarative programming is (kinda) for nerds lol
(async () => {
    if (trainObjectID != undefined) {
        let trainIDsRaw = await axios.get('https://api.amtraker.com/v1/trains/ids');
        let trainIDs = trainIDsRaw.data;

        trainNum = trainIDs[trainObjectID];

        let dataRaw = await axios.get(`https://api.amtraker.com/v1/trains/${trainNum}`);
        let data = dataRaw.data;

        for (let i = 0; i < data.length; i++) {
            if (data[i].objectID == trainObjectID) {
                printTrain(data[i])
            }
        }
    } else {
        if (trainNum == undefined) {
            let trainNamesRaw = await axios.get('https://api.amtraker.com/v1/trains/keys')
            let trainNames = trainNamesRaw.data;
            let trainNamesFormatted = Object.keys(trainNames).map((trainNum) => {return `${trainNum} - ${trainNames[trainNum]}`})

            //console.log(trainNamesFormatted)
            
            let trainNumInput = await new Select({
                name: '',
                message: 'What is your train\'s number? (Use your arrow keys to scroll)',
                choices: trainNamesFormatted,
                limit: 20
            }).run()

            trainNum = parseInt(trainNumInput.split(' - ')[0]);
        }

        if (trainDate == undefined) {
            let trainDateInput = await new Input({
                name: '',
                message: 'What day of the month did your train begin?'
            }).run()

            trainDate = parseInt(trainDateInput)
        }

        let dataRaw = await axios.get(`https://api.amtraker.com/v1/trains/${trainNum}`);
        let data = dataRaw.data;

        for (let i = 0; i < data.length; i++) {
            if (new Date(data[i].origSchDep).getDate() == trainDate) {
                printTrain(data[i])
            }
        }   
    }
})();

const printTrain = ((train) => {
    let stationCodes = [];
    let stations = {};

    let timeOptions = {
        timeZone: 'EST',
        hour: 'numeric',
        minute: 'numeric'
    }

    for (let i = 0; i < train.stations.length; i++) {
        let station = train.stations[i];
        stations[station.code] = station;
        stationCodes.push(station.code);
    }

    console.log(`${c.cyan(`Train ${train.trainNum}`)} - ${c.yellow(`The ${train.routeName}`)}${c.cyan(':')}`);
    console.log(c.blue(`(${stations[train.origCode].stationName} [${c.yellow(train.origCode)}] => ${stations[train.destCode].stationName} [${c.yellow(train.destCode)}])`));
    
    console.log('')

    const directions = {
        'N': 'North',
        'NE': 'NorthEast',
        'E': 'East',
        'SE': 'SouthEast',
        'S': 'South',
        'SW': 'SouthWest',
        'W': 'West',
        'NW': 'NorthWest'
    }

    timeOptions['timeZone'] = elongatedTimeZones[train.trainTimeZone]
    let timeUpdated = `${new Date(train.lastValTS).toLocaleString([], timeOptions)} ${c.yellow(timeOptions['timeZone'])}`
    
    console.log(`${c.cyan('Velocity:')} ${c.blue(`${train.velocity.toFixed(2)} MPH`)} ${c.yellow(directions[train.heading])}`)
    console.log(`${c.cyan('Position:')} ${c.blue(`[${c.yellow(`${train.coordinates[0]}, ${train.coordinates[1]}`)}]`)}`)
    console.log(`${c.cyan(`Last Updated:`)} ${c.blue(timeUpdated)}`)
    
    console.log('')
    
    console.log(`${c.cyan('Next Stop:')} ${c.blue(`${stations[train.eventCode].stationName} [${c.yellow(train.eventCode)}]`)}`)

    timeOptions['timeZone'] = elongatedTimeZones[stations[train.eventCode].tz]
    let estArr = `${new Date(stations[train.eventCode].estArr).toLocaleString([], timeOptions)} ${c.yellow(timeOptions['timeZone'])}`
    
    console.log(`${c.cyan(`Est. Arrival:`)} ${c.blue(estArr)}`)
    
    let timeInfo = '';
    switch (train.trainTimely) {
        case 'On Time':
            timeInfo = c.green(train.trainTimely)
            break;
        case 'Late':
            timeInfo = c.red(train.trainTimely)
            break;
        case 'Early':
            timeInfo = c.blue(train.trainTimely)
            break;
        default:
            timeInfo = 'No Data'
    }
    console.log(`${c.cyan('On Time State:')} ${timeInfo}`)
    
})

//stations[train.eventCode].stationName
//stations[train.eventCode].stationName
//c.yellow(train.eventCode)