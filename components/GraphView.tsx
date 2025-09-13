import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface LinkMap {
  [key: string]: {
    target: string
    label: string
    outboundLinks: {
      target: string
    }[]
  }
}

export const GraphView: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    fetch('/linkMap.json')
      .then((response) => response.json())
      .then((data: LinkMap) => {
        if (svgRef.current) {
          renderGraph(data, svgRef.current)
        }
      })
  }, [])

  const renderGraph = (linkMap: LinkMap, svgElement: SVGSVGElement) => {
    const nodes = Object.values(linkMap).map((item) => ({
      id: item.target,
      ...item,
    }))

    const links = Object.values(linkMap).flatMap((entry) =>
      entry.outboundLinks
        .filter((link) => link.target in linkMap)
        .map((link) => ({
          source: entry.target,
          target: link.target,
        })),
    )

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d: any) => d.id),
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(200, 200))

    const svg = d3.select(svgElement).attr('width', 400).attr('height', 400)

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value))

    const node = svg.append('g').selectAll('g').data(nodes).join('g')

    node
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#69b3a2')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)

    node
      .append('text')
      .text((d: any) => d.label)
      .attr('x', 12)
      .attr('y', 3)

    node.on(
      'click',
      (_, data: any) => (document.location.pathname = data.target),
    )

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })
  }

  return <svg ref={svgRef}></svg>
}
