import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../config';

const Splash = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log('auth: ', auth);
      console.log('user', user);
      setTimeout(() => {
        if (user) {
          // login
          console.log('user: ', user);
          navigation.replace('MainApp');
        } else {
          // logout
          navigation.replace('GetStarted');
        }
      }, 3000);
    });
    return () => unsubscribe();
  }, [navigation]);
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});
