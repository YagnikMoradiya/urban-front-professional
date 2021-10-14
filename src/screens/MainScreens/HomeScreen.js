import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {COLORS, FONTS, SIZES} from '../../utils/theme';
import {removeShopData} from '../../redux/action/shopAction';
import {removeDataObj, setDataObj} from '../../utils/storage.helper';
import {useDispatch, useSelector} from 'react-redux';
import {ApiGet, ApiPost} from '../../utils/helper';
import {Tab, TabView} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
  const [workerId, setWorkerId] = useState('');
  const [selected, setSelected] = useState('pending');
  const [numbers, setNumbers] = useState({
    pending: 1,
    completed: 0,
    cancelled: 0,
  });

  const dispatch = useDispatch();

  const getNumbers = async () => {
    try {
      const num = await ApiGet('/order/get-numbers');
      setNumbers(num.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    getNumbers();
  }, []);

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
        <OrderStatusCard
          number={numbers.pending}
          label="Pending"
          color="blue"
        />
        <OrderStatusCard
          number={numbers.completed}
          label="Completed"
          color="green"
        />
        <OrderStatusCard
          number={numbers.cancelled}
          label="Cancelled"
          color="red"
        />
      </View>

      <View style={{margin: 10, borderBottomWidth: 1}}>
        <Text style={{...FONTS.h3}}>Recent Orders</Text>
      </View>

      <View
        style={{
          height: 40,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: 10,
        }}>
        <OrderTypeTab
          onPress={() => setSelected('pending')}
          title="Pending"
          selected={selected === 'pending' ? true : false}
        />

        <OrderTypeTab
          onPress={() => setSelected('completed')}
          title="Completed"
          selected={selected === 'completed' ? true : false}
        />

        <OrderTypeTab
          onPress={() => setSelected('cancelled')}
          title="Cancelled"
          selected={selected === 'cancelled' ? true : false}
        />
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

const OrderTypeTab = ({title, onPress, selected}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 15,
        margin: 3,
        backgroundColor: selected === true ? COLORS.black : COLORS.white,
      }}>
      <Text
        style={{
          ...FONTS.body3,
          textAlign: 'center',
          color: selected === true ? COLORS.white : COLORS.black,
        }}>
        {title}
      </Text>
    </TouchableHighlight>
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
