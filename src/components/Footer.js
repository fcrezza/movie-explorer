class Footer extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: "open"});
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
        .footer {
          max-width: 1114px;
          margin: auto;
          border-top: 1px solid var(--background-secondary);
          padding: 2rem 0;
        }

        .footer-image {
          display: block;
        }

        .footer-text {
          margin: 0;
          font-size: 1rem;
          color: var(--text-primary-50)
        }
      </style>
      <div class="footer">
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg" alt="themoviedb logo" height="60" width="200" class="footer-image">
        </a>
        <p class="footer-text">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
      </div>`;
  }
}

customElements.define("app-footer", Footer);
