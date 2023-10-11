import { StyleProp, Text, TextStyle } from 'react-native';
import { styles } from './styles';

interface TypographyProps {
  children?: string;
  style?: StyleProp<TextStyle>;
}

export const Headline = ({ children, style }: TypographyProps) => (
  <Text style={[style, styles.headline]}>{children}</Text>
);

export const Paragraph = ({ children, style }: TypographyProps) => (
  <Text style={[style, styles.paragraph]}>{children}</Text>
);

export const Tag = ({ children, style }: TypographyProps) => (
  <Text style={[style, styles.tag]}>{children}</Text>
);
