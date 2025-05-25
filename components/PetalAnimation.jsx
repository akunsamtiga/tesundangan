'use client'

import { useEffect, useRef } from 'react'

export default function PetalAnimation() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const petalCount = 20
    const petals = []

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div')
      petal.className = 'petal'
      petal.style.left = Math.random() * 100 + 'vw'
      petal.style.animationDuration = 5 + Math.random() * 5 + 's'
      petal.style.opacity = 0.6 + Math.random() * 0.4
      container.appendChild(petal)
      petals.push(petal)
    }

    return () => {
      petals.forEach(petal => petal.remove())
    }
  }, [])

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-20 overflow-hidden" />
}
