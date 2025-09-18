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

const renderGraph = (linkMap: LinkMap, svgElement: SVGSVGElement) => {
  const svgBoundingBox = svgElement.getBoundingClientRect()

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
      d3
        .forceLink(links)
        .distance(100)
        .strength(0.1)
        .id((d) => d.id),
    )
    .force('charge', d3.forceManyBody().strength(-5))
    .force('collide', d3.forceCollide().radius(15))
    .velocityDecay(0.1)
    .force(
      'center',
      d3.forceCenter(svgBoundingBox.width / 2, svgBoundingBox.height / 2),
    )

  const svg = d3
    .select(svgElement)
    .attr('width', svgBoundingBox.width)
    .attr('height', svgBoundingBox.height)
    .attr('viewBox', [0, 0, svgBoundingBox.width, svgBoundingBox.height])

  const container = svg.append('g')

  const link = container
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', (d: any) => Math.sqrt(d.value))

  const node = container.append('g').selectAll('g').data(nodes).join('g')

  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(event: any) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }

  node.call(
    d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended) as any,
  )

  node.on('mouseover', function () {
    d3.select(this).raise()
  })

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
    .attr('class', 'hover:underline cursor-pointer')

  node.on('click', (_, data: any) => (document.location.pathname = data.target))

  svg.call(
    d3
      .zoom()
      .extent([
        [0, 0],
        [svgBoundingBox.width, svgBoundingBox.height],
      ])
      .scaleExtent([0.5, 8])
      .on('zoom', ({ transform }) => {
        container.attr('transform', transform)
      }) as any,
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

  return <svg className='w-full min-h-[60vh]' ref={svgRef}></svg>
}
