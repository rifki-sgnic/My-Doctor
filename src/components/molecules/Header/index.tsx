import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {colors} from '../../../utils';
import {Button, Gap} from '../../atoms';
import DarkProfile from './DarkProfile';

interface HeaderProps {
  onPress: () => void;
  type?: string;
  title: string;
  desc?: string;
  photo?: any;
}

const Header = ({onPress, title, desc, type, photo}: HeaderProps) => {
  if (type === 'dark-profile') {
    return (
      <DarkProfile onPress={onPress} title={title} desc={desc} photo={photo} />
    );
  }
  return (
    <View style={{...styles({type}).container}}>
      <Button
        type="icon-only"
        icon={type === 'dark' ? 'back-light' : 'back-dark'}
        onPress={onPress}
      />
      <Text style={{...styles({type}).text}}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

interface StylesProps {
  type?: string;
}

interface StyleSheetType {
  container: ViewStyle;
  text: TextStyle;
}

type StylesFunctionProps = (props: StylesProps) => StyleSheetType;

const styles: StylesFunctionProps = ({type}) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 30,
      backgroundColor: type === 'dark' ? colors.secondary : colors.white,
      alignItems: 'center',
      borderBottomLeftRadius: type === 'dark' ? 20 : 0,
      borderBottomRightRadius: type === 'dark' ? 20 : 0,
    },
    text: {
      flex: 1,
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'Nunito-SemiBold',
      color: type === 'dark' ? colors.white : colors.text.primary,
      textTransform: 'capitalize',
    },
  });
