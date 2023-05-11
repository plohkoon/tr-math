import { Line, MovablePoint, type vec } from "mafs";
import { useMemo, useState } from "react";

function useAdjacency(adjacencies: number[][]) {
  const [points, setPoints] = useState(() => {
    const numberPoints = adjacencies.length

    return Array.from({ length: numberPoints }, (_, i) => {
      const angle = (2 * Math.PI * i) / numberPoints
      const x = Math.cos(angle),
            y = Math.sin(angle);
      const point = [x, y] as vec.Vector2
      return point
    })
  })

  const elements = useMemo(() => {
    return points.map((p, i) => {
      return <MovablePoint key={i} point={p} onMove={
        (point) => setPoints((points) => {
          const newPoints = [...points]
          newPoints[i] = point;
          return newPoints;
        })
      } />
    })
  }, [points])

  const connections = useMemo(() => {
    const edges = []

    for(let i = 0; i < adjacencies.length; i++) {
      for(let j = i; j < adjacencies[i].length; j++) {
        if (adjacencies[i][j] !== 0) {
          edges.push([
            <Line.Segment key={`${i}-${j}`} point1={points[i]} point2={points[j]} />
          ])
        }
      }
    }

    return edges;
  }, [points, adjacencies])

  return {
    elements,
    connections
  }
}

export { useAdjacency }
