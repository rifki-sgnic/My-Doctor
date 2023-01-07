import React, {FC} from 'react';
import {View} from 'react-native';

interface GapProps {
  height?: any;
  width?: any;
}

const Gap: FC<GapProps> = ({height, width}) => {
  return <View style={{height: height, width: width}} />;
};

export default Gap;
