const fetch = require('node-fetch');
const CryptoJS = require("crypto-js");

const dataUrl = 'https://maps.amtrak.com/services/MapDataService/trains/getTrainsData';
const sValue = '9a3686ac';
const iValue = 'c6eb2f7f5c4740c1a2f708fefd947d39';
const publicKey = '69af143c-e8cf-47f8-bf09-fc1f61e5cc33';
const masterSegment = 88;

function fetchTrainData() {
	var resulting_not_valid_json = true; //sometimes the amtrak api just fucking dies and generally within 1 or 2 more tries you get actual content, so yeah

	//Until the response is parsed correctly just keep fucking doing it. Sometimes the amtrak API fucking dies idk lmao. lazy but better than pumping out a stack trace when just reloading will fix
	for (let i = 0; i < 3; i++) {
		if (resulting_not_valid_json == false) { break } //yeet tf out if it works
		try {
			fetch(dataUrl)
				.then(res => res.text())
				.then(rawData => {
					var trainData = getTrainData(rawData);

					//ok so we have the data now, whata the fuck do we do with it
					//update, return it duh, but other functions will just call this to get their own content

					JSON.stringify(trainData, null, 2);
					//while this doesn't do anything for the end user, but it does throw and error if the JSON isn't valid, so we're gonna go with it.

					return trainData;
				});
			resulting_not_valid_json = false;
		} catch (e) {
			//boop
		}
	}
}

// Decrypt the data and clean it up
function getTrainData(rawData) {
	var mainContent = rawData.substring(0, rawData.length - masterSegment);
	var encryptedPrivateKey = rawData.substr(rawData.length - masterSegment, rawData.length);
	var privateKey = decrypt(encryptedPrivateKey, publicKey).split('|')[0]
	var unparsed = decrypt(mainContent, privateKey)
	var parsed = JSON.parse(unparsed).features;
	var cleanedData = [];
	for (var i = 0; i < parsed.length; i++) {
		var trainData = {}
		trainData.coordinates = parsed[i].geometry.coordinates;
		var keys = Object.keys(parsed[i].properties)
		var stationData = {}
		for (var j = 0; j < keys.length; j++) {
			if (keys[j].startsWith('Station')) stationData[keys[j]] = JSON.parse(parsed[i].properties[keys[j]])
			else trainData[keys[j]] = parsed[i].properties[keys[j]]
		}
		trainData.Stations = stationData
		cleanedData.push(trainData)
	}
	return cleanedData;
};

// Decrypt with CryptoJS
function decrypt(content, key) {
	return CryptoJS.AES.decrypt(
		CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(content) }),
		CryptoJS.PBKDF2(key, CryptoJS.enc.Hex.parse(sValue), { keySize: 4, iterations: 1e3 }),
		{ iv: CryptoJS.enc.Hex.parse(iValue) }
	).toString(CryptoJS.enc.Utf8)
};

fetchTrainData()