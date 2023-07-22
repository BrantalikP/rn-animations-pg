import { View, Text } from "react-native";
import { styles } from "./styles";
import React from "react";
import { useSharedValue } from "react-native-reanimated";
import { IItem } from "../Item";

interface ICustomCellRendererComponent {
  children: React.ReactNode;
}

const CustomCellRendererComponent = React.memo(
  ({ children, ...props }: ICustomCellRendererComponent) => {
    const itemY = useSharedValue(0);
    const itemHeight = useSharedValue(0);
    return (
      <View
        {...props}
        onLayout={(ev) => {
          itemY.value = ev.nativeEvent.layout.y;
          itemHeight.value = ev.nativeEvent.layout.height;
        }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement, {
              itemY,
              itemHeight,
            });
          }
          return child;
        })}
      </View>
    );
  }
);

export { CustomCellRendererComponent };
