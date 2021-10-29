import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatScreen, ConversationScreen } from '../screens';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConversation } from '../redux/action/conversationAction';
import { ApiGet } from '../utils/helper';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
  const { shop } = useSelector(state => state.shopData);

  const dispatch = useDispatch();

  const getConversations = async () => {
    try {
      const conversations = await ApiGet(`/chat/get-conversation`);

      dispatch(setConversation(conversations.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConversations();
  }, [ shop ]);

  return (
    <Stack.Navigator initialRouteName="Conversation">
      <Stack.Screen
        name="Conversation"
        options={{ animation: 'slide_from_right' }}
        component={ConversationScreen}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
