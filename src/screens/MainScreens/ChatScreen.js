import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {COLORS} from '../../utils/theme';

const ChatScreen = ({navigation, route}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const {chatName, id, image} = route.params;

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

  const sendMessage = () => {
    //
  };

  const deleteMessage = id => {
    //
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={-190}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{paddingTop: 15}}>
              <TouchableOpacity>
                <View style={styles.reciever}>
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
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVSEPJut2FtINpbexjlW-PxQjDqV_jspoSw&usqp=CAU',
                    }}
                  />
                  <Text style={styles.recieverText}>Hello 👋👋</Text>
                </View>
              </TouchableOpacity>
              {/* ) : (
                  <View key={id} style={styles.sender}>
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
                        uri: data.photoURL
                          ? data.photoURL
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVSEPJut2FtINpbexjlW-PxQjDqV_jspoSw&usqp=CAU',
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                ),
              )} */}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message"
                value={input}
                onChangeText={text => setInput(text)}
                style={styles.inputStyle}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2B68E6" />
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
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
});
