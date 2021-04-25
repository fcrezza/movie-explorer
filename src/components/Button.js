class Button extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: "open"});
    this.buttonText = this.getAttribute("data-buttonText");
    this.render();
  }

  // disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue && oldValue !== newValue) {
      this.buttonText = newValue;
      this.render();
    }
  }

  static get observedAttributes() {
    return ["data-buttonText"];
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background-color: var(--button-primary);
          border-radius: 5px;
          padding: 0.6rem 1rem;
          border: 0;
          color: var(--text-secondary);
          cursor: pointer;
          display: inline-block;
          text-align: center;
          font-size: 1rem;
          text-decoration: none;
        }
      </style>
      <button>${this.buttonText}</button>
    `;
  }
}

customElements.define("app-button", Button);
