import {CommonActions} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {child, get, ref} from 'firebase/database';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../components';
import {auth, db} from '../../config';
import {request} from '../../features/loadingSlice';
import {useAppDispatch} from '../../redux/hooks';
import {colors, fonts, showError, storeData, useForm} from '../../utils';

const Login = ({navigation}: {navigation: any}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const login = () => {
    console.log('form: ', form);
    dispatch(request(true));

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(res => {
        dispatch(request(false));
        const dbRef = ref(db);
        get(child(dbRef, `users/${res.user.uid}/`))
          .then(snapshot => {
            if (snapshot.exists()) {
              storeData('user', snapshot.val());
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'MainApp'}],
                }),
              );
            } else {
              showError('No data available');
            }
          })
          .catch(err => {
            showError(err);
          });
      })
      .catch(err => {
        dispatch(request(false));
        showError(err.message);
      });
  };

  return (
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
