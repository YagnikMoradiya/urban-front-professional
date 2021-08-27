import React from 'react';
import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeShopData} from '../redux/action/shopAction';
import {removeDataObj} from '../utils/storage.helper';
import {COLORS} from '../utils/theme';

const CompleteProfileScreen = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(removeShopData());
    await removeDataObj('token');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.transparent} barStyle="dark-content" />

      <Text>CompleteProfileScreen</Text>
      <Button onPress={logout} title="🙋‍♂️🙋‍♂️" />
    </View>
  );
};

export default CompleteProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
