import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Image,
  NativeModules,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

const { RNTrimmerManager: TrimmerManager } = NativeModules;
const { width: screenWidth } = Dimensions.get('window');

interface TrimmerProps {
  source: string;
  onChange?: (times: { startTime: number; endTime: number }) => void;
}

export const calculateCornerResult = (
  duration: number,
  value: number,
  width: number,
  fromRight = false
): number => {
  const val = Math.abs(value);
  const result = (duration * val) / width;
  return fromRight ? duration - result : result;
};

export const msToSec = (ms: number) => ms / 1000;

export const numberToHHMMSS = (number: number): string => {
  let sec_num = number;
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = (sec_num - hours * 3600 - minutes * 60).toFixed(3);

  const pad = (n: number | string) => (parseInt(n as string) < 10 ? '0' + n : n);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  imageItem: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  corners: {
    position: 'absolute',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  rightCorner: {
    position: 'absolute',
    right: 0,
  },
  leftCorner: {
    position: 'absolute',
    left: 0,
  },
  bgBlack: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: screenWidth,
  },
  cornerItem: {
    backgroundColor: 'gray',
    width: 30,
    height: 50,
  },
});

export const Trimmer: React.FC<TrimmerProps> = ({ source, onChange = () => {} }) => {
  const [images, setImages] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(-1);
  const [layoutWidth, setLayoutWidth] = useState<number>(screenWidth);

  const leftCorner = useRef(new Animated.Value(0)).current;
  const rightCorner = useRef(new Animated.Value(0)).current;

  const leftPosRef = useRef(0);
  const rightPosRef = useRef(0);

  const startTimeRef = useRef(0);
  const endTimeRef = useRef(0);

  const updateStartTime = () => {
    startTimeRef.current = calculateCornerResult(duration, leftPosRef.current, layoutWidth);
    onChange({ startTime: startTimeRef.current, endTime: endTimeRef.current });
  };

  const updateEndTime = () => {
    endTimeRef.current = calculateCornerResult(duration, rightPosRef.current, layoutWidth, true);
    onChange({ startTime: startTimeRef.current, endTime: endTimeRef.current });
  };

  useEffect(() => {
    leftCorner.addListener(({ value }) => (leftPosRef.current = value));
    rightCorner.addListener(({ value }) => (rightPosRef.current = value));

    return () => {
      leftCorner.removeAllListeners();
      rightCorner.removeAllListeners();
    };
  }, []);

  const retrieveVideoInfo = useCallback(() => {
    TrimmerManager.getVideoInfo(source).then((info: { duration: number }) => {
      const durSec = msToSec(info.duration);
      setDuration(durSec);
      endTimeRef.current = durSec;
    });
  }, [source]);

  const retrievePreviewImages = useCallback(() => {
    TrimmerManager.getPreviewImages(source)
      .then(({ images }: { images: string[] }) => setImages(images))
      .catch(console.error);
  }, [source]);

  useEffect(() => {
    if (!source.trim()) throw new Error('source should be a valid string');
    retrievePreviewImages();
    retrieveVideoInfo();
  }, [source]);

  const leftResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 0,
      onPanResponderMove: (e, gestureState) => {
        const moveRight = gestureState.dx > 0;
        const rightPos = layoutWidth - Math.abs(rightPosRef.current);
        const leftPos = leftPosRef.current;

        if (rightPos - leftPos <= 50 && moveRight) return;
        Animated.event([null, { dx: leftCorner }], { useNativeDriver: false })(e, gestureState);
        updateStartTime();
      },
      onPanResponderRelease: () => {
        leftCorner.setOffset(leftPosRef.current);
        leftCorner.setValue(0);
      },
    })
  ).current;

  const rightResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 0,
      onPanResponderMove: (e, gestureState) => {
        const moveLeft = gestureState.dx < 0;
        const rightPos = layoutWidth - Math.abs(rightPosRef.current);
        const leftPos = leftPosRef.current;

        if (rightPos - leftPos <= 50 && moveLeft) return;
        Animated.event([null, { dx: rightCorner }], { useNativeDriver: false })(e, gestureState);
        updateEndTime();
      },
      onPanResponderRelease: () => {
        rightCorner.setOffset(rightPosRef.current);
        rightCorner.setValue(0);
      },
    })
  ).current;

  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent }) => {
        setLayoutWidth(nativeEvent.layout.width);
      }}
    >
      {images.map((uri, index) => (
        <Image key={`preview-${index}`} source={{ uri }} style={styles.imageItem} />
      ))}

      <View style={styles.corners}>
        <Animated.View
          style={[
            styles.leftCorner,
            { transform: [{ translateX: leftCorner }] },
          ]}
          {...leftResponder.panHandlers}
        >
          <View style={styles.row}>
            <View style={styles.bgBlack} />
            <View style={styles.cornerItem} />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.rightCorner,
            { transform: [{ translateX: rightCorner }] },
          ]}
          {...rightResponder.panHandlers}
        >
          <View style={styles.row}>
            <View style={styles.cornerItem} />
            <View style={styles.bgBlack} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};
