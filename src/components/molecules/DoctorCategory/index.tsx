import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ILCatDokterObat,
  ILCatDokterPsikiater,
  ILCatDokterUmum,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const DoctorCategory = ({category}: any) => {
  const Icon = () => {
    if (category === 'dokter umum') {
      return <ILCatDokterUmum style={styles.illustration} />;
    }
    if (category === 'psikiater') {
      return <ILCatDokterPsikiater style={styles.illustration} />;
    }
    if (category === 'dokter obat') {
      return <ILCatDokterObat style={styles.illustration} />;
    }
    return <ILCatDokterUmum style={styles.illustration} />;
  };
  return (
    <View style={styles.container}>
      <Icon />
      <Text style={styles.label}>Saya butuh</Text>
      <Text style={styles.category}>{category}</Text>
    </View>
  );
};

export default DoctorCategory;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 130,
  },
  illustration: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
