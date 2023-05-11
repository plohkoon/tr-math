import { Mafs } from "mafs";
import { useAdjacency } from "~/lib/useAdjacency";

export default function PlanarOne() {
  const {elements, connections} = useAdjacency([
    [0,1,1,1,1],
    [1,0,1,1,1],
    [1,1,0,1,1],
    [1,1,1,0,1],
    [1,1,1,1,0]
  ])

  return (
    <Mafs pan={false} height={600} width={600}>
      {elements}
      {connections}
    </Mafs>
  )
}
