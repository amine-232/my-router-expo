import React, { Fragment, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  useWindowDimensions,
} from "react-native";
type TypeOverlays = { id: string; type: "text" | "emoji"; content: any };



function SingleOverlay({ id, type, content }: TypeOverlays) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState<any>(content);

  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.singleOverlay,
        type === "text" && { borderRadius: 10, overflow: "hidden" },
      ]}
    >
      {type === "text" ? (
        <Pressable
          onPress={() => {
            setIsEdit(true);
          }}
        >
          {isEdit ? (
            <TextInput
              value={value || ""}
              onChangeText={(e) => setValue(e)}
              style={{
                maxWidth: width * 0.8,
                height: "auto",
                paddingVertical: 5,
                borderRadius: 5,
                paddingHorizontal: 10,
                color: "#fff",
                borderWidth: 1,
                borderColor: "#fff",
                flexWrap: "wrap",
              }}
              onPointerLeave={(e) => {
                setIsEdit(false);
              }}
              onBlur={(e) => {
                setIsEdit(false);
              }}
            />
          ) : (
            <View
              style={{
                flexWrap: "wrap",
                maxWidth: width * 0.8,
                height: "auto",
                flexDirection: "row",
              }}
            >
              <Text
                style={{ color: "#fff", fontSize: 18, textAlign: "center" }}
              >
                {value}
              </Text>
            </View>
          )}
        </Pressable>
      ) : (
        <Text style={{ fontSize: 24 }}>{content}</Text>
      )}
    </View>
  );
}

export default function DraggableResizable({
  overlays,
}: {
  overlays: TypeOverlays[];
}) {
  return (
    <>
      {overlays.map(({ id, type, content }) => (
        <Fragment key={id}>
          {type === "text" ? (
            <DraggableTextEdito
              key={id}
              id={id}
              type={type}
              content={content}
            />
          ) : (
            <DraggableItem key={id} id={id} type={type} content={content} />
          )}
        </Fragment>
      ))}
    </>
  );
}

function DraggableTextEdito({ id, type, content }: TypeOverlays) {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [lastScale, setLastScale] = useState(1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.numberActiveTouches === 1) {
          pan.setValue({ x: gestureState.dx, y: gestureState.dy });
        }
      },
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.overlayContainer,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
        },
      ]}
    >
      {/* Drag Handle */}

      {/* Overlay Content */}
      <SingleOverlay id={id} type={type} content={content} />
      <View
        {...panResponder.panHandlers}
        style={{
          width: 30,
          height: 30,
          backgroundColor: "rgba(85, 85, 85, 0.6)",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          marginBottom: 4,
          alignSelf: "center",
        }}
      />
    </Animated.View>
  );
}

function DraggableItem({ id, type, content }: TypeOverlays) {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [lastScale, setLastScale] = useState(1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.numberActiveTouches === 1) {
          pan.setValue({ x: gestureState.dx, y: gestureState.dy });
        } else if (gestureState.numberActiveTouches === 2) {
          // Optional: Add pinch to zoom logic here
        }
      },
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.overlayContainer,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
        },
      ]}
    >
      <SingleOverlay id={id} type={type} content={content} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    left: 100,
    top: 100,
    zIndex: 10,
  },
  singleOverlay: {
    padding: 5,
    backgroundColor: "rgba(85, 85, 85, 0.6)",
    borderRadius: 4,
  },
});
