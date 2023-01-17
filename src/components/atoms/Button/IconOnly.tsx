import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconArrowBackDark, IconArrowBackLight} from '../../../assets';

const IconOnly = ({onPress, icon}: {onPress?: any; icon: any}) => {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <IconArrowBackDark />;
    }
    if (icon === 'back-light') {
      return <IconArrowBackLight />;
    }
    return <IconArrowBackDark />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;
