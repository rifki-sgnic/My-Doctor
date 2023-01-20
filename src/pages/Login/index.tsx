import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ILLogo} from '../../assets';
import {Button, Link, Input, Gap, Loading} from '../../components';
import {colors, fonts, storeData, useForm} from '../../utils';
import {auth, db} from '../../config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {child, get, ref} from 'firebase/database';

const Login = ({navigation}: {navigation: any}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const login = () => {
    console.log('form: ', form);
    setLoading(true);

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(res => {
        console.log('success: ', res);
        setLoading(false);
        const dbRef = ref(db);
        get(child(dbRef, `users/${res.user.uid}/`))
          .then(snapshot => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              storeData('user', snapshot.val());
              navigation.replace('MainApp');
            } else {
              console.log('No data available');
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        showMessage({
          message: err.message,
          backgroundColor: colors.error,
          color: colors.white,
          type: 'danger',
        });
      });
  };
  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <ILLogo />
          <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={(value: string) => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            secureTextEntry={true}
            label="Password"
            value={form.password}
            onChangeText={(value: string) => setForm('password', value)}
          />
          <Gap height={10} />
          <Link title="Forgot My Password" size={12} onPress={() => {}} />
          <Gap height={40} />
          <Button title="Sign In" onPress={login} />
          <Gap height={30} />
          <Link
            title="Create New Account"
            size={16}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153,
  },
});
