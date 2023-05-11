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

  const hasCrossings = useMemo(() => {
    // Function to check if two line segments intersect
    function doSegmentsIntersect(seg1: number[], seg2: number[]) {
      // Extract coordinates of the line segments
      const [x1, y1, x2, y2] = seg1;
      const [x3, y3, x4, y4] = seg2;

      // Calculate orientations of the line segments
      const orientation1 = calculateOrientation(x1, y1, x2, y2, x3, y3);
      const orientation2 = calculateOrientation(x1, y1, x2, y2, x4, y4);
      const orientation3 = calculateOrientation(x3, y3, x4, y4, x1, y1);
      const orientation4 = calculateOrientation(x3, y3, x4, y4, x2, y2);

      // Check if the orientations are different
      if (orientation1 !== orientation2 && orientation3 !== orientation4) {
        return true; // Segments intersect
      }

      return false; // Segments do not intersect
    }

    // Function to calculate the orientation of three points
    function calculateOrientation(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
      const val = (y2 - y1) * (x3 - x2) - (x2 - x1) * (y3 - y2);
      if (val === 0) {
        return 0; // Collinear points
      } else if (val > 0) {
        return 1; // Clockwise orientation
      } else {
        return 2; // Counterclockwise orientation
      }
    }

    // Function to check for intersection in a graph
    function checkIntersection(coordinates: vec.Vector2[], adjacencyMatrix: number[][]) {
      // Iterate through the adjacency matrix
      for (let i = 0; i < adjacencyMatrix.length; i++) {
        for (let j = i + 1; j < adjacencyMatrix[i].length; j++) {
          // Check if there is an edge between vertices i and j
          if (adjacencyMatrix[i][j] === 1) {
            // Define line segments using the coordinates
            const seg1 = coordinates[i].concat(coordinates[j]);

            // Iterate through the remaining edges
            for (let k = 0; k < adjacencyMatrix.length; k++) {
              for (let l = k + 1; l < adjacencyMatrix[k].length; l++) {
                // Check if there is an edge between vertices k and l
                if (adjacencyMatrix[k][l] === 1 && k !== i && l !== j && l !== i && k !== j) {
                  // Define line segments using the coordinates
                  const seg2 = coordinates[k].concat(coordinates[l]);

                  // Check if the line segments intersect
                  if (doSegmentsIntersect(seg1, seg2)) {
                    // Add the intersecting edges to the result
                    return true
                  }
                }
              }
            }
          }
        }
      }

      return false;
    }
    return checkIntersection(points, adjacencies)
  }, [points, adjacencies])

  return {
    elements,
    connections,
    hasCrossings
  }
}

export { useAdjacency }
