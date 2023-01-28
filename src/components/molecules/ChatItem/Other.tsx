import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

interface OtherProps {
  text: string;
  date: string;
  photo: any;
}

const Other = ({text, date, photo}: OtherProps) => {
  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default Other;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  content: {
    marginLeft: 12,
    maxWidth: '70%',
  },
  chatContent: {
    padding: 12,
    marginRight: 18,
    backgroundColor: colors.cardDark,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.white,
  },
  date: {
    marginTop: 8,
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
  },
});
