class Header extends HTMLElement {
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
        .header {
          background-color: var(--background-primary);
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1114px;
          margin: auto;
          border-bottom: 1px solid var(--background-secondary);
          padding: 2rem 0;
        }

        .title-link {
          text-decoration: none;
        }

        .title-text {
          color: var(--text-primary);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .header {
            padding: 2rem;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 2rem 1rem;
            flex-direction: column;
          }

          .title-link {
            display: inline-block;
            margin-bottom: 1.5rem;
          }
        }
      </style>
      <div class="header">
        <div class="title-container">
          <a href="/" class="title-link"><h1 class="title-text">Movie Explorer</h1></a>
        </div>
        <app-search></app-search>
      </div>
    `;
  }
}

customElements.define("app-header", Header);
