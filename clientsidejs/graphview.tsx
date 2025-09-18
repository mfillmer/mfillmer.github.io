import React from 'react'
import { createRoot } from 'react-dom/client'
import { GraphView } from '../components/GraphView'

const domNode = document.querySelector('#graphview')
if (domNode) {
  const root = createRoot(domNode)
  root.render(<GraphView />)

  console.info('Initialized graphview')
}
