class PagefindSearch extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const searchElement = document.createElement("div");
    searchElement.id = "search";

    const script = document.createElement("script");
    script.src = "/pagefind/pagefind-ui.js";
    script.onload = () => {
      new PagefindUI({
        element: this.shadowRoot.querySelector("#search"),
        showImages: false,
      });
    };

    shadow.appendChild(searchElement);
    shadow.appendChild(script);
  }
}

customElements.define("pagefind-search", PagefindSearch);
