import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {Gap, Header, List, Profile} from '../../components';
import {auth} from '../../config';
import {colors, getData, showError, showSuccess} from '../../utils';

const UserProfile = ({navigation}: any) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
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

  const logOut = () => {
    signOut(auth)
      .then(() => {
        showSuccess('Berhasil Sign Out!');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'GetStarted'}],
          }),
        );
      })
      .catch(err => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}
      <Gap height={14} />
      <List
        type="next"
        icon="edit-profile"
        name="Edit Profile"
        desc="Last updated yesterday"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        type="next"
        icon="language"
        name="Language"
        desc="Available 12 languages"
        onPress={() => {}}
      />
      <List
        type="next"
        icon="rate"
        name="Give Us Rate"
        desc="On Google Play Store"
        onPress={() => {}}
      />
      <List
        type="next"
        icon="help"
        name="Sign Out"
        desc="Read our guidelines"
        onPress={logOut}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
