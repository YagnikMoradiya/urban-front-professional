import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {io} from 'socket.io-client';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {COLORS} from '../../utils/theme';
import {ApiGet, ApiPost} from '../../utils/helper';
import {useSelector} from 'react-redux';

const ChatScreen = ({navigation, route}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef();
  const scrollViewRef = useRef();

  const {chatName, id, image, friendsId} = route.params;

  const {shop} = useSelector(state => state.shopData);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {backgroundColor: COLORS.gray2},
      headerTitleAlign: 'center',
      headerTintColor: COLORS.black,
      headerTitle: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar
            rounded
            source={{
              uri: image,
            }}
          />
          <Text
            style={{
              color: COLORS.black,
              marginLeft: 10,
              fontWeight: '700',
              fontSize: 16,
            }}>
            {chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            marginRight: 15,
            justifyContent: 'flex-end',
            width: 100,
          }}>
          <TouchableOpacity>
            <FontAwesome name="ellipsis-v" size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = async () => {
    try {
      const messageObj = {
        conversationId: id,
        senderId: shop.id,
        text: input,
      };

      socket.current.emit('sendMessage', {
        senderId: shop.id,
        receiverId: friendsId,
        text: input,
      });

      const message = await ApiPost('/chat/send-message', messageObj);

      setMessages([...messages, message.data]);
      setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async () => {
    try {
      const messages = await ApiGet(`/chat/get-message/${id}`);
      setMessages(messages.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  useEffect(() => {
    socket.current = io('http://localhost:5050/');
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      friendsId === arrivalMessage.senderId &&
      setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, id]);

  useEffect(() => {
    socket.current.emit('addUser', shop.id);
  }, [shop]);

  useEffect(() => {
    getMessages();
  }, [id]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={-190}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              contentContainerStyle={{paddingTop: 15}}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }>
              {messages.map(message => {
                if (message?.senderId === shop.id) {
                  return (
                    <View style={styles.reciever} key={message._id}>
                      <Avatar
                        position="absolute"
                        containerStyle={{
                          position: 'absolute',
                          bottom: -15,
                          right: -5,
                        }}
                        size={30}
                        rounded
                        source={{
                          uri: image
                            ? image
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVSEPJut2FtINpbexjlW-PxQjDqV_jspoSw&usqp=CAU',
                        }}
                      />
                      <Text style={styles.recieverText}>{message.text}</Text>
                    </View>
                  );
                } else {
                  return (
                    <View key={message._id} style={styles.sender}>
                      <Avatar
                        position="absolute"
                        containerStyle={{
                          position: 'absolute',
                          bottom: -15,
                          left: -5,
                        }}
                        size={30}
                        rounded
                        source={{
                          uri: image
                            ? image
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVSEPJut2FtINpbexjlW-PxQjDqV_jspoSw&usqp=CAU',
                        }}
                      />
                      <Text style={styles.senderText}>{message.text}</Text>
                    </View>
                  );
                }
              })}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message"
                value={input}
                onChangeText={text => setInput(text)}
                style={styles.inputStyle}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Ionicons name="send" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray2,
  },
  reciever: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2B68E6',
    alignSelf: 'flex-start',
    margin: 15,
    borderRadius: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  inputStyle: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    color: 'grey',
    padding: 10,
    borderRadius: 30,
  },
  recieverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
});
