class $Error extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: "open"});
    this.isError = this.getAttribute("data-error");
    this.render();
    this.shadowRoot
      .querySelector("app-button")
      .addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector("app-button")
      .removeEventListener("click", this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue && oldValue !== newValue) {
      this.isError = newValue;
      this.render();
    }
  }

  static get observedAttributes() {
    return ["data-error"];
  }

  handleClick() {
    location.reload();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .error-container {
          margin: 5rem auto 0;
          text-align: center;
          display: ${this.isError === "true" ? "block" : "none"}
        }

        .error-text {
          font-size: 1rem;
          color: var(--text-primary-50);
        }
      </style>
      <div class="error-container">
        <p class="error-text">Upss, There is an error</p>
        <app-button data-buttonText="Try again"></app-button>
      </div>
    `;
  }
}

customElements.define("app-error", $Error);
