import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({ style, type = 'default', ...rest }: ThemedTextProps) {
  let textStyle = {};
  
  switch (type) {
    case 'title':
      textStyle = { fontSize: 24, fontWeight: 'bold', lineHeight: 32 };
      break;
    case 'defaultSemiBold':
      textStyle = { fontSize: 16, fontWeight: '600' };
      break;
    case 'subtitle':
      textStyle = { fontSize: 20, fontWeight: 'bold' };
      break;
    case 'link':
      textStyle = { color: '#0a7ea4', fontSize: 16 };
      break;
    default:
      textStyle = { fontSize: 16 };
  }

  return <Text style={[textStyle, style]} {...rest} />;
}