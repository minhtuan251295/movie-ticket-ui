import axios from "axios";


const api = axios.create({
  baseURL: "https://lb4-movie-ticket-api.herokuapp.com/api"
});

export default api;