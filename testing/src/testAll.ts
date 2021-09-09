import { fetchTrainData, cleanTrainData } from 'amtrak';

fetchTrainData().then((trainData) => {
	let dataToWrite = JSON.stringify(trainData);
	if (dataToWrite != null) {
		console.log(dataToWrite);
		console.log("Data Fetching Pass!");
	}
})