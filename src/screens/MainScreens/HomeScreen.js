import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {COLORS, FONTS, SIZES} from '../../utils/theme';
import {removeShopData} from '../../redux/action/shopAction';
import {removeDataObj} from '../../utils/storage.helper';
import {useDispatch, useSelector} from 'react-redux';

const HomeScreen = ({navigation}) => {
  const {is_verified} = useSelector(state => state.shopData);

  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(removeShopData());
    await removeDataObj('token');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />
      {!is_verified && completeProfileCard(navigation)}
      <Text>Home Screen</Text>
      <Button title="LogOut" type="outline" onPress={logout} />
      <Button
        title="Chat"
        type="outline"
        onPress={() => navigation.navigate('Chat')}
      />
      <Button
        title="Conversation"
        type="outline"
        onPress={() => navigation.navigate('Conversation')}
      />
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
