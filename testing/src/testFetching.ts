import { fetchTrainData } from 'amtrak';

fetchTrainData().then((trainData) => {
	let cleanedData = cleanTrainData(trainData);
	let dataToWrite = JSON.stringify(cleanedData);
	if (dataToWrite != null) {
		console.log("Data Fetching Pass!")
	}
})