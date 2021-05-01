import originalAxios from "axios";

export const axios = originalAxios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-type": "application/json",
    Authorization: `bearer ${process.env.THE_MOVIE_DB_ACCESS_TOKEN}`
  }
});

export function buildListOfMovies(movies, configuration) {
  return movies.map(({poster_path, title, id}) => {
    const poster = poster_path
      ? `${configuration.images.secure_base_url}/w154/${poster_path}`
      : "https://via.placeholder.com/154x231";

    return {
      id,
      poster,
      title
    };
  });
}

export async function getConfiguration() {
  let configuration = JSON.parse(localStorage.getItem("configuration"));

  if (!configuration) {
    const {data} = await axios.get("/configuration");
    configuration = data;
    localStorage.setItem("configuration", JSON.stringify(data));
  }

  return configuration;
}
