import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {COLORS, FONTS, SIZES} from '../../utils/theme';
import {removeShopData} from '../../redux/action/shopAction';
import {removeDataObj, setDataObj} from '../../utils/storage.helper';
import {useDispatch, useSelector} from 'react-redux';
import {CustomInput, CustomButton} from '../../components';

const HomeScreen = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [workerId, setWorkerId] = useState('');

  const {is_verified} = useSelector(state => state.shopData);
  const {worker_id} = useSelector(state => state.workerData);

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

  return (
    <View style={styles.container}>
      {!open && (
        <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />
      )}
      {!is_verified && completeProfileCard(navigation)}
      <Text>Home Screen</Text>
      <Button title="LogOut" type="outline" onPress={logout} />
      <Button
        title="Conversation"
        type="outline"
        onPress={() => {
          if (worker_id) {
            navigation.navigate('Conversation');
          } else {
            setOpen(true);
          }
        }}
      />
      <Modal visible={open} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                width: '70%',
                padding: 10,
                borderRadius: 30,
              }}>
              <Text style={{...FONTS.h3, textAlign: 'center'}}>
                Enter Worker Id
              </Text>
              <View style={{marginTop: 30, marginBottom: 10}}>
                <CustomInput
                  placeholder="worker id"
                  value={workerId}
                  setValue={setWorkerId}
                />
              </View>
              <View style={{alignItems: 'center', padding: 10, margin: 10}}>
                <CustomButton title="OK" onPress={storeWorkerId} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const completeProfileCard = navigation => {
  return (
    <View style={styles.card_container}>
      <Text
        style={{
          ...FONTS.body2,
          color: COLORS.white,
        }}>
        Complete your Profile
      </Text>
      <Button
        icon={<Icon name="arrow-right" size={20} color={COLORS.white} />}
        onPress={() => navigation.navigate('CompleteProfile')}
      />
    </View>
  );
};

const messageModal = () => (
  <Modal visible={open} transparent={true}>
    <View>
      <CustomInput />
    </View>
  </Modal>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.gray2,
    paddingHorizontal: SIZES.padding3,
  },
  card_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#9e00c2',
    height: 100,
    width: '100%',
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
  },
});
