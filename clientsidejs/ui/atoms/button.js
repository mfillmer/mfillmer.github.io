class Button extends HTMLElement {
  static get observedAttributes() {
    return ["variant"];
  }

  constructor() {
    super();
    this._variant = this.getAttribute("variant") || "primary";
    this.button = document.createElement("button");
    while (this.firstChild) {
      this.button.appendChild(this.firstChild);
    }
    this.appendChild(this.button);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "variant" && oldValue !== newValue) {
      this._variant = newValue;
      this.render();
    }
  }

  get variant() {
    return this._variant;
  }

  set variant(value) {
    this.setAttribute("variant", value);
  }

  render() {
    const baseClasses = [
      "inline-flex",
      "items-center",
      "justify-center",
      "rounded-md",
      "font-medium",
      "cursor-pointer",
      "text-sm",
      "px-4",
      "py-2",
      "shadow-sm",
      "transition",
      "ease-in-out",
      "duration-150",
      "cursor-pointer",
      "border",
      "border-transparent",
    ];

    const variantClasses = {
      primary: [
        "bg-indigo-600",
        "text-white",
        "hover:bg-indigo-800",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-indigo-500",
      ],
      secondary: [
        "bg-white",
        "text-gray-700",
        "border-gray-400",
        "hover:bg-gray-400",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-indigo-500",
      ],
    };

    const classes = [
      ...baseClasses,
      ...(variantClasses[this.variant] || []),
    ].join(" ");
    this.button.setAttribute("class", classes);
  }
}

customElements.define("ui-button", Button);
