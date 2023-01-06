import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';

interface ButtonProps {
  type?: string;
  title?: string;
}

const Button: FC<ButtonProps> = ({type, title}) => {
  return (
    <View style={{...styles({type}).container}}>
      <Text style={{...styles({type}).text}}>{title}</Text>
    </View>
  );
};

export default Button;

interface StyleProps {
  type?: string;
  title?: string;
}

interface StyleSheetType {
  container: ViewStyle;
  text: TextStyle;
}

type StylesFunctionProps = (props: StyleProps) => StyleSheetType;

const styles: StylesFunctionProps = ({type}) =>
  StyleSheet.create<StyleSheetType>({
    container: {
      backgroundColor: type === 'secondary' ? 'white' : '#0BCAD4',
      borderRadius: 10,
      paddingVertical: 10,
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
      color: type === 'secondary' ? '#112340' : 'white',
    },
  });
