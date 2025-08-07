class Paragraph extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <p class="text-base text-gray-700 leading-relaxed">
        <slot></slot>
      </p>
    `;
  }
}

customElements.define('ui-paragraph', Paragraph);
