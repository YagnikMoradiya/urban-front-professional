import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ChatScreen,
  CompleteProfileScreen,
  ConversationScreen,
  HomeScreen,
  ProfileScreen,
} from '../screens';

const DashboardStack = createNativeStackNavigator();

const Dashboard = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <DashboardStack.Screen
        name="CompleteProfile"
        component={CompleteProfileScreen}
      />
      <DashboardStack.Screen name="Profile" component={ProfileScreen} />

      <DashboardStack.Screen name="Chat" component={ChatScreen} />
      <DashboardStack.Screen
        name="Conversation"
        component={ConversationScreen}
      />
    </DashboardStack.Navigator>
  );
};

export default Dashboard;
