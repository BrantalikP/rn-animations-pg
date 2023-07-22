import { View, Text } from 'react-native'
import { styles } from './styles'

interface IItem {}

const Item = ({}: IItem) => {
  return (
    <View style={styles.container}>
      <Text>Item</Text>
    </View>
  )
}

export { Item }
