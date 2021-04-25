class Loading extends HTMLElement {
  connectedCallback() {
    // this.attachShadow({mode: "open"});
    this.isLoading = this.getAttribute("data-loading");
    this.render();
  }

  // disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue && oldValue !== newValue) {
      this.isLoading = newValue;
      this.render();
    }
  }

  static get observedAttributes() {
    return ["data-loading"];
  }

  render() {
    this.innerHTML = `
      <style>
        .loading-container {
          margin-top: 5rem;
          display: ${this.isLoading === "true" ? "block" : "none"}
        }

        .loading-text {
          text-align: center;
          font-size: 1rem;
          color: var(--text-primary-50);
        }
      </style>
      <div class="loading-container">
        <p class="loading-text">Loading...</p>;
      </div>
    `;
  }
}

customElements.define("app-loading", Loading);
