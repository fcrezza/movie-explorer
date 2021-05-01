import {axios, getConfiguration, buildListOfMovies} from "../utils";

window.addEventListener("DOMContentLoaded", load);

async function load() {
  const main = document.getElementById("main");
  const loader = document.createElement("app-loading");
  loader.setAttribute("data-loading", "true");

  try {
    main.append(loader);
    const configuration = await getConfiguration();
    const {data: movies} = await axios.get("/discover/movie");
    loader.remove();
    const appMovies = document.createElement("app-movies");
    appMovies.movies = buildListOfMovies(movies.results, configuration);
    main.append(appMovies);
  } catch (error) {
    loader.remove();
    const errorFallback = document.createElement("app-error");
    errorFallback.setAttribute("data-error", true);
    main.append(errorFallback);
  }
}
