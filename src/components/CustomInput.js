import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../utils/theme';

const CustomInput = ({
  contentContainerStyle,
  icon,
  type,
  placeholder,
  secure,
}) => {
  const [color, setColor] = useState(COLORS.gray);
  return (
    <View
      style={[
        {...contentContainerStyle},
        styles.container,
        {borderBottomColor: color, borderBottomWidth: 2},
      ]}>
      <TextInput
        keyboardType={type}
        secureTextEntry={secure}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={COLORS.lightGray}
        style={styles.inputfield}
        onFocus={() => setColor(COLORS.black)}
        onBlur={() => setColor(COLORS.gray)}
      />
      {icon && (
        <TouchableOpacity>
          <Image style={styles.icon} source={icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  inputfield: {
    flex: 1,
    ...FONTS.body3,
    fontFamily: 'Roboto-Light',
    color: COLORS.black,
    padding: 5,
  },
  icon: {
    marginRight: SIZES.padding,
  },
});
