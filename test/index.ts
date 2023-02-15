import {
  fetchAllTrains,
  fetchAllStations,
  fetchTrain,
  fetchStation,
  fetchStaleStatus,
} from "../dist/index";

fetchAllTrains().then((res) => console.log(res.data));
fetchAllStations().then((res) => console.log(res.data));
fetchTrain("5").then((res) => console.log(res.data));
fetchStation("NYP").then((res) => console.log(res.data));
fetchStaleStatus().then((res) => console.log(res.data));
