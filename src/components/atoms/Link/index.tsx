import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';

interface LinkProps {
  title: any;
  size?: any;
  align?: string;
  onPress: () => void;
}

const Link = ({title, size, align, onPress}: LinkProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{...styles({size, align}).text}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Link;

interface StyleProps {
  size?: any;
  align?: any;
}

interface StyleSheetType {
  text: TextStyle;
}

type StylesFunctionProps = (props: StyleProps) => StyleSheetType;

const styles: StylesFunctionProps = ({size, align}) =>
  StyleSheet.create<StyleSheetType>({
    text: {
      fontSize: size,
      color: colors.text.secondary,
      fontFamily: fonts.primary[400],
      textDecorationLine: 'underline',
      textAlign: align,
    },
  });
