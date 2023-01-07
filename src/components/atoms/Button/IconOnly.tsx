import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconArrowBack} from '../../../assets';

const IconOnly = ({onPress, icon}: {onPress?: any; icon: any}) => {
  const Icon = () => {
    if (icon === 'dark-back') {
      return <IconArrowBack />;
    }
    if (icon === 'back-light') {
      return <IconArrowBack />;
    }
    return <IconArrowBack />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;
