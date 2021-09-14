import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {c_sc_icon} from '../assets';
import {removeShopData} from '../redux/action/shopAction';
import {removeDataObj} from '../utils/storage.helper';
import {COLORS, FONTS, SIZES} from '../utils/theme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GeneralDetail from './CompleteProfile/GeneralDetail';
import AddressDetail from './CompleteProfile/AddressDetail';
import EmployeeDetail from './CompleteProfile/EmployeeDetail';

const CompleteStack = createNativeStackNavigator();

const CompleteProfileScreen = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(removeShopData());
    await removeDataObj('token');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.transparent} barStyle="dark-content" />
      <View style={{flex: 0.2, alignItems: 'center', padding: 20}}>
        <View style={styles.welcome_container}>
          <View style={styles.welcome_text}>
            <Text style={styles.welcome_text1}>Welcome Yash</Text>
            <Text style={styles.welcome_text2}>Complete Your Profile</Text>
          </View>
          <Image
            source={c_sc_icon}
            resizeMode="contain"
            style={{
              width: 100,
              height: 150,
            }}
          />
        </View>
      </View>
      <View style={styles.body_container}>
        <CompleteStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <CompleteStack.Screen
            name="GeneralDetail"
            component={GeneralDetail}
          />
          <CompleteStack.Screen
            name="AddressDetail"
            component={AddressDetail}
          />
          <CompleteStack.Screen
            name="EmployeeDetail"
            component={EmployeeDetail}
          />
        </CompleteStack.Navigator>
      </View>
    </View>
  );
};

export default CompleteProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLORS.white,
  },
  welcome_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  welcome_text: {
    marginTop: 27,
    marginLeft: 20,
    textAlign: 'left',
    flex: 1,
  },
  welcome_text1: {
    ...FONTS.h2,
  },
  welcome_text2: {
    ...FONTS.body4,
  },
  body_container: {
    flex: 0.8,
    justifyContent: 'flex-start',
    marginTop: 15,
  },
});
