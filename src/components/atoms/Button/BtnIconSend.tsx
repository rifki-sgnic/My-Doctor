import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {IconSend, IconSendActive} from '../../../assets';
import {colors} from '../../../utils';

interface BtnIconSendProps {
  disable?: boolean;
  onPress: any;
}

const BtnIconSend = ({disable, onPress}: BtnIconSendProps) => {
  if (disable) {
    return (
      <View style={{...styles({disable}).container}}>
        <IconSend />
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={{...styles({disable}).container}}
      onPress={onPress}>
      <IconSendActive />
    </TouchableOpacity>
  );
};

export default BtnIconSend;

interface StyleProps {
  disable?: boolean;
}

interface StyleSheetType {
  container: ViewStyle;
}

type StylesFunctionProps = (props: StyleProps) => StyleSheetType;

const styles: StylesFunctionProps = ({disable}) =>
  StyleSheet.create({
    container: {
      backgroundColor: disable ? colors.disable : colors.tertiary,
      width: 45,
      height: 45,
      borderRadius: 10,
      paddingTop: 3,
      paddingRight: 3,
      paddingBottom: 8,
      paddingLeft: 8,
    },
  });
