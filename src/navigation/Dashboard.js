import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
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
import ChatStack from './ChatStack';
import CustomDrawerContant from './CustomDrawerContant';

const DashboardStack = createDrawerNavigator();

const Dashboard = () => {
  return (
    <DashboardStack.Navigator  drawerContent={(props) => <CustomDrawerContant {...props} />}>
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
