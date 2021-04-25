class Search extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: "open"});
    this.render();
    this.button = this.shadowRoot.querySelector(".search-button");
    const input = this.shadowRoot.querySelector(".search-input");
    this.event = (() => {
      this.button.addEventListener("click", () =>
        this.handleClick(input.value)
      );

      return {
        unsubscribe() {
          this.button.removeEventListener("click", () =>
            this.handleClick(input.value)
          );
        }
      };
    })();
  }

  disconnectedCallback() {
    this.event.unsubscribe();
  }

  // attributeChangedCallback(name, oldValue, newValue) {}

  // static get observedAttributes() {
  //   return [];
  // }

  handleClick(inputValue) {
    if (inputValue.trim()) {
      location.href = `/search?query=${inputValue}`;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      .search-input {
        background-color: var(--background-secondary);
        border: 0;
        border-radius: 5px;
        padding: 10px;
        margin-right: 0.3rem;
        font-size: 1rem;
        width: 300px;
      }

      .search-button {
        background-color: var(--button-primary);
        border-radius: 5px;
        padding: 0.6rem 1rem;
        border: 0;
        font-size: 1rem;
        color: var(--text-secondary);
        cursor: pointer;
      }
    </style>
    <div class="search-container">
      <input type="search" placeholder="Search a movie..." class="search-input">
      <button class="search-button">Search</button>
    </div>
    `;
  }
}

customElements.define("app-search", Search);
