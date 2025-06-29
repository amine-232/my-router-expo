import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle, StyleProp, View } from "react-native";

type AnimatedViewProps = {
  Component: (e: any) => React.JSX.Element;
  visible: boolean;
  style?: StyleProp<ViewStyle>;
};

const AnimatedView: React.FC<AnimatedViewProps> = ({
  Component,
  visible,
  style,
}) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={[
        {
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
        style,
      ]}
    >
      <View
        style={{ width: "auto", height: "auto", position: "absolute", top: 0 }}
      >
        <Component />
      </View>
    </Animated.View>
  );
};

export default AnimatedView;
