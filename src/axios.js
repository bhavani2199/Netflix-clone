// src/axios.js

import axios from "axios";

// Create an instance of axios with base URL
// base url to make requests to the movie database
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default instance;
