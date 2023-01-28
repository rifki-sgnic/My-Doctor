import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {child, get, onValue, ref} from 'firebase/database';
import {db} from '../../config';

const Messages = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState({
    uid: '',
  });
  const [messages, setMessages] = useState([]);

  const getLocalDataUser = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  useEffect(() => {
    getLocalDataUser();
    const messagesRef = ref(db, `messages/${user.uid}/`);
    const dbRef = ref(db);

    return onValue(messagesRef, async snapshot => {
      if (snapshot.exists()) {
        const dataObj = await snapshot.val();
        const data: any = [];

        const promises = Object.keys(dataObj).map(async key => {
          const doctorsRef = `doctors/${dataObj[key].uidPartner}`;
          const detailDoctor = await get(child(dbRef, doctorsRef));
          if (detailDoctor.exists()) {
            data.push({
              id: key,
              detailDoctor: detailDoctor.val(),
              ...dataObj[key],
            });
          }
        });
        Promise.all(promises).then(() => {
          const chat = data;
          setMessages(chat);
        });
      }
    });
  }, [user.uid]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {messages.map((chat: any) => {
          const dataDoctor = {
            id: chat.detailDoctor.uid,
            data: chat.detailDoctor,
          };
          return (
            <List
              key={chat.id}
              profile={{uri: chat.detailDoctor.photo}}
              name={chat.detailDoctor.fullName}
              desc={chat.lastChatContent}
              onPress={() => navigation.navigate('Chatting', dataDoctor)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
