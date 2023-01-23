import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconRemovePhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';

interface ProfileProps {
  name?: string;
  desc?: string;
  photo: any;
  isRemove?: boolean;
  onPress?: () => void;
}

const Profile = ({name, desc, photo, isRemove, onPress}: ProfileProps) => {
  return (
    <View style={styles.container}>
      {!isRemove && (
        <View style={styles.borderProfile}>
          <Image source={photo} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.removeAvatar} />}
        </View>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image source={photo} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.removeAvatar} />}
        </TouchableOpacity>
      )}
      {name && desc && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  removeAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
