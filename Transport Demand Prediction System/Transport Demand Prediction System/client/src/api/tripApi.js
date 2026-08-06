import axios from "axios";

const API = "http://localhost:5000/api/trips";

export const createTrip = (data) => axios.post(`${API}/create`, data);
export const getTrips = () => axios.get(`${API}/all`);