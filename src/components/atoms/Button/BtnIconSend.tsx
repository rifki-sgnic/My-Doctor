import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {IconSend, IconSendActive} from '../../../assets';
import {colors} from '../../../utils';

interface BtnIconSendProps {
  disable?: boolean;
}

const BtnIconSend = ({disable}: BtnIconSendProps) => {
  return (
    <View style={{...styles({disable}).container}}>
      {disable ? <IconSend /> : <IconSendActive />}
    </View>
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
