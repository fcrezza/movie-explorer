class MovieCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    this.render();
  }

  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(name, oldValue, newValue) {}

  // static get observedAttributes() {
  //   return [];
  // }

  render() {
    console.log(this.shadowRoot);
    this.shadowRoot.innerHTML = `
    <style>
      .movies-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: flex-start;
        grid-gap: 1.5rem;
      }

      .movie-card-item {
        text-decoration: none;
      }

      .movie-card-title {
        color: var(--text-primary);
        margin: 1rem 0 0;
      }

      .movie-card-poster {
        border-radius: 10px;
        width: 100%;
        height: auto;
      }

      @media (max-width: 1024px) {
        .movies-container {
          grid-template-columns: repeat(4, 1fr);
          padding: 0 2rem;
        }
      }

      @media (max-width: 480px) {
        .movies-container {
          grid-template-columns: repeat(2, 1fr);
          padding: 0 1rem;
        }
      }
    </style>
    <div class="movies-container">
      ${this._movies
        .map(
          ({id, poster, title}) =>
            `<a href="movie?id=${id}" class="movie-card-item">
              <img
                src="${poster}"
                alt="${title} poster"
                width="154"
                height="231"
                class="movie-card-poster"
              />
              <h3 class="movie-card-title">${title}</h3>
            </a>`
        )
        .join("")}
    </div>
    `;
  }
}

customElements.define("app-movies", MovieCard);
