class Select extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }

  constructor() {
    super();
    this.select = document.createElement('select');
    this.select.setAttribute('class', 'mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm');
    this.appendChild(this.select);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value' && oldValue !== newValue) {
      this.render();
    }
  }

  get value() {
    return this.select.value;
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get options() {
    return Array.from(this.select.options).map(option => ({ value: option.value, label: option.label }));
  }

  set options(value) {
    this.select.innerHTML = '';
    for (const option of value) {
      const optionElement = document.createElement('option');
      optionElement.setAttribute('value', option.value);
      optionElement.innerText = option.label;
      this.select.appendChild(optionElement);
    }
  }

  render() {
    this.select.value = this.getAttribute('value');
  }
}

customElements.define('ui-select', Select);
