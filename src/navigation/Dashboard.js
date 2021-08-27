import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens';

const DashboardStack = createNativeStackNavigator();

const Dashboard = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Home" component={HomeScreen} />
    </DashboardStack.Navigator>
  );
};

export default Dashboard;
