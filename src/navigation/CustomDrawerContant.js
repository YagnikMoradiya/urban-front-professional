import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { camera } from '../assets';
import { COLORS, FONTS } from '../utils/theme';
import { useDispatch, useSelector } from 'react-redux';
import { removeShopData } from '../redux/action/shopAction';
import { removeDataObj } from '../utils/storage.helper';

function CustomDrawerContant(props) {

  const dispatch = useDispatch();

  const shopData = useSelector(state => state?.shopData?.shop);

  const logOut = async () => {
    try {
      dispatch(removeShopData());
      await removeDataObj('token');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.drawerContant}>
        <Avatar size="medium" source={shopData.avatar ? { uri: shopData.avatar } : camera} />
        <Text style={styles.username}>{shopData.name}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          labelStyle={styles.listText}
          label="Home"
          icon={({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('Home')}
        />

        <DrawerItem
          labelStyle={styles.listText}
          label="Profile"
          icon={({ size, color }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('Profile')}
        />

        <DrawerItem
          labelStyle={styles.listText}
          label="Complete Profile"
          icon={({ size, color }) => (
            <MaterialIcons name="done-all" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('CompleteProfile')}
        />

        <DrawerItem
          labelStyle={styles.listText}
          label="Employee"
          icon={({ size, color }) => (
            <MaterialIcons
              name="supervised-user-circle"
              size={size}
              color={color}
            />
          )}
          onPress={() => props.navigation.navigate('Employee')}
        />

        <DrawerItem
          labelStyle={styles.listText}
          label="Services"
          icon={({ size, color }) => (
            <MaterialCommunityIcons
              name="room-service"
              size={size}
              color={color}
            />
          )}
          onPress={() => props.navigation.navigate('Service')}
        />

        <DrawerItem
          labelStyle={styles.listText}
          label="Edit Profile"
          icon={({ size, color }) => (
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={size}
              color={color}
            />
          )}
          onPress={() => props.navigation.navigate('EditProfile')}
        />
      </DrawerContentScrollView>

      <View style={styles.logoutContainer}>
        <DrawerItem
          labelStyle={styles.listText}
          label="Log Out"
          icon={({ size, color }) => (
            <MaterialIcons name="logout" size={size} color={color} />
          )}
          onPress={() => logOut()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContant: {
    flex: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  username: {
    ...FONTS.h3,
    color: COLORS.black,
    fontWeight: '200',
  },

  logoutContainer: {
    height: '8%',
    backgroundColor: '#efefef',
  },

  listText: {
    ...FONTS.body3,
    color: COLORS.black,
  },
});

export default CustomDrawerContant;
