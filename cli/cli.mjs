#!/usr/bin/env node

import enquirer from 'enquirer';
import amtrak from '../dist/index.js';
import colors from 'colors';

const { Select } = enquirer;

let needToExit = false;
let storedTrainData = {};
let currentTrain = {};

const fetchTrainData = async () => {
  const trainData = await amtrak.fetchAllTrains();
  storedTrainData = trainData;

  setTimeout(fetchTrainData, 60000);
};

const titleText = (text) => {
  console.log(`╭─${new Array(text.length + 1).join('─')}─╮`.bold);
  console.log(`│ ${text} │`.bold);
  console.log(`╰─${new Array(text.length + 1).join('─')}─╯`.bold);
};

const toHoursAndMinutesLate = (date1, date2) => {
  if (
    date1.toString() === "Invalid Date" ||
    date2.toString() === "Invalid Date"
  ) {
    return "Unknown (Estimate Error)";
  }

  const diff = date1.valueOf() - date2.valueOf();

  if (Math.abs(diff) > 1000 * 60 * 60 * 24) return "Unknown (Schedule Error)";

  const hours = Math.floor(Math.abs(diff) / 1000 / 60 / 60);
  const minutes = Math.floor((Math.abs(diff) / 1000 / 60 / 60 - hours) * 60);

  // creating the text
  let amount = `${Math.abs(hours)}h ${Math.abs(minutes)}m`;
  if (hours === 0) amount = `${Math.abs(minutes)}m`;
  if (minutes === 0) amount = `${Math.abs(hours)}h`;

  //on time
  if (diff === 0) return "On Time";

  //late or early
  return diff > 0 ? `${amount} late` : `${amount} early`;
};

const listTrains = (trains) => {
  trains.forEach((train) => {
    const eventStation = train.stations.filter((station) => station.code === train.eventCode)[0];
    let trainStatus = eventStation.arrCmnt;


    if (trainStatus.includes('Early')) {
      trainStatus = 'Early'.brightWhite.bgBrightGreen;
    };

    if (trainStatus.includes('On Time')) {
      trainStatus = 'On Time'.brightWhite.bgBrightGreen;
    };

    if (trainStatus.includes('Late')) {
      trainStatus = 'Late'.brightWhite.bgBrightRed;
    };

    if (trainStatus.includes('NaN')) {
      trainStatus = 'No Data';
    };

    const dateFormat = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    });

    console.log('----------------')
    console.log(`${train.routeName} (${train.trainNum}) ${trainStatus}`);
    console.log(`${dateFormat.format(new Date(train.stations[0].schDep ?? train.stations[0].schArr))} - ${train.origCode} to ${train.destCode}`);
    console.log(`${toHoursAndMinutesLate(new Date(eventStation.dep), new Date(eventStation.schDep))} - ${train.velocity.toFixed(1)}mph`);
    console.log(`Next: ${eventStation.name} (${eventStation.code})`)
  })
  console.log('----------------')

  return;
};

const mainScreen = () => {
  titleText('Amtraker CLI Client');
  const selectPrompt = new Select({
    name: 'mainScreen',
    message: 'What would you like to do?',
    choices: [
      {
        name: 'View All Trains',
        value: 'viewAllTrains',
      },
      {
        name: 'View a Specific Train',
        value: 'viewTrain',
      },
      {
        name: 'View a Station\'s Trains',
        value: 'viewStation',
      },
    ],
  });

  needToExit = true;
  selectPrompt.run()
    .then((answer) => {
      console.log('answer', answer)
      needToExit = false;
      switch (answer) {
        case 'viewAllTrains':
        case 'View All Trains':
        default:
          console.log('list all trains')
          listTrains(Object.values(storedTrainData).flatMap((train) => train));
          break;
      }
    })
    .finally(() => {
      if (needToExit) process.exit();
    })
    .catch(console.error);

  console.log('end of main screen')
};

const viewTrain = (trainID) => {

};

const viewAllTrains = () => {

};

console.log('Fetching data from Amtraker, please wait...')
fetchTrainData()
  .then(() => {

    mainScreen();
  })