import queryString from "query-string";

import "../assets/search.css";

window.addEventListener("DOMContentLoaded", init);

function init() {
  const {query} = queryString.parse(location.search);
  const main = document.getElementById("main");

  if (!query) {
    const searchElement = document.createElement("app-search");
    main.append(searchElement);
  }

  // document.querySelector(
  //   ".result"
  // ).innerText = `Menampilkan hasil untuk ${query}`;
}
