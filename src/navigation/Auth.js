import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen, SignUpScreen} from '../screens';
import {useSelector, useDispatch} from 'react-redux';
import {getDataObj, setDataObj} from '../utils/storage.helper';
import {ApiGet, ApiGetNoAuth} from '../utils/helper';
import {setShopData} from '../redux/action/shopAction';
import Dashboard from './Dashboard';
import {setWorker} from '../redux/action/workerAction';

const Stack = createNativeStackNavigator();

const Auth = () => {
  const dispatch = useDispatch();

  const {is_loggedin, is_verified} = useSelector(state => state.shopData);
  // let is_loggedin = true,
  //   is_verified = false;

  const getData = async () => {
    try {
      const token = await getDataObj();
      const workerId = await getDataObj('workerId');

      if (workerId) {
        dispatch(setWorker(workerId));
      }

      if (token) {
        const shop = await ApiGet('/shop/validate-token');

        await setDataObj(shop.data.token, 'token');
        dispatch(setShopData(shop.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {is_loggedin ? (
          <>
            <Stack.Screen name="DashBoard" component={Dashboard} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Auth;
