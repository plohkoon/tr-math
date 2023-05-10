import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { Coordinates, Line, Mafs, Vector, useMovablePoint } from "mafs";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const point = useMovablePoint([-1,0]);
  const point2 = useMovablePoint([1,0]);
  const point3 = useMovablePoint([0,1]);
  const point4 = useMovablePoint([0,-1]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <Mafs pan={false}>
        <Coordinates.Cartesian
        // xAxis={{
        //   axis: false,
        //   lines: false,
        //   subdivisions: false,
        //   labels: false
        // }}
        // yAxis={{
        //   axis: false,
        //   lines: false,
        //   subdivisions: false,
        //   labels: false
        // }}
        />
        <Line.Segment point1={point.point} point2={point2.point} />
        <Line.Segment point1={point3.point} point2={point4.point} />
        <Line.Segment point1={point.point} point2={point3.point} />
        <Line.Segment point1={point2.point} point2={point4.point} />
        <Line.Segment point1={point2.point} point2={point3.point} />
        <Line.Segment point1={point.point} point2={point4.point} />
        {point.element}
        {point2.element}
        {point3.element}
        {point4.element}
      </Mafs>
    </div>
  );
}
