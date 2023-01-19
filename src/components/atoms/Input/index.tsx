import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../../../utils';

interface InputProps {
  label: string;
  value: string;
  onChangeText: any;
  secureTextEntry?: any;
}

const Input = ({label, value, onChangeText, secureTextEntry}: InputProps) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };
  return (
    <View>
      <Text style={{...styles({}).label}}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={{...styles({border}).input}}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;

interface StyleProps {
  border?: string;
}

interface StyleSheetType {
  input: ViewStyle;
  label?: TextStyle;
}

type StylesFunctionProps = (props: StyleProps) => StyleSheetType;

const styles: StylesFunctionProps = ({border}) =>
  StyleSheet.create({
    input: {
      borderRadius: 10,
      borderColor: border,
      borderWidth: 1,
      padding: 12,
    },
    label: {
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: 6,
      fontFamily: fonts.primary[400],
    },
  });
