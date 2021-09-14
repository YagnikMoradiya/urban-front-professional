import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../utils/theme';

const CustomAvatar = ({source, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={{
          width: 25,
          height: 25,
          resizeMode: 'contain',
        }}
        source={source}
      />
    </TouchableOpacity>
  );
};

export default CustomAvatar;

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray1,
  },
});
