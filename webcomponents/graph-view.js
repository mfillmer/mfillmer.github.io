class GraphView extends HTMLDivElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.shadowRoot.appendChild(svg);
    this.svg = svg;
  }

  render(linkMap) {
    const nodes = Object.values(linkMap).map((item) => ({
      id: item.slug,
      ...item,
    }));

    const links = Object.values(linkMap).flatMap((entry) =>
      entry.outboundLinks
        .filter((link) => link.slug in linkMap)
        .map((link) => ({
          source: entry.slug,
          target: link.slug,
        }))
    );

    console.log({ nodes, links });

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(200, 200));

    const svg = d3.select(this.svg).attr("width", 400).attr("height", 400);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = svg.append("g").selectAll("g").data(nodes).join("g");

    node
      .append("circle")
      .attr("r", 10)
      .attr("fill", "#69b3a2")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    node
      .append("text")
      .text((d) => d.id)
      .attr("x", 12)
      .attr("y", 3);

    node.on("click", (_, data) => (document.location.pathname = data.path));

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
  }
}

customElements.define("graph-view", GraphView, { extends: "div" });
