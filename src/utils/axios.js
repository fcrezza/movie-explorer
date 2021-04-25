import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-type": "application/json",
    Authorization: `bearer ${process.env.THE_MOVIE_DB_ACCESS_TOKEN}`
  }
});

export default customAxios;
