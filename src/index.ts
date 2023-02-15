import * as AmtrakerTypes from "./types";
import axios from "axios";

const fetchTrain = async (trainId: string) => {
  return axios.get(`https://api-v3.amtraker.com/v3/trains/${trainId}`);
};

const fetchAllTrains = async () => {
  return axios.get("https://api-v3.amtraker.com/v3/trains");
};

const fetchStation = async (stationId: string) => {
  return axios.get(`https://api-v3.amtraker.com/v3/stations/${stationId}`);
};

const fetchAllStations = async () => {
  return axios.get("https://api-v3.amtraker.com/v3/stations");
};

const fetchStaleStatus = async () => {
  return axios.get("https://api-v3.amtraker.com/v3/stale");
};

export {
  fetchTrain,
  fetchAllTrains,
  fetchStation,
  fetchAllStations,
  fetchStaleStatus,
};
