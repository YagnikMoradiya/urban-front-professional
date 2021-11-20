import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { camera } from '../../assets';
import { ApiGet } from '../../utils/helper';
import { COLORS, FONTS } from '../../utils/theme';

const ProfileScreen = ({ navigation }) => {
  const [ shop, setShop ] = useState(null);

  const isFocused = useIsFocused();


  const getShopData = async () => {
    try {
      const shopData = await ApiGet('/shop/shop-basic');

      setShop(shopData.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getShopData();
  }, [ navigation, isFocused ])

  useEffect(() => {
    // console.log(shop);
  }, [ shop ])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Complete Profile',
      headerStyle: { backgroundColor: COLORS.gray2 },
      headerTitleStyle: {
        color: COLORS.black,
      },
      headerTintColor: COLORS.black,
    });
  }, [ navigation ]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />


      <View style={{ alignItems: 'center' }}>
        <Avatar
          size="xlarge"
          rounded
          source={shop?.avatar ? { uri: shop?.avatar } : camera}
        />
      </View>

      <View style={styles.detail_container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.detail_text}>Name: </Text>
          <Text style={{ ...FONTS.body2 }}>{shop?.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.detail_text}>Phone: </Text>
          <Text style={{ ...FONTS.body2 }}>{shop?.phone}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.detail_text}>City: </Text>
          <Text style={{ ...FONTS.body2 }}>{shop?.city}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.detail_text}>State: </Text>
          <Text style={{ ...FONTS.body2 }}>{shop?.state}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.save_container} onPress={() => navigation.navigate('EditProfile', { avatar: shop?.avatar, name: shop?.name, phone: shop?.phone, city: shop?.city, state: shop?.state })} >
        <Text style={styles.save_txt}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray2,
    paddingHorizontal: 16,
    justifyContent: 'center'
  },

  detail_container: {
    padding: 20,
    paddingLeft: 50
  },

  detail_text: {
    ...FONTS.h3,
    margin: 10,
    textAlign: 'center'
  },

  save_container: {
    height: 40,
    width: '50%',
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    textAlign: 'center',
    marginTop: 15,
  },

  save_txt: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: '300',
  },
});

export default ProfileScreen;