import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: '100%',
    height: '80%',
  },
  text: {
    fontSize: 20,
  }
});
