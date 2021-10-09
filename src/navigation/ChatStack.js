import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen, ConversationScreen} from '../screens';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Conversation">
      <Stack.Screen
        name="Conversation"
        options={{animation: 'slide_from_right'}}
        component={ConversationScreen}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
