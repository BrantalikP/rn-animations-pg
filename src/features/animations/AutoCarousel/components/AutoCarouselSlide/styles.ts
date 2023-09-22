import { Dimensions, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

export const styles = StyleSheet.create({
  slide: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    overflow: 'hidden',
  }
})
