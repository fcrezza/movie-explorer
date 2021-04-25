import axios from "../utils/axios";
import getConfiguration from "../utils/configuration";
import "../assets/home.css";

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
    const listOfMovies = buildListOfMovies(movies, configuration);
    main.append(listOfMovies);
  } catch (error) {
    loader.remove();
    const errorFallback = document.createElement("app-error");
    errorFallback.setAttribute("data-error", true);
    main.append(errorFallback);
  }
}

function buildListOfMovies(movies, configuration) {
  const moviesContainer = document.createElement("div");
  moviesContainer.classList.add("movies-container");
  moviesContainer.innerHTML = movies.results
    .map(({poster_path, title, id}) => {
      const poster = poster_path
        ? `${configuration.images.secure_base_url}/w154/${poster_path}`
        : "https://via.placeholder.com/154x231";

      return `
        <app-moviecard
          data-id="${id}"
          data-poster="${poster}"
          data-title="${title}"
        ></app-moviecard>`;
    })
    .join("");

  return moviesContainer;
}
