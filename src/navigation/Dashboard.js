import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import {
  ChatScreen,
  CompleteProfileScreen,
  ConversationScreen,
  EditProfileScreen,
  EmployeeScreen,
  HomeScreen,
  ProfileScreen,
  ServiceScreen,
} from '../screens';
import CustomDrawerContant from './CustomDrawerContant';
import { useEffect } from 'react';
import { ApiGet } from '../utils/helper';
import { useDispatch } from 'react-redux';
import { setConversation } from '../redux/action/conversationAction';
import { io } from 'socket.io-client';


const DashboardStack = createDrawerNavigator();

const Dashboard = () => {
  const dispatch = useDispatch();

  const getConversations = async () => {
    try {
      const conversations = await ApiGet(`/chat/get-conversation`);

      dispatch(setConversation(conversations.data));
    } catch (error) {
      console.error(error);
    }
  };

  // const setSocketVariable = () => {
  //   socket.current = io('http://localhost:5050/');
  // }

  useEffect(() => {
    getConversations();
    // setSocketVariable()
  }, [])
  return (
    <DashboardStack.Navigator drawerContent={(props) => <CustomDrawerContant {...props} />}>
      <DashboardStack.Screen name="Home" component={HomeScreen} />
      <DashboardStack.Screen
        name="CompleteProfile"
        component={CompleteProfileScreen}
      />
      <DashboardStack.Screen name="Profile" component={ProfileScreen} />

      <DashboardStack.Screen name="Employee" component={EmployeeScreen} />

      <DashboardStack.Screen name="Service" component={ServiceScreen} />
      <DashboardStack.Screen name="EditProfile" component={EditProfileScreen} />
    </DashboardStack.Navigator>
  );
};

export default Dashboard;
