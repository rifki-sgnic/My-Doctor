import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  IconDoctor,
  IconDoctorActive,
  IconHospitals,
  IconHospitalsActive,
  IconMessages,
  IconMessagesActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

interface TabItemProps {
  title: string;
  active: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

const TabItem = ({title, active, onPress, onLongPress}: TabItemProps) => {
  const Icon = () => {
    if (title === 'Doctor') {
      return active ? <IconDoctorActive /> : <IconDoctor />;
    }
    if (title === 'Messages') {
      return active ? <IconMessagesActive /> : <IconMessages />;
    }
    if (title === 'Hospitals') {
      return active ? <IconHospitalsActive /> : <IconHospitals />;
    }
    return <IconDoctor />;
  };
  return (
    <TouchableOpacity
      style={styles({}).container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={{...styles({active}).text}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

interface StyleProps {
  active?: boolean;
}

interface StyleSheetType {
  container: ViewStyle;
  text: TextStyle;
}

type StylesFunctionProps = (props: StyleProps) => StyleSheetType;

const styles: StylesFunctionProps = ({active}) =>
  StyleSheet.create<StyleSheetType>({
    container: {
      alignItems: 'center',
    },
    text: {
      color: active ? colors.text.menuActive : colors.text.menuInactive,
      fontSize: 10,
      fontFamily: fonts.primary[400],
      marginTop: 4,
    },
  });
