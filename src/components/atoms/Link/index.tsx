import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';

const Link = ({title, size, align}: {title: any; size?: any; align?: any}) => {
  return (
    <View>
      <Text style={{...styles({size, align}).text}}>{title}</Text>
    </View>
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
      color: '#7D8797',
      fontFamily: 'Nunito-Regular',
      textDecorationLine: 'underline',
      textAlign: align,
    },
  });
