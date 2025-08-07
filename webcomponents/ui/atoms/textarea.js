class Textarea extends HTMLElement {
  static get observedAttributes() {
    return ['placeholder', 'value', 'rows'];
  }

  constructor() {
    super();
    this.textarea = document.createElement('textarea');
    this.textarea.setAttribute('class', 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm');
    this.appendChild(this.textarea);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get placeholder() {
    return this.getAttribute('placeholder') || '';
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }

  get value() {
    return this.textarea.value;
  }

  set value(value) {
    this.textarea.value = value;
  }

  get rows() {
    return this.getAttribute('rows') || 3;
  }

  set rows(value) {
    this.setAttribute('rows', value);
  }

  render() {
    this.textarea.setAttribute('placeholder', this.placeholder);
    this.textarea.setAttribute('rows', this.rows);
  }
}

customElements.define('ui-textarea', Textarea);
