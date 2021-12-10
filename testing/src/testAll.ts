import { fetchTrainData, cleanTrainData, fetchAllStations } from 'amtrak';

fetchTrainData().then((trainData) => {
	let dataToWrite = JSON.stringify(trainData);
	if (dataToWrite != null) {
		console.log("Data Fetching Pass!");
	}
})

fetchTrainData(1).then((trainData) => {
	console.log(trainData[0])
})

fetchAllStations().then((stuff) => {
	console.log("done lol")
})