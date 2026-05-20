import axios from "axios";
//Axios dipakai untuk:

// GET data
// POST data
// update data
// delete data

// ke backend API.

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});