import { Line, Mafs, useMovablePoint } from "mafs";

export default function PlanarOne() {
  const point = useMovablePoint([-1,0]);
  const point2 = useMovablePoint([1,0]);
  const point3 = useMovablePoint([0,1]);
  const point4 = useMovablePoint([0,-1]);

  return (
    <Mafs pan={false} height={600} width={600}>
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
  )
}
