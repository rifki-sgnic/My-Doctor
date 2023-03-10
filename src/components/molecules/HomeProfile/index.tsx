import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ILNullPhoto} from '../../../assets';
import {colors, fonts, getData} from '../../../utils';

interface HomeProfileProps {
  onPress: () => void;
}

const HomeProfile = ({onPress}: HomeProfileProps) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getData('user').then(res => {
        const data = res;
        data.photo = {uri: res.photo};
        setProfile(data);
      });

      return () => unsubscribe;
    }, []),
  );

  // useEffect(() => {
  //   getData('user').then(res => {
  //     const data = res;
  //     data.photo = {uri: res.photo};
  //     // console.log('new profile: ', data);
  //     setProfile(res);
  //   });
  // }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={profile.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.profession}>{profile.profession}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  profession: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});
