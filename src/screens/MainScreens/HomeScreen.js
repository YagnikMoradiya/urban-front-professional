import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {COLORS, FONTS, SIZES} from '../../utils/theme';
import {removeShopData} from '../../redux/action/shopAction';
import {removeDataObj, setDataObj} from '../../utils/storage.helper';
import {useDispatch, useSelector} from 'react-redux';
import {CustomInput, CustomButton} from '../../components';

const HomeScreen = ({navigation}) => {
  const [workerId, setWorkerId] = useState('');

  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(removeShopData());
    await removeDataObj('token');
  };

  const storeWorkerId = async () => {
    try {
      if (!workerId) return;
      await setDataObj(workerId, 'workerId');
      dispatch(setWorkerId(workerId));

      setOpen(false);
      navigation.navigate('Conversation');
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: {backgroundColor: COLORS.gray2},
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: COLORS.black,
      },
      headerTinColor: COLORS.black,
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            marginRight: 15,
            justifyContent: 'flex-end',
            width: 100,
          }}>
          <TouchableOpacity
            style={{padding: 3}}
            onPress={() => navigation.navigate('ChatStack')}>
            <AntDesign name="message1" size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />
      {/* {!is_verified && completeProfileCard(navigation)} */}

      <View style={styles.card_container}>
        <OrderStatusCard number={10} label="Pending" color="blue" />
        <OrderStatusCard number={10} label="Completed" color="green" />
        <OrderStatusCard number={10} label="Canceled" color="red" />
      </View>

      <View style={{margin: 10, borderBottomWidth: 1}}>
        <Text style={{...FONTS.h3}}>Recent Orders</Text>
      </View>

      {/* <Button title="LogOut" type="outline" onPress={logout} /> */}
    </View>
  );
};

const OrderStatusCard = ({number, label, color}) => {
  return (
    <View>
      <Text style={{textAlign: 'center', ...FONTS.body3, color: color}}>
        {number}
      </Text>
      <Text style={{textAlign: 'center', ...FONTS.body3, color: color}}>
        {label}
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray2,
    paddingHorizontal: SIZES.padding3,
    paddingTop: 5,
  },
  card_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 100,
    width: '100%',
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderTopWidth: 0,
    borderColor: COLORS.black,
    elevation: 3,
    marginVertical: 5,
  },
});
