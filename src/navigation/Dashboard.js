import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  ChatScreen,
  CompleteProfileScreen,
  ConversationScreen,
  EmployeeScreen,
  HomeScreen,
  ProfileScreen,
  ServiceScreen,
} from '../screens';
import ChatStack from './ChatStack';

const DashboardStack = createDrawerNavigator();

const Dashboard = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Home" component={HomeScreen} />
      <DashboardStack.Screen
        name="CompleteProfile"
        component={CompleteProfileScreen}
      />
      <DashboardStack.Screen name="Profile" component={ProfileScreen} />

      <DashboardStack.Screen name="Employee" component={EmployeeScreen} />

      <DashboardStack.Screen name="Service" component={ServiceScreen} />
    </DashboardStack.Navigator>
  );
};

export default Dashboard;
