import { PanResponder, Animated } from "react-native";

export default function useHandlePanResponder({
  isStart,
  handle,
  setHandleX,
  oppositeHandleX,
  sliderWidth,
  maxDuration,
  minTrim,
  setTime,
}: {
  isStart: boolean;
  handle: Animated.Value;
  setHandleX: (x: number) => void;
  oppositeHandleX: number;
  sliderWidth: React.MutableRefObject<number>;
  maxDuration: number;
  minTrim: number;
  setTime: (time: number) => void;
}) {
  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gesture) => {
      const halfHandle = 10;
      let newX = gesture.x0 - halfHandle;

      const limit = (minTrim / maxDuration) * sliderWidth.current;

      if (isStart) {
        newX = Math.max(0, Math.min(newX, oppositeHandleX - limit));
      } else {
        newX = Math.min(
          sliderWidth.current,
          Math.max(newX, oppositeHandleX + limit)
        );
      }

      handle.setValue(newX);
      setHandleX(newX);
      setTime((newX / sliderWidth.current) * maxDuration);
    },
    onPanResponderMove: (_, gesture) => {
      const halfHandle = 10;
      let newX = gesture.moveX - halfHandle;

      const limit = (minTrim / maxDuration) * sliderWidth.current;

      if (isStart) {
        newX = Math.max(0, Math.min(newX, oppositeHandleX - limit));
      } else {
        newX = Math.min(
          sliderWidth.current,
          Math.max(newX, oppositeHandleX + limit)
        );
      }
      setTime((newX / sliderWidth.current) * maxDuration);
      console.log((newX / sliderWidth.current) * maxDuration);
      handle.setValue(newX);
      setHandleX(newX);
    },
    onPanResponderRelease: () => {},
  });
}
