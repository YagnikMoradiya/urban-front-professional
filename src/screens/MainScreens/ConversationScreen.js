import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import { CustomListItem } from '../../components';
import { COLORS } from '../../utils/theme';
import { ApiGet } from '../../utils/helper';
import { useSelector } from 'react-redux';

const ConversationScreen = ({ navigation }) => {
  const [ chats, setChats ] = useState([]);
  const [ selectedChat, setSelectedChat ] = useState(null);

  const { conversations } = useSelector(state => state.conversationData);

  const getConversations = async () => {
    try {
      const conversations = await ApiGet(`/chat/get-conversation`);

      setChats(conversations.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   socket.current = io('http://localhost:5050/');
  //   // socket.current.on('getMessage', data => {
  //   //   setArrivalMessage({
  //   //     senderId: data.senderId,
  //   //     text: data.text,
  //   //     createdAt: Date.now(),
  //   //   });
  //   // });
  // }, []);

  // useEffect(() => {
  //   getConversations();
  // }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Conversations',
      headerStyle: { backgroundColor: COLORS.gray2 },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: COLORS.black,
      },
      headerTinColor: COLORS.black,
    });
  }, [ navigation ]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />
      {conversations.length <= 0 ? (
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 30,
            fontSize: 18,
            fontWeight: '500',
          }}>
          🤷‍♀No Chats Available🤷‍♂️
        </Text>
      ) : null}
      <ScrollView>
        {conversations.map(data => (
          <CustomListItem key={data._id} data={data} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConversationScreen;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  modal__image: {
    width: '100%',
    height: 300,
  },
  modal__detail: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginLeft: 10,
  },
  modal__text__title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  modal__text: {
    fontSize: 16,
    fontWeight: '900',
    color: 'white',
  },
});
