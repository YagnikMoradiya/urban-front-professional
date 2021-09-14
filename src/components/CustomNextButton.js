import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS} from '../utils/theme';

const CustomNextButton = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 40,
        width: 140,
        justifyContent: 'center',
        backgroundColor: COLORS.black,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        margin: 5,
      }}>
      <Text style={{color: COLORS.white, textAlign: 'center', ...FONTS.h4}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomNextButton;

const styles = StyleSheet.create({});
