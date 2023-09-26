import {
  Group,
  interpolate,
  Path,
  PathOp,
  Rect,
  runSpring,
  runTiming,
  Skia,
  SkiaValue,
  SkPath,
  useComputedValue,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { useEffect, useMemo } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Touchable from "react-native-skia-gesture";
import { createNoise2D } from "simplex-noise";

const { width, height } = Dimensions.get("window");
const center = { x: width / 2, y: height / 2 };

const squares = 10;

const twitterIcon = Skia.Path.MakeFromSVGString(
  "M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
);

twitterIcon?.transform(Skia.Matrix([1, 0, 0, 0, 1, 0, 0, 0, 4]));

const PRIMARY_COLOR = "#4BA0F2";

export const ClipBackground = () => {
  const progress = useValue(0);

  useEffect(() => {
    runTiming(
      progress,
      { to: 10000, loop: true, yoyo: true },
      { duration: 30000 }
    );
  }, []);

  const generatedNoise = useMemo(() => {
    return new Array(squares).fill(0).map(() => createNoise2D());
  }, [squares]);

  const noises = useComputedValue(() => {
    const noises = [];
    for (let i = 0; i < squares; i++) {
      const noise2D = generatedNoise[i];
      const x = noise2D(progress.current / 2000, 0);
      const y = noise2D(0, progress.current / 2000);
      const noise = vec(x, y);
      noises.push(noise);
    }
    return noises;
  }, [progress]);

  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < squares; i++) {
      const x = 50 + Math.random() * (width - 100);
      const y = 50 + Math.random() * (height - 100);

      positions.push({ x, y });
    }
    return positions;
  }, []);

  const twitterCrazyIcons = useComputedValue(() => {
    let path = Skia.Path.Make();

    for (let i = 0; i < squares; i++) {
      const x = positions[i].x + 35 * noises.current[i].x;
      const y = positions[i].y + 35 * noises.current[i].y;

      const newPath = twitterIcon!.copy();

      // translate x and y with a matrix multiplication
      const angle = interpolate(
        noises.current[i].x * noises.current[i].y,
        [0, 1],
        [0, Math.PI / 2]
      );

      newPath.transform(
        Skia.Matrix([
          Math.cos(angle),
          -Math.sin(angle),
          x,
          Math.sin(angle),
          Math.cos(angle),
          y,
          0,
          0,
          1,
        ])
      );
      path.simplify();
      path = Skia.Path.MakeFromOp(path, newPath, PathOp.Union)!;
    }
    return path;
  }, [noises]);

  const progressRadius = useValue(0);
  const type = useValue("dark");
  const clipPath = useComputedValue(() => {
    const path = Skia.Path.Make();
    const maxRadius = Math.sqrt(width * width + height * height) / 2;
    path.addCircle(center.x, center.y, maxRadius * progressRadius.current);
    return path;
  }, [progressRadius]);

  return (
    <Touchable.Canvas style={{ flex: 1, backgroundColor: "white" }}>
      <AnimatedClipPath
        path={clipPath}
        lightChildren={
          <>
            <Rect x={0} y={0} width={width} height={height} color={"white"} />
            <Path path={twitterCrazyIcons} color={PRIMARY_COLOR} />
            <Touchable.Circle
              cx={center.x}
              cy={center.y}
              r={30}
              color={PRIMARY_COLOR}
              onEnd={() => {
                runTiming(progressRadius, { to: 0 }, { duration: 1000 });
              }}
            />
          </>
        }
        darkChildren={
          <>
            <Rect
              x={0}
              y={0}
              width={width}
              height={height}
              color={PRIMARY_COLOR}
            />
            <Path path={twitterCrazyIcons} color="white" />
            <Touchable.Circle
              cx={center.x}
              cy={center.y}
              r={30}
              color={"white"}
              onEnd={() => {
                type.current = type.current === "dark" ? "light" : "dark";
                runSpring(
                  progressRadius,
                  {
                    to: type.current !== "light" ? 0 : 1,
                  },
                  {
                    stiffness: 35,
                  }
                );
              }}
            />
          </>
        }
      />
    </Touchable.Canvas>
  );
};

type AnimatedClipPathProps = {
  path: SkiaValue<SkPath>;
  lightChildren: React.ReactNode;
  darkChildren: React.ReactNode;
};

const AnimatedClipPath: React.FC<AnimatedClipPathProps> = ({
  lightChildren,
  darkChildren,
  path,
}) => {
  return (
    <Group>
      <Group clip={path}>{lightChildren}</Group>
      <Group clip={path} invertClip>
        {darkChildren}
      </Group>
    </Group>
  );
};
