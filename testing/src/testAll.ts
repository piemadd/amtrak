import { fetchTrainData, cleanTrainData, fetchAllStations } from 'amtrak';

fetchTrainData().then((trainData) => {
	let dataToWrite = JSON.stringify(trainData);
	if (dataToWrite != null) {
		console.log("Data Fetching Pass!");
	}
})

fetchAllStations().then((stuff) => {
	console.log("done lol")
})