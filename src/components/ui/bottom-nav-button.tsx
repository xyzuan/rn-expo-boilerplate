import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { sizes, TTabBarButton } from "react-native-floating-tab";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type TExpandBarTabButton = {
  dimensions: {
    height: number;
    width: number;
    x: number;
  };
  setDimensions: ({
    height,
    width,
    x,
  }: {
    height: number;
    width: number;
    x: number;
  }) => void;
} & TTabBarButton;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const BottomNavButton: React.FC<TExpandBarTabButton> = ({
  isFocused,
  label,
  color,
  icon,
  colors,
  fontSize,
  dimensions,
  routes,
  setDimensions,
  ...props
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(isFocused ? 1 : 0, { duration: 500 });
  }, [isFocused, opacity]);

  const animatedHighlightContainer = useAnimatedStyle(() => {
    const animatedWidth = withSpring(isFocused ? dimensions.width - 10 : 0, {});
    return {
      width: animatedWidth,
    };
  });

  const animatedContainer = useAnimatedStyle(() => {
    const flexValue = withSpring(isFocused ? 2 : 1, {});

    return {
      flex: flexValue,
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      opacity.value,
      [0, 1],
      [colors.inactiveColor, colors.primaryColor]
    );

    return {
      color: textColor,
      opacity: opacity.value,
    };
  });

  return (
    <AnimatedTouchableOpacity
      onLayout={(e) => {
        if (isFocused) {
          setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
            x: e.nativeEvent.layout.x,
          });
        }
      }}
      activeOpacity={1}
      style={[styles.container, animatedContainer]}
      {...props}
    >
      <Animated.View
        style={[
          {
            height: dimensions.height,
            backgroundColor: isFocused ? colors.focusColor : "transparent",
          },
          styles.highlightContainer,
          animatedHighlightContainer,
        ]}
      />

      <Animated.View style={styles.icon}>{icon}</Animated.View>

      {!!label && !!isFocused && (
        <Animated.Text
          numberOfLines={1}
          style={[
            {
              fontSize,
            },
            animatedTextStyles,
          ]}
        >
          {label}
        </Animated.Text>
      )}
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
    gap: sizes.gap.regular,
    flexDirection: "row",
  },
  highlightContainer: {
    position: "absolute",
    borderRadius: sizes.border.circle,
    left: 5,
  },
  icon: { paddingVertical: 8, borderRadius: sizes.border.circle },
});

export default BottomNavButton;
