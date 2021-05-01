import queryString from "query-string";

import {axios, getConfiguration, buildListOfMovies} from "../utils";
import "../assets/search.css";

window.addEventListener("DOMContentLoaded", load);

async function load() {
  const {query} = queryString.parse(location.search);
  const main = document.querySelector("main");
  const loader = document.createElement("app-loading");
  loader.setAttribute("data-loading", "true");

  if (!query) {
    return location.replace("/");
  }

  try {
    main.append(loader);
    const configuration = await getConfiguration();
    const {data: movies} = await axios.get(
      `/search/movie?query=${encodeURI(query)}`
    );
    loader.remove();
    const searchQueryText = document.createElement("h2");
    searchQueryText.classList.add("search-query-text");
    searchQueryText.textContent = `Showing search results for "${query}" `;

    if (!movies.results.length) {
      const notFoundText = document.createElement("p");
      notFoundText.classList.add("not-found-text");
      notFoundText.textContent = "404 Not Found";
      main.append(searchQueryText, notFoundText);
      return;
    }

    const appMovies = document.createElement("app-movies");
    appMovies.movies = buildListOfMovies(movies.results, configuration);
    main.append(searchQueryText, appMovies);
  } catch (error) {
    loader.remove();
    const errorFallback = document.createElement("app-error");
    errorFallback.setAttribute("data-error", true);
    main.append(errorFallback);
  }
}
