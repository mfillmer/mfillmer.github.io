class Card extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <slot name="header"></slot>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <slot></slot>
        </div>
        <div class="border-t border-gray-200 px-4 py-4 sm:px-6">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('ui-card', Card);
