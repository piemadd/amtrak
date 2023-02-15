import * as AmtrakerTypes from "./types";
import axios from "axios";

const fetchTrain = async (trainId: string) => {
  const res = await axios.get(
    `https://api-v3.amtraker.com/v3/trains/${trainId}`
  );
  return res.data as AmtrakerTypes.TrainResponse;
};

const fetchAllTrains = async () => {
  const res = await axios.get("https://api-v3.amtraker.com/v3/trains");
  return res.data as AmtrakerTypes.TrainResponse;
};

const fetchStation = async (stationId: string) => {
  const res = await axios.get(
    `https://api-v3.amtraker.com/v3/stations/${stationId}`
  );
  return res.data as AmtrakerTypes.StationResponse;
};

const fetchAllStations = async () => {
  const res = await axios.get("https://api-v3.amtraker.com/v3/stations");
  return res.data as AmtrakerTypes.StationResponse;
};

const fetchStaleStatus = async () => {
  const res = await axios.get("https://api-v3.amtraker.com/v3/stale");
  return res.data as AmtrakerTypes.StaleData;
};

export {
  fetchTrain,
  fetchAllTrains,
  fetchStation,
  fetchAllStations,
  fetchStaleStatus,
};
