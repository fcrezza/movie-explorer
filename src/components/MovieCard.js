class MovieCard extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: "open"});
    this.id = this.getAttribute("data-id");
    this.title = this.getAttribute("data-title");
    this.poster = this.getAttribute("data-poster");
    this.render();
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(name, oldValue, newValue) {}

  // static get observedAttributes() {
  //   return [];
  // }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
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
    </style>
    <a href="movie?id=${this.id}" class="movie-card-item">
      <img
        src="${this.poster}"
        alt="${this.title} poster"
        width="154"
        height="231"
        class="movie-card-poster"
      />
      <h3 class="movie-card-title">${this.title}</h3>
    </a>
    `;
  }
}

customElements.define("app-moviecard", MovieCard);
