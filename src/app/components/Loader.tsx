import { RotatingLines } from "react-loader-spinner";

interface LoaderProps {
  height: string;
  width: string;
}

export default function Loader({ height, width }: LoaderProps) {
  return (
    <RotatingLines
      visible={true}
      height={height}
      width={width}
      strokeColor="#ffcffd"
      strokeWidth="5"
      animationDuration="0.5"
    />
  );
}
