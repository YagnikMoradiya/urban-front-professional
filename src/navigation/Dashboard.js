import React, { useRef } from 'react';
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
  RequestScreen,
  ServiceScreen,
} from '../screens';
import CustomDrawerContant from './CustomDrawerContant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { setSocket } from '../redux/action/socketAction';


const DashboardStack = createDrawerNavigator();

const Dashboard = () => {
  const { shop } = useSelector(state => state.shopData);

  const dispatch = useDispatch();
  const socket = useRef();

  const setSocketVariable = () => {
    socket.current = io('http://localhost:5050/');
    socket.current.emit('addUser', shop.id);

    dispatch(setSocket(socket));
  }

  useEffect(() => {
    setSocketVariable();
  }, [ shop ])

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

      <DashboardStack.Screen name="Request" component={RequestScreen} />
    </DashboardStack.Navigator>
  );
};

export default Dashboard;
