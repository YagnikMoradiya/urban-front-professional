import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../utils/theme';

const CustomButton = ({onPress, title, disabled}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} disabled={disabled}>
      <Text style={styles.button_text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.55,
    shadowRadius: 30,

    elevation: 8,
  },
  button_text: {
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.body3,
  },
});
