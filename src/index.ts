import { Train, StationMeta, TrainResponse, StationResponse } from "./types";
import fetch from "node-fetch";

const fetchTrain = async (trainId: string) => {
  const res = await fetch(`https://api-v3.amtraker.com/v3/trains/${trainId}`);
  const data = await res.json();
  return data as Train;
};

const fetchAllTrains = async () => {
  const res = await fetch("https://api-v3.amtraker.com/v3/trains");
  const data = await res.json();
  return data as TrainResponse;
};

const fetchStation = async (stationId: string) => {
  const res = await fetch(
    `https://api-v3.amtraker.com/v3/stations/${stationId}`
  );
  const data = await res.json();
  return data as StationMeta;
};

const fetchAllStations = async () => {
  const res = await fetch("https://api-v3.amtraker.com/v3/stations");
  const data = await res.json();
  return data as StationResponse;
};

export { fetchTrain, fetchAllTrains, fetchStation, fetchAllStations };
