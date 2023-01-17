import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Gap, Header, List, Profile} from '../../components';
import {colors} from '../../utils';

const UserProfile = ({navigation}: any) => {
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile name="Shayna Melinda" desc="Product Designer" />
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
        name="Help Center"
        desc="Read our guidelines"
        onPress={() => {}}
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
