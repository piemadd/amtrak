import * as AmtrakerTypes from "./types";
import axios from "axios";

const fetchTrain = async (trainId: string) => {
  const res = await axios.get(`https://api.amtraker.com/v3/trains/${trainId}`, {
    headers: { "User-Agent": "AmtrakerAmtrakDotJS/3.0.16" }
  });
  return res.data as AmtrakerTypes.TrainResponse;
};

const fetchAllTrains = async () => {
  const res = await axios.get("https://api.amtraker.com/v3/trains", {
    headers: { "User-Agent": "AmtrakerAmtrakDotJS/3.0.16" }
  });
  return res.data as AmtrakerTypes.TrainResponse;
};

const fetchStation = async (stationId: string) => {
  const res = await axios.get(`https://api.amtraker.com/v3/stations/${stationId}`, {
    headers: { "User-Agent": "AmtrakerAmtrakDotJS/3.0.16" }
  });
  return res.data as AmtrakerTypes.StationResponse;
};

const fetchAllStations = async () => {
  const res = await axios.get("https://api.amtraker.com/v3/stations", {
    headers: { "User-Agent": "AmtrakerAmtrakDotJS/3.0.16" }
  });
  return res.data as AmtrakerTypes.StationResponse;
};

const fetchStaleStatus = async () => {
  const res = await axios.get("https://api.amtraker.com/v3/stale", {
    headers: { "User-Agent": "AmtrakerAmtrakDotJS/3.0.16" }
  });
  return res.data as AmtrakerTypes.StaleData;
};

export { fetchTrain, fetchAllTrains, fetchStation, fetchAllStations, fetchStaleStatus };
