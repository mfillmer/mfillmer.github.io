class Input extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'placeholder', 'value'];
  }

  constructor() {
    super();
    this.input = document.createElement('input');
    this.input.setAttribute('class', 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm');
    this.appendChild(this.input);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get type() {
    return this.getAttribute('type') || 'text';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get placeholder() {
    return this.getAttribute('placeholder') || '';
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
  }

  render() {
    this.input.setAttribute('type', this.type);
    this.input.setAttribute('placeholder', this.placeholder);
  }
}

customElements.define('ui-input', Input);
