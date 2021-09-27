import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import {CustomListItem} from '../../components';
import {COLORS} from '../../utils/theme';
import {ApiGet} from '../../utils/helper';
import {useSelector} from 'react-redux';

const chats = [
  {
    id: 1,
    data: {
      chatName: 'Krunal',
      iconURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVSEPJut2FtINpbexjlW-PxQjDqV_jspoSw&usqp=CAU',
    },
  },
  {
    id: 2,
    data: {
      chatName: 'Yash',
      iconURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVSEPJut2FtINpbexjlW-PxQjDqV_jspoSw&usqp=CAU',
    },
  },
];
const ConversationScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const {worker_id} = useSelector(state => state.workerData);

  const signOut = () => {
    //
  };

  const getConversations = async () => {
    try {
      const conversations = await ApiGet(
        `/chat/get-conversation-worker/${worker_id}`,
      );

      setChats(conversations.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConversations();
    // const unsubscribe = db()
    //   .collection('chats')
    //   .onSnapshot(snapshot =>
    //     setChats(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))),
    //   );
    // return unsubscribe;
  }, []);

  const enterChat = (id, chatName, iconURL) => {
    // navigation.navigate('Chat', {
    //   id,
    //   chatName,
    //   iconURL,
    // });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Conversations',
      headerStyle: {backgroundColor: COLORS.gray2},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: COLORS.black,
      },
      headerTinColor: COLORS.black,
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />
      {chats.length <= 0 ? (
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
        {chats.map(data => (
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
