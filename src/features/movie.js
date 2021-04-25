import queryString from "query-string";
import {format} from "date-fns";

import axios from "../utils/axios";
import getConfiguration from "../utils/configuration";
import "../assets/movie.css";

window.addEventListener("DOMContentLoaded", load);

async function load() {
  const {id} = queryString.parse(location.search);
  const main = document.getElementById("main");
  const loader = document.createElement("app-loading");
  loader.setAttribute("data-loading", "true");

  if (!id) {
    return location.replace("/");
  }

  try {
    main.append(loader);
    const configuration = await getConfiguration();
    const {data: detail} = await axios.get(`/movie/${id}`);
    loader.remove();
    const detailElement = buildDetailElement(detail, configuration);
    main.append(detailElement);
  } catch (error) {
    loader.remove();
    const errorFallback = document.createElement("app-error");
    errorFallback.setAttribute("data-error", true);
    main.append(errorFallback);
  }

  try {
    main.append(loader);
    const configuration = await getConfiguration();
    const {data: similar} = await axios.get(`/movie/${id}/similar`);
    loader.remove();
    const similarElement = buildSimilarElement(similar, configuration);
    main.append(similarElement);
  } catch (error) {
    loader.remove();
    const errorFallback = document.createElement("app-error");
    errorFallback.setAttribute("data-error", true);
    main.append(errorFallback);
  }
}

function buildDetailElement(detail, configuration) {
  const movieDetailContainer = document.createElement("div");
  const poster = detail.poster_path
    ? `${configuration.images.secure_base_url}/w300/${detail.poster_path}`
    : "https://via.placeholder.com/300x450";
  movieDetailContainer.classList.add("movie-detail-container");
  movieDetailContainer.style.background = `url(${configuration.images.secure_base_url}/w1280/${detail.backdrop_path})`;
  movieDetailContainer.innerHTML = `
    <div class="movie-detail-wrapper">
       <img
        src="${poster}"
        alt="${detail.title} poster"
        class="movie-detail-poster"
        width="300"
        height="450"
      />
      <div class="movie-detail-content">
        <div class="movie-detail-vote">
         <span class="movie-detail-vote-text">${detail.vote_average}</span>
       </div>
       <h2 class="movie-detail-title">${detail.title}</h2>
        <p class="movie-detail-release-date">
          ${format(new Date(detail.release_date), "PP")}
        </p>
        <div class="movie-detail-genre-container">
          ${detail.genres
            .map(
              genre => `<p class="movie-detail-genre-item">${genre.name}</p>`
            )
            .join("")}
        </div>
        <p class="movie-detail-overview">${detail.overview}</p>
      </div>
    </div>
    `;

  return movieDetailContainer;
}

function buildSimilarElement(similar, configuration) {
  const similarContainer = document.createElement("div");
  similarContainer.classList.add("similar-container");
  similarContainer.innerHTML = `
  <h2 class="similar-title">Similar Movies</h2>
  <div class="similar-items-container">
    ${similar.results
      .map(({title, id, poster_path}) => {
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
      .join("")}
  </div>
  `;

  return similarContainer;
}
