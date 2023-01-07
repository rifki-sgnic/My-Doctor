import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconArrowBack} from '../../../assets';
import {Gap} from '../../atoms';
import {colors} from '../../../utils';

const Header = () => {
  return (
    <View style={styles.container}>
      <IconArrowBack />
      <Text style={styles.text}>Text Header</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: colors.text.default,
  },
});
