import {createUserWithEmailAndPassword} from 'firebase/auth';
import {ref, set} from 'firebase/database';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input} from '../../components';
import {auth, db} from '../../config';
import {request} from '../../features/loadingSlice';
import {useAppDispatch} from '../../redux/hooks';
import {colors, showError, storeData, useForm} from '../../utils';

const Register = ({navigation}: {navigation: any}) => {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const onContinue = () => {
    dispatch(request(true));

    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(success => {
        dispatch(request(false));
        setForm('reset');
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid,
        };
        // Save localStorage
        storeData('user', data);
        // Save Firebase
        set(ref(db, 'users/' + success.user.uid + '/'), data);
        navigation.navigate('UploadPhoto', data);
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(request(false));
        showError(errorMessage);
      });
  };
  return (
    <>
      <View style={styles.page}>
        <Header title="Daftar Akun" onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Full Name"
              value={form.fullName}
              onChangeText={(value: string) => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Pekerjaan"
              value={form.profession}
              onChangeText={(value: string) => setForm('profession', value)}
            />
            <Gap height={24} />
            <Input
              label="Email"
              value={form.email}
              onChangeText={(value: string) => setForm('email', value)}
            />
            <Gap height={24} />
            <Input
              label="Password"
              value={form.password}
              onChangeText={(value: string) => setForm('password', value)}
              secureTextEntry={true}
            />
            <Gap height={40} />
            <Button title="Continue" onPress={onContinue} />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
