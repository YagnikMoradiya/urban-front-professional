import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../utils/theme';

const ProfileScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Complete Profile',
      headerStyle: {backgroundColor: COLORS.gray2},
      headerTitleStyle: {
        color: COLORS.black,
      },
      headerTintColor: COLORS.black,
    });
  }, [navigation]);

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
