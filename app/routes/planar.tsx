import { type LoaderArgs } from "@remix-run/cloudflare";
import { Mafs } from "mafs";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { adjacencies } from "~/lib/adjacencies";
import { useAdjacency } from "~/lib/useAdjacency";
import { Fireworks } from "fireworks/lib/react"

export function loader({request}: LoaderArgs) {
  const params = new URL(request.url).searchParams;

  let number_s = params.get("number");

  if (!number_s || !["4","5","6"].includes(number_s))
    number_s = "4";

  const number = parseInt(number_s) as 4 | 5 | 6;

  const options = adjacencies[number];
  const choice = Math.floor(Math.random() * options.length)

  return json({
    matrix: options[choice],
    number: number
  })
}

export default function Planar() {
  const data = useLoaderData<typeof loader>();
  const {elements, connections, hasCrossings} = useAdjacency(data.matrix);

  return (
    <div className="grid grid-cols-1 place-items-center space-y-4">
      <form method="get" className="space-x-4">
        <button type="submit" name="number" value="4" className="px-6 py-1 bg-purple-500 rounded-lg">4</button>
        <button type="submit" name="number" value="5" className="px-6 py-1 bg-purple-500 rounded-lg">5</button>
        <button type="submit" name="number" value="6" className="px-6 py-1 bg-purple-500 rounded-lg">6</button>
        <button type="submit" name="number" value={data.number} className="px-6 py-1 bg-purple-500 rounded-lg">New Puzzle</button>
      </form>
      <Mafs pan={false} height={600} width={600}>
        {elements}
        {connections}
      </Mafs>
      {!hasCrossings ?
        <>
          <Fireworks count={3} interval={1000} calc={(props, i) => ({
            ...props,
            x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
            y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
          })} />
          <form method="get">
            <button type="submit" name="number" value={data.number} className="px-6 py-1 bg-purple-500 rounded-lg outline-purple-300">Next Puzzle</button>
          </form>
        </>
        : null
      }
    </div>
  )
}
