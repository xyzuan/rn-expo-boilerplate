import { useEffect, useMemo, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  colorFamilies,
  filteredRoute,
  handleNavigate,
  iconSize,
  initialFontSize,
  mapOperation,
  sizes,
  tabbar,
  tabContainer,
  TTabBar,
} from "react-native-floating-tab";
import { useSharedValue, withSpring } from "react-native-reanimated";
import BottomNavButton from "./bottom-nav-button";

const BottomNav: React.FC<TTabBar> = ({
  state,
  descriptors,
  navigation,
  insets,
  focusColor = colorFamilies.focusColor,
  primaryColor = colorFamilies.primaryColor,
  inactiveColor = colorFamilies.inactiveColor,
  fontSize = initialFontSize,
}) => {
  const translateX = useSharedValue(0);

  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
    x: 0,
  });

  useEffect(() => {
    translateX.value = withSpring(dimensions.x);
  }, [state.index, dimensions]);

  const routes = useMemo(
    () => filteredRoute({ state, exclude: ["_sitemap", "+not-found"] }),
    [state.routes]
  );

  return (
    <View
      className="shadow-md px-1 bg-background border border-primary/5"
      style={[
        {
          ...styles.tabbar,
          // backgroundColor: primaryColor,
          bottom:
            Platform.OS === "ios"
              ? insets.bottom + sizes.insets.bottom.ios
              : insets.bottom + sizes.insets.bottom.android,
        },
      ]}
    >
      {routes.map((route) => {
        const { label, options, isFocused } = mapOperation({
          state,
          route,
          routeKey: route.key,
          descriptors,
          routeName: route.name,
          routes,
        });

        return (
          <BottomNavButton
            key={route.name}
            onPress={() =>
              handleNavigate({
                navigation,
                routeName: route.name,
              })
            }
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : inactiveColor}
            label={typeof label === "string" ? label : ""}
            routes={routes}
            icon={options.tabBarIcon?.({
              focused: isFocused,
              color: isFocused ? primaryColor : inactiveColor,
              size: iconSize,
            })}
            setDimensions={setDimensions}
            dimensions={dimensions}
            colors={{
              focusColor,
              primaryColor,
              inactiveColor,
            }}
            fontSize={fontSize}
          />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: tabContainer,
  tabbar: {
    ...tabbar,
    borderRadius: 999,
    justifyContent: "center",
    marginHorizontal: sizes.margin.horizontal,
    paddingVertical: sizes.padding.vertical,
  },
});

export default BottomNav;
