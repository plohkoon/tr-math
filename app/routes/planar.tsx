import { type LoaderArgs } from "@remix-run/cloudflare";
import { Mafs } from "mafs";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { adjacencies } from "~/lib/adjacencies";
import { useAdjacency } from "~/lib/useAdjacency";

export function loader({request}: LoaderArgs) {
  const params = new URL(request.url).searchParams;

  let number_s = params.get("number");

  if (!number_s || !["4","5","6"].includes(number_s))
    number_s = "4";

  const number = parseInt(number_s) as 4 | 5 | 6;

  const options = adjacencies[number];
  const choice = Math.floor(Math.random() * options.length)

  return json(options[choice])
}

export default function Planar() {
  const data = useLoaderData<typeof loader>();
  const {elements, connections} = useAdjacency(data)

  return (
    <Mafs pan={false} height={600} width={600}>
      {elements}
      {connections}
    </Mafs>
  )
}
