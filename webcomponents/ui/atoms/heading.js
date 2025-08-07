class Heading extends HTMLElement {
  static get observedAttributes() {
    return ['level'];
  }

  constructor() {
    super();
    this._level = this.getAttribute('level') || 1;
    this.heading = document.createElement(`h${this._level}`);
    while (this.firstChild) {
      this.heading.appendChild(this.firstChild);
    }
    this.appendChild(this.heading);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'level' && oldValue !== newValue) {
      this._level = newValue;
      const newHeading = document.createElement(`h${this._level}`);
      while (this.heading.firstChild) {
        newHeading.appendChild(this.heading.firstChild);
      }
      this.replaceChild(newHeading, this.heading);
      this.heading = newHeading;
      this.render();
    }
  }

  get level() {
    return this._level;
  }

  set level(value) {
    this.setAttribute('level', value);
  }

  render() {
    const classes = {
      'font-bold': true,
      'text-gray-900': true,
      'leading-tight': true,
      'text-4xl': this.level == 1,
      'text-3xl': this.level == 2,
      'text-2xl': this.level == 3,
      'text-xl': this.level == 4,
      'text-lg': this.level == 5,
      'text-base': this.level == 6,
    };

    this.heading.setAttribute('class', Object.entries(classes).filter(([, value]) => value).map(([key]) => key).join(' '));
  }
}

customElements.define('ui-heading', Heading);
