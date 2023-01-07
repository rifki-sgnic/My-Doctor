import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {colors} from '../../../utils';
import IconOnly from './IconOnly';

interface ButtonProps {
  type?: string;
  title?: string;
  onPress?: any;
  icon?: string;
}

const Button: FC<ButtonProps> = ({type, title, onPress, icon}) => {
  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />;
  }
  return (
    <TouchableOpacity style={{...styles({type}).container}} onPress={onPress}>
      <Text style={{...styles({type}).text}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

interface StyleProps {
  type?: string;
}

interface StyleSheetType {
  container: ViewStyle;
  text: TextStyle;
}

type StylesFunctionProps = (props: StyleProps) => StyleSheetType;

const styles: StylesFunctionProps = ({type}) =>
  StyleSheet.create<StyleSheetType>({
    container: {
      backgroundColor:
        type === 'secondary'
          ? colors.button.secondary.background
          : colors.button.primary.background,
      borderRadius: 10,
      paddingVertical: 10,
    },
    text: {
      fontSize: 18,
      fontFamily: 'Nunito-SemiBold',
      textAlign: 'center',
      color:
        type === 'secondary'
          ? colors.button.secondary.text
          : colors.button.primary.text,
    },
  });
