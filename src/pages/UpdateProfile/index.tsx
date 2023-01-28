import {CommonActions} from '@react-navigation/native';
import {updatePassword} from 'firebase/auth';
import {ref, update} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {auth, db} from '../../config';
import {colors, getData, showError, showSuccess, storeData} from '../../utils';

const UpdateProfile = ({navigation}: any) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    uid: '',
    photo: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [dataImg, setDataImg] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const changeText = (key: string, value: string) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    launchImageLibrary(
      {
        includeBase64: true,
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      },
      (response: any) => {
        console.log(response);
        if (response.didCancel || response.error) {
          showMessage({
            message: 'Gagal memilih foto',
            type: 'danger',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          setDataImg(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
          const src = {uri: response.assets[0].uri};
          setPhoto(src);
        }
      },
    );
  };

  const updateProfile = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password harus memiliki 6 karakter');
      } else {
        updateUserPassword();
        updateDataProfile();
      }
    } else {
      updateDataProfile();
    }
  };

  const updateUserPassword = () => {
    const user = auth.currentUser;
    if (user) {
      updatePassword(user, password).catch(err => {
        console.log(err);
        showError('Gagal melakukan update password');
      });
    }
  };

  const updateDataProfile = () => {
    const data = profile;
    if (dataImg !== '') {
      data.photo = dataImg;
    }

    update(ref(db, `users/${profile.uid}/`), data)
      .then(() => {
        storeData('user', data);
        showSuccess('Data berhasil diupdate');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'MainApp'}],
          }),
        );
      })
      .catch(err => {
        showError(err);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Update Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile photo={photo} isRemove onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value: string) => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value: string) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={(value: string) => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={updateProfile} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

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
