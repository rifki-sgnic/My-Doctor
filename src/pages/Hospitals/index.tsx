import {child, get, ref} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ILCoverHospital} from '../../assets';
import {ListHospital} from '../../components';
import {db} from '../../config';
import {colors, fonts, showError} from '../../utils';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, 'hospitals/'))
      .then(snapshot => {
        if (snapshot.exists()) {
          setHospitals(snapshot.val());
        }
      })
      .catch(err => {
        showError(err);
      });
  }, []);

  return (
    <View style={styles.page}>
      <ImageBackground source={ILCoverHospital} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 Tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospitals.map((item: any) => {
          return (
            <ListHospital
              key={item.id}
              type={item.type}
              name={item.name}
              address={item.address}
              pic={{uri: item.image}}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
});
