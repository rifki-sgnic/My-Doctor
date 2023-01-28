import {onValue, push, ref, set} from 'firebase/database';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ChatItem, Header, InputChat} from '../../components';
import {db} from '../../config';
import {
  colors,
  fonts,
  getChatTime,
  getData,
  setDateChat,
  showError,
} from '../../utils';

interface ChattingProps {
  navigation: any;
  route: any;
}

const Chatting = ({navigation, route}: ChattingProps) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({
    uid: '',
  });
  const [chatData, setChatData] = useState([]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    getLocalDataUser();
    const chatId = `${user.uid}_${dataDoctor.data.uid}`;
    const chattingRef = ref(db, `chatting/${chatId}/allChat/`);

    return onValue(
      chattingRef,
      snapshot => {
        if (snapshot.exists()) {
          const dataObj = snapshot.val();
          const data: any = [];
          Object.keys(dataObj).map((key: any) => {
            const dataChatObj = dataObj[key];
            const dataChat: any = [];

            Object.keys(dataChatObj).map((itemChat: any) => {
              dataChat.push({
                id: itemChat,
                data: dataChatObj[itemChat],
              });
            });

            data.push({
              id: key,
              data: dataChat,
            });
          });
          setChatData(data);
        }
      },
      err => {
        console.log(err);
        showError(err.message);
      },
    );
  }, [dataDoctor.data.uid, user.uid]);

  const getLocalDataUser = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  const chatSend = () => {
    const today = new Date();
    // send to firebase
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };
    const chatId = `${user.uid}_${dataDoctor.data.uid}`;
    const chattingRef = ref(
      db,
      `chatting/${chatId}/allChat/${setDateChat(today)}`,
    );
    const newChatRef = push(chattingRef);

    const urlMessageUser = `messages/${user.uid}/${chatId}`;
    const dataHistoryChatUser = {
      lastChatContent: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatId}`;
    const dataHistoryChatDoctor = {
      lastChatContent: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    set(newChatRef, data)
      .then(() => {
        setChatContent('');
        //set history for user
        set(ref(db, urlMessageUser), dataHistoryChatUser);
        //set history for doctor
        set(ref(db, urlMessageDoctor), dataHistoryChatDoctor);
      })
      .catch(err => {
        console.log(err);
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.profession}
        photo={{uri: dataDoctor.data.photo}}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}>
          {chatData.map((chat: any) => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map((itemChat: any) => {
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={itemChat.data.sendBy === user.uid}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={{uri: dataDoctor.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        name={dataDoctor.data.fullName}
        value={chatContent}
        onChangeText={(value: string) => setChatContent(value)}
        onPress={chatSend}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
